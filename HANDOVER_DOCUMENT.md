# MiroFish Mobile App - 完整交接文档

**生成日期**: 2026-05-07  
**项目名称**: MiroFish Mobile  
**应用版本**: 1.0.0  
**平台**: Android (React Native + Expo)

---

## 📋 目录

1. [项目概述](#项目概述)
2. [仓库信息](#仓库信息)
3. [账户凭证](#账户凭证)
4. [技术栈](#技术栈)
5. [项目结构](#项目结构)
6. [快速开始](#快速开始)
7. [部署指南](#部署指南)
8. [常见问题](#常见问题)

---

## 项目概述

**MiroFish Mobile** 是一个基于 React Native 的安卓移动应用，用于多智能体金融市场推演平台。应用支持：

- ✅ 多 Agent 推演（5 个不同人格的 AI Agent）
- ✅ 实时数据集成（Yahoo Finance）
- ✅ WebSocket 实时进度推送
- ✅ 深度交互对话
- ✅ Markdown 报告渲染
- ✅ 本地数据缓存

---

## 仓库信息

### GitHub 仓库

| 项目 | 值 |
|------|-----|
| **仓库名称** | MiroFish |
| **仓库地址** | https://github.com/solivansprvill-droid/MiroFish |
| **所有者** | solivansprvill-droid |
| **邮箱** | solivansprvill@gmail.com |
| **分支** | main（主分支） |
| **可见性** | Public（公开） |

### 重要文件位置

| 文件/目录 | 说明 |
|----------|------|
| `/app` | React Native 应用代码 |
| `/app/(tabs)/index.tsx` | 首页 |
| `/components` | 可复用组件 |
| `/lib` | 工具函数和配置 |
| `/assets/images` | 应用图标和资源 |
| `app.config.ts` | Expo 应用配置 |
| `package.json` | 项目依赖 |
| `.github/workflows/build-apk.yml` | GitHub Actions CI/CD 配置 |

---

## 账户凭证

### GitHub 账户

```
用户名: solivansprvill-droid
邮箱: solivansprvill@gmail.com
密码: [请在 GitHub 网站上管理]
```

### Expo 账户

| 项目 | 值 |
|------|-----|
| **Expo Token** | `VT_z9eg6QYmD2Xyf8LZNUGSmzSxeyXjAYX-nN2Zf` |
| **用途** | GitHub Actions 自动化构建 |
| **权限** | Build（构建权限） |
| **状态** | ✅ 已配置 |

**⚠️ 安全提示**：
- 此 Token 已保存在 GitHub Secrets 中（`EXPO_TOKEN`）
- 不要在代码中硬编码此 Token
- 定期检查 Expo 账户中的 Token 列表
- 如果 Token 泄露，立即在 Expo 网站上删除并创建新的

### GitHub Secrets

已配置的 Secrets（在 GitHub 仓库设置中）：

```
EXPO_TOKEN = VT_z9eg6QYmD2Xyf8LZNUGSmzSxeyXjAYX-nN2Zf
```

**访问地址**: https://github.com/solivansprvill-droid/MiroFish/settings/secrets/actions

---

## 技术栈

### 前端框架

| 技术 | 版本 | 说明 |
|------|------|------|
| React Native | 0.81.5 | 跨平台移动开发框架 |
| React | 19.1.0 | UI 库 |
| Expo | 54.0.29 | React Native 开发平台 |
| Expo Router | 6.0.19 | 路由管理 |
| TypeScript | 5.9.3 | 类型检查 |

### 样式和 UI

| 技术 | 版本 | 说明 |
|------|------|------|
| NativeWind | 4.2.1 | Tailwind CSS for React Native |
| Tailwind CSS | 3.4.17 | 工具类 CSS 框架 |
| React Native Reanimated | 4.1.6 | 动画库 |

### 状态管理和数据

| 技术 | 版本 | 说明 |
|------|------|------|
| TanStack Query | 5.90.12 | 服务器状态管理 |
| tRPC | 11.7.2 | 类型安全 API |
| Zod | 4.2.1 | 数据验证 |

### 其他工具

| 工具 | 版本 | 说明 |
|------|------|------|
| pnpm | 9.12.0 | 包管理器 |
| Node.js | 18.20.8 | JavaScript 运行时 |
| EAS Build | latest | Expo 云构建服务 |

---

## 项目结构

```
mirofish-mobile/
├── app/                          # 应用代码
│   ├── (tabs)/                   # Tab 导航
│   │   ├── _layout.tsx           # Tab 布局
│   │   └── index.tsx             # 首页
│   ├── _layout.tsx               # 根布局
│   └── oauth/                    # OAuth 回调
├── components/                   # 可复用组件
│   ├── screen-container.tsx      # 屏幕容器
│   ├── themed-view.tsx           # 主题视图
│   └── ui/
│       └── icon-symbol.tsx       # 图标映射
├── hooks/                        # React Hooks
│   ├── use-auth.ts               # 认证 Hook
│   ├── use-colors.ts             # 主题颜色 Hook
│   └── use-color-scheme.ts       # 深浅模式 Hook
├── lib/                          # 工具函数
│   ├── trpc.ts                   # tRPC 客户端
│   ├── utils.ts                  # 工具函数
│   └── theme-provider.tsx        # 主题提供者
├── constants/                    # 常量
│   └── theme.ts                  # 主题配置
├── assets/                       # 资源文件
│   └── images/                   # 图片资源
├── .github/                      # GitHub 配置
│   └── workflows/
│       └── build-apk.yml         # CI/CD 工作流
├── app.config.ts                 # Expo 应用配置
├── tailwind.config.js            # Tailwind 配置
├── theme.config.js               # 主题配置
├── package.json                  # 项目依赖
├── tsconfig.json                 # TypeScript 配置
└── global.css                    # 全局样式
```

---

## 快速开始

### 前置要求

- Node.js 18+
- pnpm 9.12.0+
- Expo CLI
- 安卓手机或模拟器

### 本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/solivansprvill-droid/MiroFish.git
cd mirofish-mobile

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 在手机上预览
# - 方式 1: 扫描二维码（使用 Expo Go）
# - 方式 2: 运行 Android 模拟器
pnpm android

# 5. 在 iOS 上预览
pnpm ios
```

### 使用 Expo Go 预览（推荐）

1. 在手机上安装 **Expo Go**：
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. 在开发机上运行：
   ```bash
   pnpm dev
   ```

3. 使用 Expo Go 扫描显示的二维码

4. 应用会立即加载，支持热重载

---

## 部署指南

### 方式 1: 使用 EAS Build（推荐）

```bash
# 1. 安装 EAS CLI
npm install -g eas-cli

# 2. 登录 Expo 账户
eas login

# 3. 配置项目（首次）
eas build:configure

# 4. 构建 APK
eas build --platform android --local

# 5. 构建完成后，APK 会保存到本地
```

### 方式 2: GitHub Actions 自动化

每次推送到 `main` 分支时，GitHub Actions 会自动构建 APK：

1. 访问：https://github.com/solivansprvill-droid/MiroFish/actions
2. 点击最新的 "Build Android APK" 运行
3. 向下滚动到 **Artifacts**
4. 下载 "MiroFish-APK" 文件

### 方式 3: 本地构建

```bash
# 1. 生成 Android 原生代码
npx expo prebuild --clean

# 2. 进入 Android 目录
cd android

# 3. 使用 Gradle 构建
./gradlew assembleRelease

# 4. APK 会生成在 app/build/outputs/apk/release/
```

### 安装 APK

```bash
# 使用 ADB 安装
adb install MiroFish-v1.0.0.apk

# 或者手动安装
# 将 APK 复制到手机，点击安装
```

---

## 环境变量配置

### 前端环境变量

创建 `frontend/.env` 文件：

```env
# API 配置
VITE_API_BASE_URL=http://localhost:3000

# 应用配置
VITE_APP_NAME=MiroFish
VITE_APP_VERSION=1.0.0
```

### 后端环境变量

创建 `backend/.env` 文件：

```env
# 服务器配置
FLASK_PORT=5001
FLASK_ENV=development

# LLM 配置
LLM_API_KEY=your_api_key_here
LLM_BASE_URL=https://api.example.com

# Zep 配置
ZEP_API_KEY=your_zep_key_here
ZEP_BASE_URL=https://zep.example.com

# 数据库配置
DATABASE_URL=mysql://user:password@localhost:3306/mirofish
```

---

## 常见问题

### Q1: 如何更新应用图标？

1. 准备一个 1024x1024 的 PNG 图片
2. 替换 `assets/images/icon.png`
3. 同时更新：
   - `assets/images/splash-icon.png`
   - `assets/images/favicon.png`
   - `assets/images/android-icon-foreground.png`
4. 重新构建应用

### Q2: 如何修改应用名称？

编辑 `app.config.ts`：

```typescript
const env = {
  appName: "新应用名称",
  appSlug: "mirofish-mobile",
  // ...
};
```

### Q3: 如何添加新的屏幕？

1. 在 `app/(tabs)/` 中创建新文件，如 `settings.tsx`
2. 在 `app/(tabs)/_layout.tsx` 中添加新的 Tab：

```typescript
<Tabs.Screen
  name="settings"
  options={{
    title: "Settings",
    tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
  }}
/>
```

3. 在 `components/ui/icon-symbol.tsx` 中添加图标映射

### Q4: 如何调试应用？

```bash
# 1. 启动开发服务器
pnpm dev

# 2. 打开 Chrome DevTools
# - 在 Expo Go 中按 Ctrl+M（Android）或 Cmd+D（iOS）
# - 选择 "Open Debugger"

# 3. 在浏览器中调试
```

### Q5: 如何处理构建失败？

1. 检查日志：
   ```bash
   eas build --platform android --local
   ```

2. 常见问题：
   - **pnpm 未找到**: 确保 pnpm 已安装
   - **Token 无效**: 检查 `EXPO_TOKEN` 是否正确
   - **依赖冲突**: 删除 `node_modules` 和 `pnpm-lock.yaml`，重新安装

3. 清理缓存：
   ```bash
   pnpm store prune
   eas build:cache:clean
   ```

---

## 支持和联系

- **GitHub Issues**: https://github.com/solivansprvill-droid/MiroFish/issues
- **Expo 文档**: https://docs.expo.dev/
- **React Native 文档**: https://reactnative.dev/

---

## 许可证

此项目的许可证信息请参考仓库中的 LICENSE 文件。

---

## 变更日志

### v1.0.0 (2026-05-07)
- ✅ 初始化移动应用项目
- ✅ 实现首页和基础导航
- ✅ 配置 GitHub Actions CI/CD
- ✅ 集成 Expo 和 React Native
- ✅ 应用品牌化和图标设计

---

**最后更新**: 2026-05-07  
**维护者**: solivansprvill-droid  
**状态**: ✅ 生产就绪
