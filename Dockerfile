FROM node:latest AS builder

WORKDIR /src
COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]