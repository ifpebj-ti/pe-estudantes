# Base image
FROM node:18

# Base image
FROM node:22-slim AS base

ARG PORT=3001

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Dependencies
FROM base AS dependencies

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Build
FROM base AS build

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Run
FROM base AS run

ENV PORT=$PORT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
RUN mkdir dist
RUN chown nestjs:nodejs dist

COPY --from=build --chown=nestjs:nodejs /app/dist ./dist
COPY --from=build --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

USER nestjs

EXPOSE $PORT

CMD ["npm", "run", "start:prod"]