# MiroFish 移动应用 - GitHub Actions 自动构建 APK 完整指南

## 📱 项目概述

MiroFish 是一个多智能体金融市场推演平台的移动应用。通过 GitHub Actions，我们可以实现自动化构建和部署流程。

---

## 🎯 目标

设置 GitHub Actions 工作流，使得：
- 每次推送代码到 GitHub 时自动构建 APK
- APK 自动上传到 GitHub Artifacts
- 支持手动触发构建
- 标签推送时自动创建 Release

---

## 📋 前置条件

- ✅ GitHub 账户和仓库：https://github.com/solivansprvill-droid/MiroFish
- ✅ Expo 账户：https://expo.dev
- ✅ Expo Token：`VT_z9eg6QYmD2Xyf8LZNUGSmzSxeyXjAYX-nN2Zf`

---

## 🚀 完整设置流程

### 第一步：打开 GitHub 仓库设置

**操作步骤：**

1. 打开浏览器，访问您的 GitHub 仓库：
   ```
   https://github.com/solivansprvill-droid/MiroFish
   ```

2. 点击仓库页面顶部的 **Settings** 标签（齿轮图标）

3. 在左侧菜单中找到 **Secrets and variables** 选项

4. 点击 **Secrets and variables** 下的 **Actions**

**预期结果：**
- 您应该看到一个空的 Secrets 列表
- 有一个绿色的 **"New repository secret"** 按钮

---

### 第二步：添加 Expo Token Secret

**操作步骤：**

1. 点击 **"New repository secret"** 按钮

2. 在 **Name** 字段中输入：
   ```
   EXPO_TOKEN
   ```

3. 在 **Secret** 字段中粘贴您的 Expo Token：
   ```
   VT_z9eg6QYmD2Xyf8LZNUGSmzSxeyXjAYX-nN2Zf
   ```

4. 点击 **"Add secret"** 按钮

**预期结果：**
- 页面返回到 Secrets 列表
- 您应该看到 `EXPO_TOKEN` 条目（显示为 ●●●●●●）
- Secret 已成功添加

---

### 第三步：验证 GitHub Actions 工作流

**操作步骤：**

1. 返回仓库主页

2. 点击仓库页面顶部的 **Actions** 标签

3. 在左侧菜单中应该看到 **"Build Android APK"** 工作流

4. 如果看不到，可能需要等待几秒钟或刷新页面

**预期结果：**
- 工作流列表中显示 "Build Android APK"
- 工作流状态显示为 "No runs yet"

---

### 第四步：触发第一次构建

**操作步骤：**

1. 进入 **Actions** 标签

2. 在左侧菜单中点击 **"Build Android APK"**

3. 点击右侧的 **"Run workflow"** 按钮

4. 在弹出菜单中选择分支（默认 `main`）

5. 点击 **"Run workflow"** 确认

**预期结果：**
- 工作流开始运行
- 您可以看到一个新的运行记录
- 状态显示为 "In progress"（黄色）

---

### 第五步：监控构建进度

**操作步骤：**

1. 点击正在运行的工作流

2. 您可以看到详细的构建步骤：
   - 📥 Checkout repository（检出代码）
   - 🔧 Setup Node.js（设置 Node.js）
   - 📦 Setup pnpm（设置包管理器）
   - 🔐 Setup Expo（设置 Expo）
   - 📚 Install dependencies（安装依赖）
   - 🏗️ Build APK（构建 APK）
   - 📤 Upload APK artifact（上传工件）

3. 每个步骤完成后会显示绿色的 ✅ 标记

**预期结果：**
- 所有步骤都显示 ✅
- 最后显示 "Build completed successfully!"
- 构建时间通常为 5-10 分钟

---

### 第六步：下载构建的 APK

**操作步骤：**

1. 构建完成后，在工作流页面向下滚动

2. 找到 **Artifacts** 部分

3. 点击 **"MiroFish-APK"** 下载

4. 下载的文件是一个 ZIP 包，包含 APK 文件

**预期结果：**
- APK 文件已下载到您的计算机
- 文件名类似于 `app-debug.apk`

---

## 📲 安装 APK 到手机

### 方式一：使用 ADB（推荐用于开发者）

**前置条件：**
- 安装 Android SDK Platform Tools
- 手机已连接到计算机

**操作步骤：**

```bash
# 1. 进入 APK 所在目录
cd ~/Downloads

# 2. 使用 adb 安装
adb install app-debug.apk

# 3. 等待安装完成
```

### 方式二：手动安装（推荐用于普通用户）

**操作步骤：**

1. 将 APK 文件复制到手机存储
2. 在手机上打开文件管理器
3. 找到 APK 文件
4. 点击 APK 文件
5. 系统会提示安装权限，点击 **"安装"**
6. 等待安装完成
7. 安装完成后，在应用抽屉中找到 **MiroFish** 应用

---

## 🔄 自动化工作流

### 工作流触发条件

工作流会在以下情况自动运行：

1. **推送到主分支**
   ```bash
   git push origin main
   ```
   工作流会自动开始构建

2. **提交 Pull Request**
   - 向 `main` 或 `develop` 分支提交 PR
   - 工作流会自动运行

3. **手动触发**
   - 在 GitHub Actions 页面点击 **"Run workflow"**

4. **创建标签**（自动创建 Release）
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
   - 工作流会构建 APK
   - 自动创建 Release
   - APK 会附加到 Release

---

## 📊 工作流配置详解

### 工作流文件位置

```
.github/workflows/build-apk.yml
```

### 主要配置

| 配置项 | 说明 |
|--------|------|
| `on.push.branches` | 监听 main 和 develop 分支的推送 |
| `on.pull_request.branches` | 监听 PR 事件 |
| `on.workflow_dispatch` | 支持手动触发 |
| `timeout-minutes` | 构建超时时间（60 分钟） |
| `EXPO_TOKEN` | Expo 访问令牌（从 Secrets 读取） |

### 构建步骤

1. **检出代码** - 从 GitHub 获取最新代码
2. **设置 Node.js** - 安装 Node.js 18
3. **设置 pnpm** - 安装包管理器
4. **设置 Expo** - 安装 Expo CLI 和 EAS CLI
5. **安装依赖** - 运行 `pnpm install`
6. **构建 APK** - 使用 EAS Build 构建
7. **上传工件** - 保存 APK（30 天）
8. **创建 Release** - 标签推送时创建

---

## 🐛 常见问题解决

### Q1: 工作流显示红色 ❌，构建失败

**可能原因：**
- Expo Token 无效或过期
- 依赖安装失败
- 代码有错误

**解决方案：**
1. 检查 GitHub Secrets 中的 `EXPO_TOKEN` 是否正确
2. 查看工作流日志找出具体错误
3. 在本地运行 `pnpm install` 测试依赖
4. 检查代码是否有语法错误

### Q2: 构建超时

**可能原因：**
- 网络连接慢
- 依赖下载缓慢
- EAS Build 服务繁忙

**解决方案：**
1. 重新运行工作流
2. 增加 `timeout-minutes` 值
3. 检查网络连接

### Q3: 找不到 Artifacts

**可能原因：**
- 工作流还未完成
- Artifacts 已过期（30 天）
- 工作流失败

**解决方案：**
1. 等待工作流完成
2. 重新运行工作流生成新的 Artifacts
3. 检查工作流是否成功

### Q4: APK 文件过大

**可能原因：**
- 包含了调试信息
- 依赖过多

**解决方案：**
1. 使用 Release 构建而不是 Debug
2. 启用 ProGuard 混淆
3. 移除未使用的依赖

---

## 🔐 安全最佳实践

### Token 管理

- ✅ Token 存储在 GitHub Secrets 中，不会在日志中显示
- ✅ 定期检查 Expo 账户中的 Token 列表
- ✅ 如果 Token 泄露，立即删除并创建新的

### 代码安全

- ✅ 启用分支保护，要求 PR 审查
- ✅ 定期更新依赖
- ✅ 扫描依赖漏洞

### 构建安全

- ✅ 验证构建输出
- ✅ 签名 APK（生产环境）
- ✅ 限制 Artifacts 保留时间

---

## 📈 监控和维护

### 定期检查

- 每周检查一次工作流运行历史
- 监控构建时间和成功率
- 检查 Artifacts 大小

### 性能优化

- 缓存依赖加快构建速度
- 使用并行构建（如果需要）
- 定期清理旧的 Artifacts

### 日志管理

- 保存重要的构建日志
- 记录失败的构建原因
- 建立故障排查文档

---

## 📞 获取帮助

- **GitHub Actions 文档**：https://docs.github.com/en/actions
- **Expo EAS Build 文档**：https://docs.expo.dev/build/
- **MiroFish GitHub 仓库**：https://github.com/solivansprvill-droid/MiroFish
- **Expo 官方文档**：https://docs.expo.dev/

---

## ✅ 完成检查清单

- [ ] 访问 GitHub 仓库设置
- [ ] 添加 `EXPO_TOKEN` Secret
- [ ] 验证工作流在 Actions 中显示
- [ ] 手动触发第一次构建
- [ ] 构建成功完成
- [ ] 下载 APK 文件
- [ ] 在手机上安装 APK
- [ ] 测试应用功能

---

## 🎉 下一步

1. ✅ 完成上述所有步骤
2. ✅ 每次推送代码时工作流会自动运行
3. ✅ 从 Artifacts 下载最新的 APK
4. ✅ 在手机上测试应用
5. ✅ 根据需要调整工作流配置

---

**最后更新**：2026-05-07  
**应用版本**：1.0.0  
**工作流状态**：✅ 已配置并就绪
