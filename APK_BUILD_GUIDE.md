# MiroFish Mobile - 独立 APK 构建指南

## 📱 快速构建步骤

### 方式 1: 使用 EAS Build（推荐 - 最简单）

EAS Build 是 Expo 官方的云构建服务，无需本地配置 Android 环境。

```bash
# 1. 全局安装 EAS CLI
npm install -g eas-cli

# 2. 登录 Expo 账户（首次需要）
eas login

# 3. 进入项目目录
cd /home/ubuntu/mirofish-mobile

# 4. 配置项目（首次需要）
eas build:configure

# 5. 构建 APK
eas build --platform android --local
```

**优点**: 
- 无需本地配置 Android SDK
- 自动处理签名和优化
- 构建日志详细
- 支持多个构建配置

**构建时间**: 5-10 分钟

---

### 方式 2: 本地构建（需要 Android SDK）

如果您已经安装了 Android SDK 和 NDK，可以进行本地构建。

```bash
# 1. 生成原生代码
cd /home/ubuntu/mirofish-mobile
pnpm exec expo prebuild --platform android --clean

# 2. 构建 Debug APK
cd android
./gradlew assembleDebug

# 3. 构建 Release APK（需要签名密钥）
./gradlew assembleRelease
```

**前置要求**:
- Java 11+
- Android SDK (API 24+)
- Android NDK
- Gradle

**构建时间**: 15-30 分钟

**APK 位置**:
- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release.apk`

---

### 方式 3: GitHub Actions（CI/CD - 自动化）

在 GitHub 仓库中设置自动构建流程。

创建 `.github/workflows/build-apk.yml`:

```yaml
name: Build APK

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g eas-cli
      - run: eas build --platform android --local
```

---

## 📦 APK 文件信息

| 属性 | 值 |
|------|-----|
| 应用名称 | MiroFish |
| 版本 | 1.0.0 |
| 包名 | space.manus.mirofish.mobile |
| 最小 Android 版本 | 7.0 (API 24) |
| 目标 Android 版本 | 14 (API 34) |
| 支持架构 | armeabi-v7a, arm64-v8a |
| 预期大小 | 50-100 MB |

---

## 📲 安装 APK

### 方式 1: ADB（推荐用于开发者）

```bash
adb install MiroFish-v1.0.0.apk
```

### 方式 2: 手动安装

1. 将 APK 文件复制到手机存储
2. 打开文件管理器，找到 APK 文件
3. 点击 APK 文件进行安装
4. 允许安装来自未知来源（如需要）
5. 安装完成后，在应用抽屉中找到 **MiroFish** 应用

### 方式 3: Google Play Store

将 APK 上传到 Google Play Console 进行正式发布。

---

## 🔑 签名配置

### Debug 签名（开发用）
自动生成，无需配置。

### Release 签名（生产用）

创建签名密钥：
```bash
keytool -genkey -v -keystore mirofish-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias mirofish-key
```

配置 `android/app/build.gradle`:
```gradle
signingConfigs {
    release {
        storeFile file('mirofish-release-key.jks')
        storePassword System.getenv("KEYSTORE_PASSWORD")
        keyAlias System.getenv("KEY_ALIAS")
        keyPassword System.getenv("KEY_PASSWORD")
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

---

## 🧪 测试 APK

### 基本测试
- [ ] 应用能否启动
- [ ] 首页显示正确
- [ ] 导航栏工作正常
- [ ] 按钮响应正常

### 功能测试
- [ ] 推演创建功能
- [ ] API 连接
- [ ] WebSocket 推送
- [ ] 报告渲染

### 性能测试
- [ ] 内存使用
- [ ] 电池消耗
- [ ] 网络连接
- [ ] 列表滚动流畅度

---

## 🐛 常见问题

### Q: 构建失败，显示 "SDK not found"
**A**: 安装 Android SDK，或使用 EAS Build 云服务

### Q: APK 文件过大
**A**: 
1. 启用 ProGuard 混淆
2. 移除未使用的依赖
3. 使用 App Bundle 格式

### Q: 应用安装后无法运行
**A**:
1. 检查 Android 版本
2. 清除应用缓存
3. 查看应用日志

### Q: 无法连接到后端
**A**:
1. 检查网络连接
2. 验证 API 端点
3. 检查防火墙

---

## 📊 构建配置

### app.config.ts
```typescript
// 应用基本信息
name: "MiroFish",
slug: "mirofish-mobile",
version: "1.0.0",

// Android 配置
android: {
  package: "space.manus.mirofish.mobile",
  versionCode: 1,
  adaptiveIcon: {
    backgroundColor: "#0a7ea4",
    foregroundImage: "./assets/images/android-icon-foreground.png",
  },
}
```

---

## 📞 获取帮助

- **Expo 文档**: https://docs.expo.dev/
- **EAS Build 文档**: https://docs.expo.dev/build/
- **GitHub 仓库**: https://github.com/solivansprvill-droid/MiroFish
- **问题反馈**: 提交 GitHub Issue

---

**最后更新**: 2026-05-07  
**应用版本**: 1.0.0  
**构建环境**: Expo SDK 54, React Native 0.81
