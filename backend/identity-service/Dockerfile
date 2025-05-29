# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.13.1
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /app

# Install dependencies in a separate layer for better caching
COPY --link package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Copy application source code (excluding .env, lock files, etc.)
COPY --link . .

# Remove files that should not be in the image (safety net, but .dockerignore should handle this)
RUN rm -f .env *.log || true

# Create a non-root user and switch to it
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
USER appuser

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
EXPOSE 3001

CMD ["node", "server.js"]
