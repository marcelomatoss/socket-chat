# Etapa base com Node
FROM node:18-alpine AS base

# Etapa para instalar dependências
FROM base AS deps
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Etapa de build da aplicação
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npm run build

# Etapa final para execução com server.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

COPY --from=builder /app ./

EXPOSE 3000

CMD ["node", "server.js"]
