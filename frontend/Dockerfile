FROM node:24.6.0 AS deps

# 作業ディレクトリ
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー（キャッシュ効率化）
COPY src/package*.json ./

# 依存関係をインストール
RUN npm ci --only=production

# 開発用依存関係もインストール
FROM node:24.6.0 AS dev-deps
WORKDIR /app
COPY src/package*.json ./
RUN npm ci

# 実行ステージ
FROM node:24.6.0

WORKDIR /app

# Next.js dev serverのホットリロード有効化
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development

# 依存関係をコピー
COPY --from=dev-deps /app/node_modules ./node_modules

# package.jsonをコピー
COPY src/package*.json ./