# ECGIntelligenceAnalysisPlatform

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 环境变量

前端请求地址在 `src/utils/request.js` 中读取 `VITE_API_URL`，未设置时默认走 `/api`。

本地开发代理目标地址可通过 `VITE_PROXY_TARGET` 配置（在 `vite.config.js` 中读取）：

```env
VITE_API_URL=/api
VITE_PROXY_TARGET=http://localhost:8080
```

## Docker 构建与运行

项目已支持 Docker 多阶段构建，生产环境通过 Nginx 托管静态资源，并使用运行时环境变量 `BACKEND_URL` 反向代理 `/api`。

说明：容器运行时后端地址和对外端口都可通过环境变量控制。

### 构建镜像

```sh
docker build -t ecg-platform:latest .
```

### 运行容器（通过环境变量指定后端）

```sh
docker run -d \
  --name ecg-platform \
  -p ${FRONTEND_PORT:-8080}:80 \
  -e BACKEND_URL=http://your-backend-host:8080 \
  ecg-platform:latest
```

访问地址：`http://localhost:8080`

### 使用 Docker Compose（自动构建并启动）

先在项目根目录创建 `.env` 并配置后端地址（可基于 `.env.example`）：

```env
FRONTEND_PORT=8080
BACKEND_URL=http://your-backend-host:8080
```

可选：如果你希望显式控制前端请求前缀，也可在 `.env` 中设置：

```env
VITE_API_URL=/api
```

然后执行：

```sh
docker compose up -d --build
```

