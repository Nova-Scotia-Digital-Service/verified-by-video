FROM node:20

WORKDIR /app
COPY . .
RUN corepack enable
RUN yarn install
RUN yarn build:api
RUN yarn build:web
