FROM node:20-alpine as build

WORKDIR /app
# COPY .env ./.env 
COPY src ./src 
COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json

ENV YARN_CACHE_FOLDER=/root/.yarn
RUN yarn install
RUN yarn build

FROM zenika/alpine-chrome:124-with-node

USER root

COPY --from=build /app/dist dist
# COPY --from=build /app/.env .env

EXPOSE 5000

CMD ["node", "dist/index.js"]
