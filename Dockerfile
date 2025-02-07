FROM --platform=linux/amd64 node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache python3 make g++

RUN npm install --legacy-peer-deps && apk del python3 make g++

COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

CMD ["node", "dist/main"]
