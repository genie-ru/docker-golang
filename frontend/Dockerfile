FROM node:24.6.0

# 作業ディレクトリ
WORKDIR /app

# Next.js dev serverのホットリロード有効化
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development

# create-next-appをインストール
RUN npm install -g npm@latest && npm update