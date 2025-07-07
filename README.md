![License](https://img.shields.io/github/license/ifpebj-ti/pe-estudantes)
![Last Commit](https://img.shields.io/github/last-commit/ifpebj-ti/pe-estudantes)
![Top Languages](https://img.shields.io/github/languages/top/ifpebj-ti/pe-estudantes)
![Repo Size](https://img.shields.io/github/repo-size/ifpebj-ti/pe-estudantes)
![Contributors](https://img.shields.io/github/contributors/ifpebj-ti/pe-estudantes)
![Open Issues]name: backend-pipeline

on:
  pull_request:
    types: [closed]         
    branches: [ "main" ]
    paths:
      - 'back/**'
  workflow_dispatch:

env:
  IMAGE_NAME: back-${{ github.event.repository.name }}
  REGISTRY: ghcr.io

jobs:
# --------------------------------------------------------------------
# 1) PREPARE TAG -----------------------------------------------------
# --------------------------------------------------------------------
  prepare-tag:
    name: 0. Preparar nova tag
    runs-on: ubuntu-latest
    outputs:
      new_tag: ${{ steps.nova_tag.outputs.nova_tag }}
      tipo:    ${{ steps.tipo.outputs.tipo }}

    steps:
      - uses: actions/checkout@v4

      - name: Instalar GitHub CLI
        run: sudo apt-get install -y gh

      - name: Extrair tipo de mudança da PR
        id: tipo
        run: |
          echo "${{ github.event.pull_request.body }}" > body.txt
      
          tipo=""
          if grep -q "\[x\] marco-no-projeto" body.txt; then
            tipo="marco-no-projeto"
          elif grep -q "\[x\] nova-feature" body.txt; then
            tipo="nova-feature"
          elif grep -q "\[x\] bug-fix" body.txt; then
            tipo="bug-fix"
          else
            echo "Nenhuma opção marcada corretamente em 'tipo:'"
          fi
          
          echo "tipo=$tipo" >> "$GITHUB_OUTPUT"

      - name: Obter a última tag da release
        id: ultima
        run: |
          gh auth setup-git
          tag=$(gh release list --limit 1 --json tagName --jq '.[0].tagName')
          if [[ -z "$tag" ]]; then tag="0.0.0"; fi
          echo "tag_atual=$tag" >> "$GITHUB_OUTPUT"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Calcular nova tag
        id: nova_tag
        run: |
          IFS='.' read -r major minor patch <<< "${{ steps.ultima.outputs.tag_atual }}"
          case "${{ steps.tipo.outputs.tipo }}" in
            bug-fix)           patch=$((patch + 1));;
            nova-feature)      minor=$((minor + 1)); patch=0;;
            marco-no-projeto)  major=$((major + 1)); minor=0; patch=0;;
          esac
          nova_tag="${major}.${minor}.${patch}"
          echo "Nova tag: $nova_tag"
          echo "nova_tag=$nova_tag" >> "$GITHUB_OUTPUT"

# --------------------------------------------------------------------
# 2) RUN TESTS -------------------------------------------------------
# --------------------------------------------------------------------
  run-tests:
    name: 1. Rodar testes do backend
    runs-on: ubuntu-latest
    needs: prepare-tag

    steps:
      - uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20' # Ajuste para a versão do Node usado no projeto

      - name: Instalar dependências
        working-directory: ./back
        run: npm ci

      - name: Rodar testes com cobertura
        working-directory: ./back
        run: npm run test:cov # Gera pasta "coverage"

      - name: Extrair cobertura total
        id: coverage
        working-directory: ./back
        run: |
          COVERAGE=$(jq '.total.lines.pct' coverage/coverage-summary.json)
          echo "Cobertura total: $COVERAGE%"
          echo "coverage=$COVERAGE" >> $GITHUB_OUTPUT

      - name: Atualizar badge no README
        run: |
          BADGE="![Coverage](https://img.shields.io/badge/Coverage-${{ steps.coverage.outputs.coverage }}%25-brightgreen)"
          sed -i '0,/<!-- COVERAGE_BADGE -->/s|.*<!-- COVERAGE_BADGE -->|'"$BADGE"' <!-- COVERAGE_BADGE -->|' README.md
          git config --global user.name "github-actions[bot]"
          git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add README.md
          git commit -m "ci: atualizar badge de cobertura para ${{ steps.coverage.outputs.coverage }}%"
          git push

# --------------------------------------------------------------------
# 3) BUILD & PUSH ----------------------------------------------------
# --------------------------------------------------------------------
  docker-build-push:
    name: 2. Build and Push Docker
    runs-on: ubuntu-latest
    needs: [prepare-tag, run-tests]
    env:
      TAG: ${{ needs.prepare-tag.outputs.new_tag }}

    steps:
      - uses: actions/checkout@v4

      - name: Injetar label de source no Dockerfile
        run: |
          echo "LABEL org.opencontainers.image.source=https://github.com/${{ github.repository }}" >> back/Dockerfile

      - name: Login no GHCR
        run: echo "${{ secrets.GHCR_PAT }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin

      - name: 2.1 Build Docker image
        run: |
          docker build ./back \
            -f back/Dockerfile \
            -t $REGISTRY/${{ github.repository_owner }}/$IMAGE_NAME:$TAG \
            --build-arg REPO_URL="https://github.com/${{ github.repository }}"

      - name: 2.2 Push Docker image
        run: |
          docker push $REGISTRY/${{ github.repository_owner }}/$IMAGE_NAME:$TAG

# --------------------------------------------------------------------
# 4) SCAN IMAGE ------------------------------------------------------
# --------------------------------------------------------------------
  scan-image:
    name: 3. Scan Docker Image
    runs-on: ubuntu-latest
    needs: [docker-build-push, prepare-tag]

    steps:
      - uses: actions/checkout@v4

      - name: Login no GHCR
        run: echo "${{ secrets.GHCR_PAT }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin

      - name: 3.1 Trivy Scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ghcr.io/${{ github.repository_owner }}/back-${{ github.event.repository.name }}:${{ needs.prepare-tag.outputs.new_tag }}
          format: table
          exit-code: 0
          severity: CRITICAL,HIGH

# --------------------------------------------------------------------
# 5) CREATE RELEASE --------------------------------------------------
# --------------------------------------------------------------------
  create-release:
    name: 4. Criar release
    runs-on: ubuntu-latest
    needs: [scan-image, prepare-tag]
    env:
      NEW_TAG: ${{ needs.prepare-tag.outputs.new_tag }}
      TIPO:    ${{ needs.prepare-tag.outputs.tipo }}
    steps:
      - uses: actions/checkout@v4

      - name: Publicar release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: ${{ env.NEW_TAG }}
          name: Release ${{ env.NEW_TAG }}
          generate_release_notes: true
          body: |
            Release gerada automaticamente a partir da Pull Request #${{ github.event.pull_request.number }}
            Tipo de mudança: ${{ env.TIPO }}
        env:
          GITHUB_TOKEN: ${{ secrets.GHCR_PAT }}

