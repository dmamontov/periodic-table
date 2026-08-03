[English](README.md) | [Русский](README.ru.md) | **中文**

# 化学元素周期表

基于 Vue 3 + TypeScript 打造的交互式元素周期表：每个元素卡片包含数十项参考属性，以及本项目的核心特色 —— 一份真实的个人 **马蒙托夫元素收藏**，包含样品照片、纯度、同位素组成，以及用 RadiaCode 剂量仪测得的伽马能谱。

## 功能特性

- **完整元素周期表** —— 全部 118 个元素，包括 f 区（镧系/锕系），适配桌面与移动端的响应式布局
- **元素卡片** —— 12+ 个专项板块：概况、物理与热力学性质、原子与电磁特性、晶体结构、反应活性、自然丰度、应用
- **元素收藏** —— 样品状态与容器、纯度、同位素、来源（直接来源 / 衰变产物及衰变链）、照片，以及可下载原始 XML 的交互式伽马能谱
- **放射性标注** —— 表格中标出放射性元素，提供 NFPA 704 与 GHS 象形图卡片、同位素与半衰期数据
- **多语言** —— 俄语、英语、中文（即时切换，自动检测浏览器语言）
- **深色/浅色主题** —— 手动切换或跟随系统
- **PWA** —— 可安装到设备，支持离线使用（Workbox 预缓存）

## 技术栈

- [Vue 3](https://vuejs.org/)（Composition API，`<script setup>`）+ [Vue Router 4](https://router.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)，[Vite 8](https://vitejs.dev/)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)（Workbox）—— 离线模式与自动更新
- 自研的轻量 composable 实现 i18n 与主题切换（不依赖 vue-i18n/Pinia 等外部库）
- ESLint + typescript-eslint

## 快速开始

需要 Node.js 22+ 和 [pnpm](https://pnpm.io/)。

```bash
pnpm install
pnpm dev
```

应用将运行在 `http://localhost:5173`。

## 建立属于你自己的收藏

Fork 了本项目、想记录自己的元素收藏？需要修改的内容全部集中在**一个文件**里：[`src/data/myCollection.ts`](src/data/myCollection.ts)。不需要动 `elements.json`，也不需要动语言文件。

- `collectionName` / `siteTitle` / `siteUrl` —— 重命名收藏名称，并换成你自己的域名。
- `myElements` —— 一个"元素符号 → 详情"的映射表。只要加上一个键就代表这个元素归你所有；空对象 `{}` 已经足够（"我有这个元素，细节以后再补"）。`sampleState`、`container`、`purity`、`isotope`、`sourceType`、`decayParent`、`spectrum` 都是可选字段，可以慢慢填。
- 如果内置的 `sampleState`/`container`/`sourceType` 词汇表（在 [`src/locales/partials/collection.ts`](src/locales/partials/collection.ts) 中）不够用，你可以在那里添加新条目，也可以完全跳过词汇表，直接把现成的文字写进该元素的 `description` 字段 —— `myCollection.ts` 里的放射性元素就是这么做的，可以参考。
- 任何文本字段既可以写成一个普通字符串（在三种界面语言下都显示同一内容），也可以写成 `{ ru, en, zh }` 对象来分别翻译。

伽马能谱（`spectrum`/`spectrumFilename` 字段）是可选的 —— 只有当你确实有测量文件要放进 `src/data/spectra/` 时才需要填写。

## 脚本命令

| 命令 | 用途 |
|---|---|
| `pnpm dev` | 支持热重载的开发服务器 |
| `pnpm build` | 类型检查（`vue-tsc`）+ 生产环境构建 |
| `pnpm preview` | 本地预览生产构建 |
| `pnpm typecheck` | 仅执行类型检查 |
| `pnpm lint` / `pnpm lint:fix` | 代码检查（ESLint） |
| `pnpm check` | `typecheck` + `lint` |

### 数据更新

一套独立的脚本管线（`scripts/*.mjs`）从外部数据源抓取并重建参考数据 —— 需手动运行，不属于常规构建流程：

| 命令 | 用途 |
|---|---|
| `pnpm data:details` | 元素属性 → `src/data/details.json` |
| `pnpm data:details:optimize` | 优化/压缩 `details.json` |
| `pnpm data:images` | 元素照片 → `src/assets/element-images/` |
| `pnpm data:spectra` | 元素发射光谱 → `src/assets/element-spectra/` |
| `pnpm data:grids` | 晶体结构插图 → `src/assets/grid-structures/` |
| `pnpm data:nfpa:apply` | NFPA 评级 → `details.json` |
| `pnpm data:nfpa:validate` | 校验 `scripts/data/nfpa-element-ratings.json` |
| `pnpm data:ghs` | GHS 象形图 → `src/data/element-ghs.json` |
| `pnpm data:youtube` | Thoisoi 视频链接 → `src/data/thoisoi-youtube.json` |
| `pnpm data:spectrum:convert` | 将 RadiaCode 的 XML 能谱转换为收藏用的 JSON |

部分脚本会调用外部 API，需要在 `.env.local` 中配置 `VITE_PT_API_TOKEN`（详见 `scripts/fetch-element-details.mjs` 中的注释）。

## 项目结构

```
src/
├── components/     # UI 组件（周期表、元素卡片、筛选器、热力图……）
├── composables/     # 可复用逻辑（useElementDetail）
├── data/            # 元素数据、参考表、收藏能谱
├── locales/         # 翻译文本（ru/en/zh）与本地化词典
├── router/          # 路由（/、/element/:symbol）
├── theme/           # 主题处理（浅色/深色/自动）
├── types/           # 元素数据类型
├── utils/           # 格式化、热力图、同位素、GHS/NFPA
└── views/           # 应用页面
scripts/             # 离线数据更新管线
```

## Docker

```bash
docker build -t periodic-table .
docker run -p 3000:3000 periodic-table
```

多阶段构建：`node:22-alpine` 构建生产环境产物，最终镜像为提供静态文件服务的 `nginx:alpine`（详见 `Dockerfile`、`nginx.conf`）。Compose 示例见 `docker-compose.yml`。

## 数据与来源

元素参考属性、GHS 象形图与样品照片，通过 `scripts/` 中的脚本从公开来源（PubChem、维基百科、periodic-table.tech 等）聚合而来；NFPA 704 评级与收藏的伽马能谱则为作者本人的实测与校验数据。这些数据仅用于教育与个人项目用途。

## 许可证

本仓库中的代码采用 [MIT 许可证](LICENSE)。第三方参考数据与图片（见"数据与来源"一节）可能受其原始来源自身条款的约束。
