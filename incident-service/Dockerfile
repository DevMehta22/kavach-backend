FROM --platform=linux/amd64 node:22 as builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

FROM --platform=linux/amd64 node:22-slim

COPY --from=builder /app .

EXPOSE 3003

CMD [ "npm","run","dev" ]


