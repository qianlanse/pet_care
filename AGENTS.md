# 项目说明

## 沟通要求

- 所有面向用户的回答尽量使用中文。
- 修改项目前先通读相关文件，保持现有实现风格，不做无关重构。

## 项目概览

- 项目名：`pet-care`。
- 类型：Next.js App Router 单页面落地页。
- 主题：`木屿宠物洗护`，一个面向中文用户的宠物洗护/美容门店官网示例。
- 页面目标：展示服务项目、护理流程、门店氛围、店内环境轮播、客户反馈、价格套餐、门店地址，并提供预约洗护表单。
- 主要语言：TypeScript、React、CSS。
- 包管理器：项目包含 `pnpm-lock.yaml`，优先使用 `pnpm`。

## 技术栈

- `next`：使用 App Router，入口在 `app/`。
- `react` / `react-dom`：页面与交互组件。
- `tailwindcss` + `@tailwindcss/postcss`：通过 `app/globals.css` 中的 `@import "tailwindcss";` 接入。
- `eslint-config-next`：Next.js ESLint 配置。
- `node:test`：用 Node 内置测试框架做项目结构和页面标记测试。
- TypeScript 开启 `strict`，`tsconfig.json` 使用 `moduleResolution: "bundler"`，并配置 `@/*` 指向项目根目录。

## 常用命令

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm test
```

`package.json` 中脚本实际对应：

- `dev`: `next dev`
- `build`: `next build`
- `start`: `next start`
- `lint`: `eslint`
- `test`: `node --test`

## 目录结构

- `app/layout.tsx`：根布局，设置 `zh-CN` 语言、页面元信息、全局 CSS、Google Fonts 预连接和字体引入。
- `app/page.tsx`：主页面。包含大部分静态内容数据和页面分区结构。
- `app/globals.css`：全局样式、响应式布局、动画、轮播、表单、价格卡片、地点大图等视觉实现。
- `app/components/BookingForm.tsx`：客户端预约表单，提交后只在前端显示“预约已收到”，没有真实后端提交。
- `app/components/EnvironmentCarousel.tsx`：客户端店内环境轮播，使用 `useState` 切换接待区、洗护区、吹护区。
- `app/components/PricingGrid.tsx`：客户端价格套餐网格，鼠标悬停时切换 `featured` 高亮。
- `app/components/ScrollReveal.tsx`：客户端滚动进入动画，使用 `IntersectionObserver`，并处理 `prefers-reduced-motion` 和不支持观察器的情况。
- `public/imagegen/`：页面使用的 PNG 图片资产，包含店内环境图和门店位置地图。
- `output/imagegen/`：生成图片的工作产物和提示词说明，被 `.gitignore` 忽略。
- `legacy-index.html`：迁移到 Next.js 之前的静态 HTML 备份。
- `test/site.test.js`：Node 测试，校验迁移结构、文案、图片路径、轮播标记、动效、价格卡片和地点区实现。
- `docs/plans/2026-05-07-review-carousel.md`：客户反馈轮播的历史实现计划。
- `.codex/environments/environment.toml`：Codex 运行配置，默认运行命令为 `pnpm dev`。

## 页面内容与功能

- 顶部固定导航包含品牌、服务项目、护理流程、价格套餐、门店地址、预约洗护入口。
- Hero 区使用远程 Pexels 图片作为全屏背景，叠加预约表单与门店卖点。
- 服务项目包括基础洗护、精细修毛、猫咪轻护、附加护理。
- 护理流程包括进店评估、分区清洁、独立吹护、整理交接。
- 店内环境区展示接待区、洗护区、吹护区三张本地图片。
- 客户反馈区使用 CSS marquee 式横向轮播，重复渲染两组评价实现无缝滚动，悬停或聚焦时暂停。
- 价格套餐包含轻洗护、标准洗护、舒缓护理，默认高亮标准洗护。
- 地点区使用 `public/imagegen/store-location-map.png` 作为全屏地图背景，门店地址为“上海市宜川路街道陕西北路 1620 号”。

## 样式与交互约定

- 视觉风格偏暖色、浅木、米白、鼠尾草绿和低饱和橙色，强调安静、洁净、精品门店感。
- 主要设计变量集中在 `app/globals.css` 的 `:root`。
- 页面大量使用 `data-animate` 标记配合 `ScrollReveal` 做进入动画。
- 动画需保留 `prefers-reduced-motion: reduce` 兜底，避免破坏无障碍体验。
- 现有 ESLint 规则关闭了 `@next/next/no-img-element` 和 `@next/next/no-page-custom-font`，因此项目当前允许直接使用 `<img>` 和页面内字体链接。
- 轮播、表单、价格卡片这类需要状态的组件必须保留 `"use client"`。
- 避免新增 SVG 装饰；现有测试明确检查页面源码不包含 `<svg>`。

## 测试关注点

`test/site.test.js` 不是端到端浏览器测试，而是读取文件内容做结构和标记断言。修改页面时要注意这些约束：

- 根目录不应恢复 `index.html`，旧静态页应保留为 `legacy-index.html`。
- `app/layout.tsx`、`app/page.tsx`、`app/globals.css` 和三个客户端组件需要存在。
- 关键中文文案、服务区、流程区、环境区、价格区、地址区、预约表单字段不能随意删除。
- 图片路径需要继续指向 `/imagegen/reception-lounge.png`、`/imagegen/wash-zone.png`、`/imagegen/drying-styling-zone.png`、`/imagegen/store-location-map.png`。
- 客户反馈轮播依赖 `.review-carousel`、`.review-track`、`.review-set`、`@keyframes review-scroll` 等标记。
- 价格卡片悬停样式和 `PricingGrid` 中通过 `activeIndex` 切换 `featured` 的逻辑有测试覆盖。
- Hero 区和地点区都要求全屏宽度、绝对定位背景以及覆盖层布局。

## 资产说明

- `public/imagegen/*.png` 是运行时引用的正式静态资源。
- `output/imagegen/README.md` 记录过 AI 出图提示词和建议模型设置；该目录属于工作产物，不作为页面运行依赖。
- 当前 `public/imagegen` 图片尺寸：
  - `reception-lounge.png`、`wash-zone.png`、`drying-styling-zone.png`：1672 x 941。
  - `store-location-map.png`：1586 x 992。

## 开发注意事项

- 优先保持单页信息架构，不要轻易拆成多路由。
- 新增或调整页面区块时，同时检查 `app/page.tsx`、`app/globals.css` 和 `test/site.test.js` 的断言是否需要同步。
- 如果修改交互组件，先确认是否需要保留客户端组件边界。
- 如果修改图片资产路径，必须同步更新页面、测试和静态资源。
- 若继续使用远程图片或字体，注意 Next.js 构建环境是否允许网络访问；本项目当前未配置 `next/image` 域名，因为直接使用 `<img>`。
- 运行验证时优先执行 `pnpm test`、`pnpm lint`、`pnpm build`。
