FROM --platform=linux/amd64 node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache python3 make g++

RUN npm install --legacy-peer-deps && apk del python3 make g++

COPY . .

COPY ./dist ./dist

CMD ["nmp", "run", "start:dev"]
