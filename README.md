# 0xSHIELD 网络安全社团网站

![License](https://img.shields.io/badge/license-MIT-green)
![Vue.js](https://img.shields.io/badge/vue.js-3.x-brightgreen)
![Vite](https://img.shields.io/badge/vite-^7.2.4-blue)

> 一个现代、酷炫的网络安全社团网站，采用Vue 3 + Vite构建，具有赛博朋克风格界面设计。

## 项目简介

0xSHIELD是一个专注于网络安全教育和技术分享的学生社团网站。网站采用现代化的前端技术栈构建，具有强烈的赛博朋克视觉风格，旨在吸引对网络安全感兴趣的学生加入社团。

网站包含了以下功能模块：
- 主页：展示社团介绍和核心方向
- 关于我们：社团历史和核心成员介绍
- 活动中心：展示社团活动和赛事安排
- 加入我们：成员申请表单和CTF挑战

## 技术栈

- [Vue 3](https://v3.vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 新一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [Element Plus](https://element-plus.org/) - Vue 3 UI组件库
- [Pinia](https://pinia.vuejs.org/) - Vue状态管理
- [Vue Router](https://router.vuejs.org/) - Vue路由管理
- [Font Awesome](https://fontawesome.com/) - 图标库

## 项目结构

```
src/
├── assets/           # 静态资源文件
├── components/       # 全局组件
│   ├── Header.vue    # 顶部导航栏
│   └── Footer.vue    # 底部页脚
├── router/           # 路由配置
│   └── index.js
├── stores/           # 状态管理
│   └── user.js
├── view/             # 页面视图
│   ├── HomeView.vue  # 首页
│   ├── AboutView.vue # 关于我们
│   ├── ActivityView.vue # 活动中心
│   └── JoinUsView.vue # 加入我们
├── App.vue           # 根组件
└── main.js           # 入口文件
```

## 功能特色

### 1. 赛博朋克风格界面
- 绿色荧光配色方案
- 数字矩阵背景动画
- 扫描线效果
- 故障艺术文字效果

### 2. 响应式设计
- 完全适配移动端和桌面端
- 自适应不同屏幕尺寸

### 3. 交互体验
- 平滑滚动动画
- 页面切换过渡效果
- 实时数据模拟（如系统时间、网络延迟）

### 4. 安全元素
- CTF挑战隐藏彩蛋
- 黑客文化术语和表达

## 快速开始

### 环境要求

- Node.js >= 16.x
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发运行

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

### 本地预览

```bash
npm run preview
```

## 自定义配置

### Tailwind CSS

项目使用Tailwind CSS进行样式设计，配置文件位于[tailwind.config.js](tailwind.config.js)。

### Vite配置

Vite配置文件位于[vite.config.js](vite.config.js)，包括：
- 别名设置
- 代理配置
- 插件配置

## 路由配置

项目使用Vue Router进行路由管理，路由配置如下：

- `/` - 首页
- `/about` - 关于我们
- `/activity` - 活动中心
- `/join` - 加入我们

## 组件说明

### Header.vue
顶部导航栏组件，包含：
- 社团Logo和名称
- 导航菜单
- 网络状态指示器
- 登录按钮

### Footer.vue
底部页脚组件，包含：
- 社团信息
- 网站地图
- 资源链接
- 联系方式
- 实时终端日志

## 页面详情

### HomeView.vue - 首页
- 动态打字效果标题
- 数字矩阵背景动画
- 学习方向展示卡片
- 社团统计数据
- 最新动态资讯

### AboutView.vue - 关于我们
- 社团简介和使命
- 历史大事记时间线
- 核心团队成员介绍
- 技能水平可视化展示

### ActivityView.vue - 活动中心
- 实时系统时间显示
- 活动倒计时
- 活动筛选和搜索
- 活动列表展示
- 活动状态标识

### JoinUsView.vue - 加入我们
- 成员申请表单
- 隐藏的CTF挑战
- 控制台模拟效果
- 表单验证和提交反馈

## 开发指南

### 添加新页面

1. 在[src/view/](src/view/)目录下创建新的Vue组件
2. 在[src/router/index.js](src/router/index.js)中添加路由配置
3. 在导航组件中添加相应链接

### 自定义样式

项目使用Tailwind CSS，可以直接在组件中使用Tailwind类名，也可以在组件的`<style>`标签中编写自定义CSS。

### 图标使用

项目集成了Font Awesome图标库，可以直接使用`fas fa-*`类名添加图标。

## 部署

构建生产版本后，将`dist`目录下的文件部署到Web服务器即可。

## 许可证

本项目采用MIT许可证，详见[LICENSE](LICENSE)文件。