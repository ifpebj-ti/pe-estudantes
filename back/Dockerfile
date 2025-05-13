FROM node:alpine3.20

WORKDIR /usr/src/api

COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

EXPOSE 3000

# CMD final: gera Prisma Client, aplica migrations e roda app
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run seed && npm run start:prod"]
