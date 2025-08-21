# docker-go-nextjs
Docker Composeを用いて、nextjsとgo(echo×air)での環境。

## インストール方法
1. cloneする
```bash
git clone https://github.com/ryudedev/docker-go-nextjs.git
```

2. 開発環境を構築する。
```bash
cd docker-go-nextjs
docker compose up -d --build
```

3. ブラウザーを確認する。
[frontend](http://localhost:3000)
[backend](http://localhost:1323)

## 背景
dockerを使用して、NextjsとGoで開発することが多いためテンプレートを作成しておいた。# docker-golang
