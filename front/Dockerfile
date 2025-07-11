# Etapa base
FROM node:22-slim AS base

ARG PORT=3000
ENV PORT=$PORT
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

WORKDIR /app

# Etapa de dependências
FROM base AS dependencies

# Evita problemas com binários nativos do Tailwind
ENV TAILWINDCSS_SKIP_NATIVE=true

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Etapa de build
FROM base AS build

ENV TAILWINDCSS_SKIP_NATIVE=true

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Variáveis de ambiente públicas (ex: Stripe key)
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# Gera build do Next
RUN npm run build

# Etapa de execução
FROM base AS run

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copia artefatos de build
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

# Ajusta permissões
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE $PORT

CMD ["node", "server.js"]
