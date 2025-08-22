FROM node:24.6.0 AS deps

# 作業ディレクトリ
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY src/package*.json ./

RUN npm install -g npm@latest && npm update