# Runtime API Config (Next.js)

## Como funciona

1. No startup do container do frontend, o `Dockerfile` gera o arquivo `public/runtime-config.js` com base na variável de ambiente `API_URL`(presente no .env da raiz).
2. O `RootLayout` carrega esse arquivo antes da inicialização do app (`beforeInteractive`).
3. O frontend lê `window.__ENV__.API_URL` em runtime.
4. Se `window.__ENV__.API_URL` não existir, é aplicado fallback para `process.env.NEXT_PUBLIC_API_URL` e depois `process.env.NEXT_PUBLIC_API_EDU_TRACE` (compatibilidade com ambientes existentes).
## Alterando via Portainer

1. Abra o container/stack do frontend.
2. Edite as variáveis de ambiente.
3. Defina/atualize `API_URL` com a URL desejada.
4. Faça redeploy/restart do frontend.

Não é necessário rebuild da imagem.

## Compatibilidade com CI/CD

Pipelines e ambientes que já usam variáveis `NEXT_PUBLIC_*` continuam funcionando sem mudanças.

- Prioridade em runtime: `window.__ENV__.API_URL`
- Fallback de build/CI: `NEXT_PUBLIC_API_URL`
- Compatibilidade adicional existente: `NEXT_PUBLIC_API_EDU_TRACE`
