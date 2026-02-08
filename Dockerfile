# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY . .

RUN npm install -g pnpm --registry=https://registry.npmmirror.com
RUN pnpm install --frozen-lockfile --registry=https://registry.npmmirror.com

RUN pnpm build

# ---------- Runner ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3800

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3800

CMD ["node", "server.js"]
