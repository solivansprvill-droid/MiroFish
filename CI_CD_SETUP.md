# MiroFish Mobile - GitHub Actions CI/CD 设置指南

## 📋 概述

GitHub Actions 是 GitHub 提供的免费 CI/CD 服务，可以在每次推送代码时自动构建 APK。

---

## 🚀 快速设置

### 步骤 1: 生成 Expo Token

1. 访问 [Expo 账户设置](https://expo.dev/settings/tokens)
2. 点击 "Create Token"
3. 选择 "Build" 权限
4. 复制生成的 Token

### 步骤 2: 添加 GitHub Secret

1. 进入 GitHub 仓库
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 名称: `EXPO_TOKEN`
5. 值: 粘贴您的 Expo Token
6. 点击 **Add secret**

### 步骤 3: 推送工作流文件

工作流文件已经创建在 `.github/workflows/build-apk.yml`

```bash
# 提交并推送到 GitHub
git add .github/workflows/build-apk.yml
git commit -m "ci: add GitHub Actions APK build workflow"
git push origin main
```

### 步骤 4: 验证工作流

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签
3. 您应该看到 "Build Android APK" 工作流
4. 点击最新的运行查看构建日志

---

## 📊 工作流配置

### 触发条件

工作流在以下情况下自动运行：

- ✅ 推送到 `main` 或 `develop` 分支
- ✅ 提交 Pull Request 到 `main` 或 `develop` 分支
- ✅ 手动触发（通过 Actions 页面）

### 工作流步骤

1. **检出代码** - 从 GitHub 获取最新代码
2. **设置 Node.js** - 安装 Node.js 18
3. **设置 pnpm** - 安装 pnpm 包管理器
4. **设置 Expo** - 安装 Expo CLI 和 EAS CLI
5. **安装依赖** - 运行 `pnpm install`
6. **构建 APK** - 使用 EAS Build 构建 APK
7. **上传工件** - 将 APK 保存为工件（30 天保留）
8. **创建发布** - 如果是标签推送，自动创建 Release

---

## 🔐 安全最佳实践

### 1. Token 安全
- ✅ 使用 GitHub Secrets 存储敏感信息
- ✅ 定期轮换 Token
- ✅ 限制 Token 权限

### 2. 代码安全
- ✅ 启用分支保护
- ✅ 要求 Pull Request 审查
- ✅ 运行代码检查

### 3. 构建安全
- ✅ 验证构建输出
- ✅ 扫描依赖漏洞
- ✅ 签名 APK

---

## 📦 获取构建的 APK

### 方式 1: 从 Artifacts 下载

1. 进入 GitHub 仓库
2. 点击 **Actions**
3. 选择最新的 "Build Android APK" 运行
4. 向下滚动到 **Artifacts**
5. 点击 "MiroFish-APK" 下载

### 方式 2: 从 Release 下载

对于标签推送，APK 会自动附加到 Release：

```bash
# 创建标签并推送
git tag v1.0.0
git push origin v1.0.0
```

然后访问 GitHub Releases 页面下载 APK。

### 方式 3: 从 EAS Build 下载

EAS Build 会在其服务器上保存构建，您可以访问 EAS 仪表板查看。

---

## 🔧 自定义工作流

### 修改触发条件

编辑 `.github/workflows/build-apk.yml`:

```yaml
on:
  push:
    branches: [main, develop]
    paths:
      - 'app/**'
      - 'package.json'
      - '.github/workflows/build-apk.yml'
```

### 添加测试步骤

```yaml
- name: 🧪 Run tests
  run: pnpm test

- name: 📝 Run linter
  run: pnpm lint
```

### 添加通知

```yaml
- name: 📢 Notify Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 🐛 常见问题

### Q: 构建失败，显示 "EXPO_TOKEN not found"
**A**: 
1. 检查 GitHub Secrets 中是否添加了 `EXPO_TOKEN`
2. 确认 Token 值正确
3. 重新运行工作流

### Q: 构建超时
**A**:
1. 增加 `timeout-minutes` 值
2. 检查网络连接
3. 查看 EAS Build 日志

### Q: APK 文件过大
**A**:
1. 启用 ProGuard 混淆
2. 移除未使用的依赖
3. 使用 App Bundle 格式

### Q: 无法下载 APK
**A**:
1. 检查 Artifacts 保留期
2. 确认工作流成功完成
3. 检查 GitHub 权限

---

## 📊 工作流监控

### 查看构建历史

1. 进入 GitHub 仓库
2. 点击 **Actions**
3. 查看所有工作流运行

### 查看构建日志

1. 点击特定的工作流运行
2. 点击 "Build" 任务
3. 展开各个步骤查看详细日志

### 设置通知

1. 进入 GitHub 仓库
2. 点击 **Settings** → **Notifications**
3. 配置工作流失败时的通知

---

## 🚀 高级配置

### 多平台构建

```yaml
strategy:
  matrix:
    platform: [android, ios]
    
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: eas build --platform ${{ matrix.platform }}
```

### 条件构建

```yaml
jobs:
  build:
    if: github.event_name == 'push' || github.event.pull_request.draft == false
    runs-on: ubuntu-latest
```

### 并行构建

```yaml
jobs:
  build-debug:
    runs-on: ubuntu-latest
    steps:
      - run: eas build --platform android --profile debug
      
  build-release:
    runs-on: ubuntu-latest
    steps:
      - run: eas build --platform android --profile release
```

---

## 📞 获取帮助

- **GitHub Actions 文档**: https://docs.github.com/en/actions
- **Expo EAS Build 文档**: https://docs.expo.dev/build/
- **GitHub 仓库**: https://github.com/solivansprvill-droid/MiroFish

---

## ✅ 检查清单

- [ ] 生成 Expo Token
- [ ] 添加 `EXPO_TOKEN` 到 GitHub Secrets
- [ ] 推送 `.github/workflows/build-apk.yml` 文件
- [ ] 验证工作流在 GitHub Actions 中显示
- [ ] 触发第一次构建
- [ ] 验证 APK 生成成功
- [ ] 下载并测试 APK

---

**最后更新**: 2026-05-07  
**应用版本**: 1.0.0
