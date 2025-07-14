# Stage 1: Build the Next.js application
FROM node:24.4-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application for production
RUN npm run build

# Stage 2: Create the production-ready image
FROM node:24.4-alpine AS runner

WORKDIR /app

# Set environment variables for production
ARG PORT=3000
ARG NEXT_PUBLIC_API_EDU_TRACE

ENV PORT=$PORT
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV NEXT_PUBLIC_API_EDU_TRACE=$NEXT_PUBLIC_API_EDU_TRACE

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application in production mode
CMD ["npm", "start"]
