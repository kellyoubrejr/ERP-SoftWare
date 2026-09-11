# WriteFlow 产品介绍页面

基于 **Vue 3 + Vite + SCSS** 的 AI 写作工具产品介绍页面，滚动叙事设计，完全可自定义。

---

## 目录

1. [技术栈](#1-技术栈)
2. [项目结构](#2-项目结构)
3. [环境搭建与启动](#3-环境搭建与启动)
4. [全局配置详解](#4-全局配置详解)
5. [每个文件详解与自定义](#5-每个文件详解与自定义)
6. [组合函数（Composables）](#6-组合函数composables)
7. [添加新页面/路由](#7-添加新页面路由)
8. [添加新组件](#8-添加新组件)
9. [后端接口集成](#9-后端接口集成)
10. [构建与部署](#10-构建与部署)
11. [常见问题](#11-常见问题)

---

## 1. 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | ^3.4.21 | 前端框架（Composition API + `<script setup>`） |
| Vue Router | ^4.3.0 | 路由管理（页面跳转） |
| Pinia | ^2.1.7 | 状态管理（全局数据共享） |
| @vueuse/core | ^10.9.0 | Vue 工具函数库 |
| Vite | ^5.1.4 | 构建工具（开发服务器+打包） |
| Sass | ^1.71.1 | CSS 预处理器 |

---

## 2. 项目结构

```
MySelf-frontend/
├── index.html                     # 入口HTML（浏览器第一个加载的文件）
├── package.json                   # 依赖配置（所有npm包和脚本命令）
├── vite.config.js                 # Vite配置（端口、路径别名）
├── README.md                      # 本文档
│
└── src/                           # ★ 所有源码都在这里
    ├── main.js                    # Vue入口（创建应用，注册插件）
    ├── App.vue                    # 根组件（页面最外层容器）
    │
    ├── router/index.js            # 路由（URL→页面的映射关系）
    │
    ├── styles/
    │   ├── variables.scss         # ★ CSS变量（颜色/阴影/过渡→改这里改全站）
    │   └── main.scss              # 全局样式（重置+动画类）
    │
    ├── views/
    │   └── HomeView.vue           # 首页（组合所有板块组件的容器）
    │
    ├── components/                # ★ 每个板块是一个独立组件
    │   ├── AppHeader.vue          #   顶部导航栏（Logo+菜单+滚动进度条）
    │   ├── AppFooter.vue          #   底部版权信息
    │   ├── HeroSection.vue        #   Hero首屏（打字机标题+视差背景+CTA按钮）
    │   ├── PainPoints.vue         #   痛点区域（3张卡片）
    │   ├── FeaturesSection.vue    #   功能区域（4个功能，左右交替布局）
    │   ├── StatsSection.vue       #   数据统计（数字跳动动画）
    │   ├── TestimonialsSection.vue#   用户评价（3张评价卡片）
    │   └── CTASection.vue         #   底部CTA（渐变动画背景+注册按钮）
    │
    └── composables/               # 可复用的Vue逻辑
        ├── useRevealAnimation.js  #   滚动渐入动画
        └── useCounterAnimation.js #   数字跳动动画
```

---

## 3. 环境搭建与启动

### 前提
- 已安装 Node.js（>= 16，推荐18+）

### 启动
```bash
cd MySelf-frontend
npm install          # 安装依赖（首次需要）
npm run dev          # 启动开发服务器
```

浏览器访问 **http://localhost:3000**

### 可用命令

| 命令 | 用途 |
|------|------|
| `npm run dev` | 启动开发服务器（热更新，改代码自动刷新） |
| `npm run build` | 打包生产版本（输出到 `dist/` 目录） |
| `npm run preview` | 预览打包后的生产版本 |

---

## 4. 全局配置详解

### 4.1 Vite配置 (`vite.config.js`)

```javascript
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // ↑ @ 符号 = src 目录，所以 '@/components/AppHeader.vue' = 'src/components/AppHeader.vue'
    }
  },
  server: {
    port: 3000,    // ★ 开发端口，改这里
    host: true     // 允许局域网IP访问
  }
})
```

### 4.2 CSS变量 (`src/styles/variables.scss`) — ★ 改这里改全站颜色

```scss
::root {
    // ======= 品牌颜色（最常改的）=======
    --primary: #6366f1;           // 主色（靛蓝色）
    --primary-light: #818cf8;     // 主色浅变体
    --secondary: #ec4899;         // 辅色（玫红色）
    --accent: #8b5cf6;            // 强调色（紫色）

    // ======= 深色（Hero/Stats/CTA背景）=======
    --dark: #0f172a;
    --dark-light: #1e293b;

    // ======= 灰色系（由浅到深）=======
    --gray-100: #f1f5f9;          // 浅灰背景（痛点/评价区域背景）
    --gray-200: #e2e8f0;          // 边框线
    --gray-500: #64748b;          // 次要文字
    --gray-600: #475569;          // 正文文字
    --gray-800: #1e293b;          // 主要文字
    --white: #ffffff;

    // ======= 渐变（自动跟随上面的颜色）=======
    --gradient-primary: linear-gradient(135deg, var(--primary), var(--secondary));
    --gradient-dark: linear-gradient(135deg, var(--dark), var(--dark-light));

    // ======= 阴影和过渡 =======
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --transition-all: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

**改品牌色示例：** 把 `--primary: #6366f1` 改成 `--primary: #3b82f6`，全站主色自动变为蓝色。

---

## 5. 每个文件详解与自定义

### 5.1 `index.html` — 入口HTML

```html
<title>WriteFlow — AI 驱动的下一代写作工具</title>
<!-- ★ 改网站标题 -->
<link rel="icon" href="/favicon.ico">
<!-- ★ 改图标：把 favicon.ico 放到项目根目录 -->
```

### 5.2 `src/App.vue` — 根组件

```vue
<template>
  <div id="app">
    <AppHeader />        <!-- 顶部导航栏（不需要就删掉这行） -->
    <main>
      <RouterView />     <!-- ★ 路由内容（根据URL显示不同页面） -->
    </main>
    <AppFooter />        <!-- 底部版权（不需要就删掉这行） -->
  </div>
</template>
```

### 5.3 `src/router/index.js` — 路由配置

```javascript
routes: [
  {
    path: '/',                    // 访问 http://localhost:3000/
    name: 'home',                 // 路由名称
    component: HomeView           // 显示 HomeView.vue
  }
  // ★ 添加新路由在这里：
  // { path: '/about', name: 'about', component: AboutView },
]
```

### 5.4 `src/views/HomeView.vue` — 首页

```vue
<template>
  <div class="home-view">
    <HeroSection />             <!-- ★ 调整区域顺序：上下移动组件位置 -->
    <PainPoints />
    <FeaturesSection />
    <StatsSection />
    <TestimonialsSection />
    <CTASection />
    <!-- ★ 删除不需要的区域：删掉对应行 -->
    <!-- ★ 添加新区域：在这里import并使用 -->
  </div>
</template>
```

### 5.5 `src/components/AppHeader.vue` — 导航栏

**自定义对照表：**

| 要改什么 | 改哪里 | 代码示例 |
|---------|--------|---------|
| Logo文字 | 第4行 | `<div class="nav-logo">小凯利</div>` → 改成你的品牌名 |
| 菜单项 | 第5-11行 | 修改 `<li>` 内的文字和 `href` |
| 添加新菜单项 | 第11行后 | 复制一行 `<li><a href="#xxx" @click.prevent="scrollTo('xxx')">菜单名</a></li>` |
| 滚动后背景色 | 第67-72行 | `&.scrolled { background: rgba(255,255,255,0.95); }` |
| Logo渐变色 | 第78-82行 | 跟随 `--gradient-primary` 变量 |
| 移动端隐藏菜单 | 第132-136行 | `@media (max-width: 768px) { .nav-links { display: none; } }` |

**导航链接原理：**
```html
<a href="#pain" @click.prevent="scrollTo('pain')">痛点</a>
```
- `href="#pain"` → 点击跳转到 `id="pain"` 的元素
- `@click.prevent` → 阻止默认跳转，用JS平滑滚动
- `scrollTo('pain')` → 滚动到 `document.getElementById('pain')`

### 5.6 `src/components/HeroSection.vue` — Hero首屏

**自定义对照表：**

| 要改什么 | 改哪里 | 具体位置 |
|---------|--------|---------|
| 打字机文案 | `phrases` 数组 | 第26行：`const phrases = ["用 AI 重新定义写作", ...]` |
| 打字速度 | `setTimeout` | 第46行：`100` = 每个字100ms |
| 删除速度 | `setTimeout` | 第57行：`50` = 每个字50ms |
| 暂停时间 | `setTimeout` | 第43行：`2000` = 打完一句停2秒 |
| 标题字号 | `.hero h1` | 第172行：`font-size: 4rem` |
| 标题颜色 | `.hero h1` | 第174行：`color: var(--white)` |
| Hero背景色 | `.hero` | 第120行：`background: linear-gradient(135deg, #0f172a, ...)` |
| CTA按钮文字 | 模板 | 第9行：`免费开始使用 →` |
| CTA按钮颜色 | `.hero-cta-primary` | 第234-242行 |
| CTA点击行为 | `handleCTA` 函数 | 第88-91行：当前是 `alert('注册功能即将上线！')` |
| 视差圆圈数量 | `createParallax` | 第64行：`15` 改为其他数字 |
| 视差圆圈大小 | `createParallax` | 第67行：`Math.random() * 300 + 100` |
| Hero高度 | `.hero` | 第113行：`min-height: 100vh`（100%视口高度） |

**改CTA按钮点击跳转示例：**
```javascript
// 改成跳转到注册页面
const handleCTA = () => {
  window.location.href = '/register'
}
// 或使用Vue Router
import { useRouter } from 'vue-router'
const router = useRouter()
const handleCTA = () => {
  router.push('/register')
}
```

### 5.7 `src/components/PainPoints.vue` — 痛点区域

**自定义对照表：**

| 要改什么 | 改哪里 | 代码位置 |
|---------|--------|---------|
| 区域标题 | `<h2>` | 第5行 |
| 区域副标题 | `<p>` | 第6行 |
| 第1张卡片图标 | `.pain-icon` | 第10行：`😫` |
| 第1张卡片标题 | `<h3>` | 第11行：`灵感枯竭` |
| 第1张卡片描述 | `<p>` | 第12行 |
| 第2张卡片 | 类似位置 | 第15-17行 |
| 第3张卡片 | 类似位置 | 第20-22行 |
| 卡片悬停效果 | `&:hover` | 第108-115行 |
| 添加第4张卡片 | 复制卡片块 | 见下方说明 |

**添加新卡片步骤：**

第1步：在模板中复制一个 `<div class="pain-card">` 块：
```html
<div class="pain-card reveal" style="transition-delay: 0.55s" ref="card4">
    <div class="pain-icon">🚀</div>
    <h3>新痛点标题</h3>
    <p>新痛点描述内容...</p>
</div>
```

第2步：在 `<script setup>` 中添加 ref：
```javascript
const card4 = ref(null)
```

第3步：加入动画数组：
```javascript
useRevealAnimation([label1, title1, subtitle1, card1, card2, card3, card4])
```

### 5.8 `src/components/FeaturesSection.vue` — 功能区域

**自定义对照表：**

| 要改什么 | 改哪里 | 代码位置 |
|---------|--------|---------|
| 区域标题 | `<h2>` | 第5行 |
| 功能1标签 | `<span class="badge">` | 第14行：`灵感引擎` |
| 功能1标题 | `<h3>` | 第15行 |
| 功能1描述 | `<p>` | 第16行 |
| 功能1特性列表 | `<ul>` 内的 `<li>` | 第17-21行 |
| 功能1图标 | `.icon-box` | 第12行：`💡` |
| 功能1配色 | `.feature-row:nth-child(1)` | 第183行 |
| 功能2-4 | 类似位置 | 第25-70行 |
| 功能行排列方向 | `&:nth-child(even)` | 第138行：`flex-direction: row-reverse` |

**功能行配色对照：**
```
第1行：紫色渐变 #6366f1 → #ec4899
第2行：蓝色渐变 #06b6d4 → #3b82f6
第3行：绿色渐变 #10b981 → #059669
第4行：橙色渐变 #f59e0b → #ef4444
```

### 5.9 `src/components/StatsSection.vue` — 数据统计

**自定义对照表：**

| 要改什么 | 改哪里 | 代码位置 |
|---------|--------|---------|
| 区域标题 | `<h2>` | 第5行 |
| 用户数目标值 | `useCounterAnimation` | 第49行：`10000000` |
| 语言数目标值 | `useCounterAnimation` | 第50行：`50` |
| 可用性目标值 | `useCounterAnimation` | 第51行：`99.9` |
| 效率倍数目标值 | `useCounterAnimation` | 第52行：`3` |
| 动画时长 | 第三个参数 | `2000` = 2秒 |
| 数字后缀 | 模板中 | `+`、`%`、`x` |
| 标签文字 | `.stat-label` | "全球用户"、"支持语言"等 |
| 深色背景 | `.stats-section` | 第57行 |

### 5.10 `src/components/TestimonialsSection.vue` — 用户评价

**自定义对照表：**

| 要改什么 | 改哪里 | 代码位置 |
|---------|--------|---------|
| 区域标题 | `<h2>` | 第5行 |
| 评价1引言 | `<blockquote>` | 第11行 |
| 评价1星级 | `.testimonial-stars` | 第10行 |
| 评价1头像 | `.testimonial-avatar` | 第13行 |
| 评价1姓名 | `.testimonial-name` | 第14行 |
| 评价1职位 | `.testimonial-role` | 第15行 |
| 评价2/3 | 类似位置 | 第20-41行 |
| 头像背景色 | nth-child | 第170-172行 |

### 5.11 `src/components/CTASection.vue` — 底部CTA

**自定义对照表：**

| 要改什么 | 改哪里 | 代码位置 |
|---------|--------|---------|
| CTA标题 | `<h2>` | 第5行 |
| CTA描述 | `<p>` | 第6行 |
| 按钮文字 | `<a class="cta-btn">` | 第7行 |
| 按钮点击行为 | `handleCTA` 函数 | 第24-27行 |
| 用户数量提示 | `.cta-note` | 第8行 |
| 渐变背景动画 | `.cta-bg` | 第40-47行 |
| 渐变动画速度 | `animation` | 第46行：`8s` = 8秒一个循环 |

---

## 6. 组合函数（Composables）

### 6.1 `useRevealAnimation.js` — 滚动渐入动画

**原理：** 用 IntersectionObserver 监听元素，滚动到视口时添加 `.visible` 类触发动画。

**使用方法：**
```vue
<script setup>
import { ref } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const myElement = ref(null)
useRevealAnimation([myElement])
</script>

<template>
  <!-- 3种动画方向选一个 -->
  <div class="reveal" ref="myElement">从下方滑入</div>
  <div class="reveal-left" ref="myElement">从左侧滑入</div>
  <div class="reveal-right" ref="myElement">从右侧滑入</div>
</template>
```

**可调参数（函数内部）：**
- `threshold: 0.15` → 元素15%可见时触发（0~1，越小越早触发）
- `rootMargin: "0px 0px -60px 0px"` → 提前60px触发

### 6.2 `useCounterAnimation.js` — 数字跳动动画

**原理：** IntersectionObserver + requestAnimationFrame 实现数字从0到目标值的递增。

**使用方法：**
```vue
<script setup>
import { ref } from 'vue'
import { useCounterAnimation } from '@/composables/useCounterAnimation'

const counter = ref(null)
useCounterAnimation(counter, 1000000, 2000)  // 目标100万，动画2秒
</script>

<template>
  <div><span ref="counter">0</span>+</div>
</template>
```

**参数说明：**
```javascript
useCounterAnimation(ref, target, duration, decimals)
// ref      - Vue的ref对象，绑定到显示数字的DOM元素
// target   - 目标数字
// duration - 动画时长（毫秒，默认2000）
// decimals - 小数位数（默认0=整数，如99.9用1）
```

**数字格式化规则：**
- >= 1000000 → 显示"1000万"格式
- decimals > 0 → 显示小数
- 其他 → 整数，千分位分隔

---

## 7. 添加新页面/路由

### 第1步：创建页面组件

新建 `src/views/AboutView.vue`：
```vue
<template>
  <div class="about-view">
    <h1>关于我们</h1>
    <p>这是关于页面的内容。</p>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.about-view {
  padding: 8rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}
</style>
```

### 第2步：注册路由

打开 `src/router/index.js`：
```javascript
import AboutView from '../views/AboutView.vue'

routes: [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },  // ★ 新增
]
```

### 第3步：添加导航链接

打开 `src/components/AppHeader.vue`，在菜单 `<ul>` 里添加：
```html
<li><router-link to="/about">关于我们</router-link></li>
```

---

## 8. 添加新组件

### 第1步：创建组件文件

新建 `src/components/PricingSection.vue`：
```vue
<template>
  <section class="pricing-section" id="pricing">
    <div class="section-header">
      <h2 class="section-title reveal" ref="title">选择适合你的方案</h2>
    </div>
    <div class="pricing-grid">
      <div class="pricing-card">
        <h3>免费版</h3>
        <div class="price">¥0/月</div>
        <ul>
          <li>基础AI写作</li>
          <li>5000字/月</li>
        </ul>
        <button>开始使用</button>
      </div>
      <div class="pricing-card featured">
        <h3>专业版</h3>
        <div class="price">¥99/月</div>
        <ul>
          <li>高级AI写作</li>
          <li>无限字数</li>
          <li>50+语言翻译</li>
        </ul>
        <button>立即订阅</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const title = ref(null)
useRevealAnimation([title])
</script>

<style lang="scss" scoped>
.pricing-section {
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}
.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--gray-900);
  margin-bottom: 3rem;
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.pricing-card {
  background: var(--white);
  border-radius: 20px;
  padding: 3rem 2rem;
  border: 1px solid var(--gray-200);
  transition: var(--transition-all);
  &:hover { transform: translateY(-8px); box-shadow: var(--shadow-xl); }
  &.featured { border-color: var(--primary); box-shadow: 0 0 0 2px var(--primary); }
}
.price { font-size: 3rem; font-weight: 800; color: var(--primary); margin: 1rem 0; }
</style>
```

### 第2步：在首页使用

打开 `src/views/HomeView.vue`：
```vue
<script setup>
import PricingSection from '@/components/PricingSection.vue'  // ★ 导入
import HeroSection from '@/components/HeroSection.vue'
// ...其他导入
</script>

<template>
  <div class="home-view">
    <HeroSection />
    <PainPoints />
    <FeaturesSection />
    <PricingSection />   <!-- ★ 放在想放的位置 -->
    <StatsSection />
    <TestimonialsSection />
    <CTASection />
  </div>
</template>
```

### 第3步：在导航栏添加锚点（可选）

打开 `src/components/AppHeader.vue`：
```html
<li><a href="#pricing" @click.prevent="scrollTo('pricing')">定价</a></li>
```

---

## 9. 后端接口集成

### 9.1 创建API模块

新建 `src/api/index.js`：
```javascript
const API_BASE_URL = 'https://your-api-domain.com'  // ★ 改成你的后端地址

async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('API请求失败:', error)
    throw error
  }
}

// 获取产品数据
export function fetchProductData() {
  return apiRequest('/api/product')
}

// 提交注册
export function submitRegistration(userData) {
  return apiRequest('/api/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  })
}

// 获取用户评价
export function fetchTestimonials() {
  return apiRequest('/api/testimonials')
}
```

### 9.2 在组件中使用

以 CTA 注册按钮为例，打开 `src/components/CTASection.vue`：
```vue
<script setup>
import { ref } from 'vue'
import { submitRegistration } from '@/api/index.js'

const handleCTA = async () => {
  try {
    const result = await submitRegistration({ email: 'user@example.com' })
    alert('注册成功！')
  } catch (error) {
    alert('注册失败，请重试')
  }
}
</script>
```

### 9.3 后端需要实现的API

| 接口 | 方法 | 说明 | 响应格式 |
|------|------|------|---------|
| `/api/product` | GET | 获取产品数据 | `{ name, features, stats }` |
| `/api/register` | POST | 用户注册 | `{ success, message, userId }` |
| `/api/testimonials` | GET | 获取评价列表 | `{ testimonials: [...] }` |

---

## 10. 构建与部署

### 开发环境
```bash
npm run dev    # 启动开发服务器 http://localhost:3000
```

### 构建生产版本
```bash
npm run build  # 输出到 dist/ 目录
```

### 部署方式

| 方式 | 说明 |
|------|------|
| **Nginx** | 将 `dist/` 目录内容放到 Nginx 的网站根目录 |
| **Apache** | 将 `dist/` 目录内容放到 Apache 的 DocumentRoot |
| **CDN** | 上传 `dist/` 到阿里云OSS、腾讯云COS等 |
| **Vercel** | 连接Git仓库，自动构建部署 |
| **Netlify** | 同上 |

### Nginx配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/writeflow;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;  # ★ 重要：SPA路由支持
    }
}
```

---

## 11. 常见问题

### Q: 修改代码后页面没刷新？
A: 确保用 `npm run dev` 启动，Vite 开发服务器支持热更新。

### Q: `@` 路径别名不生效？
A: 检查 `vite.config.js` 中的 alias 配置是否正确。

### Q: SCSS 变量在组件中无法使用？
A: 确保 `variables.scss` 已在 `main.scss` 中通过 `@import` 导入，且 `main.scss` 已在 `main.js` 中引入。

### Q: 部署后刷新页面404？
A: 需要配置服务器将所有路由重定向到 `index.html`（见上方Nginx配置的 `try_files`）。

### Q: 动画在手机上卡顿？
A: 所有动画都使用了 `transform` 和 `opacity`（GPU加速），如果仍然卡顿可以减少圆圈数量或关闭动画。

### Q: 如何修改网站图标？
A: 将 `favicon.ico`（推荐 32x32 或 16x16 像素）放在项目根目录（和 `index.html` 同级）。
