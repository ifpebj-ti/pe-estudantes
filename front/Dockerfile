# Stage 1: Build the Next.js application
FROM node:24-alpine3.22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production image
FROM node:24-alpine3.22 AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --production

COPY docker-entrypoint.sh /app/entrypoint.sh
RUN sed -i 's/\r$//' /app/entrypoint.sh && chmod +x /app/entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["npm", "start"]
