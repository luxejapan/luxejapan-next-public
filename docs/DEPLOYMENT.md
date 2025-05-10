# 部署文档

> 相关文档：
> - [项目需求书](../Requirements.md)
> - [开发规范](./DEVELOPMENT.md)

## 目录
1. [部署流程](#1-部署流程)
2. [GitHub Pages 配置](#2-github-pages-配置)
3. [自定义域名](#3-自定义域名)

## 1. 部署流程

### 1.1 开发环境
```bash
# 本地开发
npm run dev

# 访问
http://localhost:3000
```

### 1.2 生产环境
```bash
# 构建
npm run build

# 预览
npm run start
```

## 2. GitHub Pages 配置

### 2.1 仓库设置
- 私有仓库：`luxejapan-private`
- 公开仓库：`luxejapan-public`

### 2.2 GitHub Actions 配置
```yaml
name: Deploy to Public Repository
on:
  push:
    branches:
      - 'release/*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - name: Deploy to Public Repository
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out
          repository-name: luxejapan/luxejapan-public
          token: ${{ secrets.PUBLIC_REPO_TOKEN }}
```

## 3. 自定义域名

### 3.1 域名配置
- 添加 CNAME 文件
- 配置 DNS 记录
- 启用 HTTPS

### 3.2 环境变量
```env
NEXT_PUBLIC_SITE_URL=https://luxejapan.site
``` 