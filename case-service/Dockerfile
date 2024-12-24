FROM node:22 as builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

FROM node:22-slim

COPY --from=builder /app .

EXPOSE 3005

COPY .env.sample .env

CMD [ "npm","run","dev" ]


