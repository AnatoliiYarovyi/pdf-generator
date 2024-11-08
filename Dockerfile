FROM node:20-slim as build

WORKDIR /app
COPY . .

ENV YARN_CACHE_FOLDER=/root/.yarn
RUN yarn install --frozen-lockfile
RUN yarn build

FROM --platform=linux/amd64 node:20-slim
COPY --from=build /app/dist dist
COPY --from=build /app/puppeteer.config.cjs puppeteer.config.cjs

# Install necessary dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxss1 \
    libxtst6 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

RUN yarn add puppeteer

EXPOSE 5000

CMD ["node", "dist/index.js"]

