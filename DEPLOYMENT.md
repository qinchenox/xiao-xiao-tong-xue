# 小小同学 - 部署和使用指南

## 项目简介

"小小同学"是一个基于 DeepSeek AI 的智能微信聊天机器人，支持多种工具功能，可在手机上使用完全体功能。

## 部署方案

### 方案一：云部署（推荐）

使用 Vercel 进行云部署，无需本地服务器，可随时随地访问。

#### 部署步骤：

1. **准备 GitHub 仓库**
   - 将项目代码上传到 GitHub 仓库
   - 确保仓库包含以下文件：
     - `index.html` - 主聊天界面
     - `start.html` - 启动页
     - `server.js` - 后端服务
     - `vercel.json` - Vercel 配置

2. **部署到 Vercel**
   - 访问 [Vercel](https://vercel.com/)
   - 登录或注册账号
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 点击 "Deploy"
   - 等待部署完成

3. **获取部署地址**
   - 部署完成后，Vercel 会提供一个公网访问地址
   - 例如：`https://xiao-xiao-tong-xue.vercel.app`

4. **配置 API 密钥**
   - 打开部署后的网站
   - 点击右上角的 "设置" 按钮（⚙️）
   - 在 "DeepSeek API 密钥" 中填入你的 API 密钥
   - 点击 "保存"

### 方案二：本地暴露（开发测试）

使用 ngrok 将本地服务暴露到公网，适合开发测试和临时使用。

#### 部署步骤：

1. **安装依赖**
   - 安装 Node.js：https://nodejs.org/
   - 安装 ngrok：https://ngrok.com/download

2. **启动服务**
   - 双击运行 `ngrok-start.bat`
   - 或手动执行：
     ```bash
     # 启动本地服务器
     node server.js
     
     # 启动 ngrok（新终端）
     ngrok http 3001
     ```

3. **获取公网地址**
   - 在 ngrok 窗口中找到 "Forwarding" 地址
   - 例如：`https://123456.ngrok.io`

4. **配置 API 密钥**
   - 打开公网地址
   - 点击设置按钮配置 API 密钥

### 方案三：微信小程序集成

将机器人集成到微信小程序中，实现手机端点击图标直接打开对话框。

#### 实现步骤：

1. **创建微信小程序**
   - 访问 [微信公众平台](https://mp.weixin.qq.com/)
   - 注册小程序账号
   - 创建新的小程序

2. **小程序代码结构**
   - 创建以下文件：
     - `pages/index/index.wxml` - 首页布局
     - `pages/index/index.js` - 首页逻辑
     - `pages/chat/chat.wxml` - 聊天界面
     - `pages/chat/chat.js` - 聊天逻辑

3. **首页代码示例** (`pages/index/index.wxml`)
   ```xml
   <view class="container">
     <view class="bot-card" bindtap="navigateToChat">
       <view class="bot-avatar">🤖</view>
       <view class="bot-info">
         <text class="bot-name">小小同学</text>
         <text class="bot-desc">智能聊天机器人</text>
       </view>
       <view class="bot-arrow">→</view>
     </view>
   </view>
   ```

4. **首页逻辑** (`pages/index/index.js`)
   ```javascript
   Page({
     navigateToChat() {
       wx.navigateTo({
         url: '/pages/chat/chat'
       })
     }
   })
   ```

5. **聊天界面** (`pages/chat/chat.wxml`)
   - 参考 `index.html` 实现微信小程序版聊天界面
   - 使用 `web-view` 组件嵌入部署后的网站：
   ```xml
   <web-view src="https://你的部署地址/index.html"></web-view>
   ```

6. **配置小程序**
   - 在 "开发设置" 中添加你的部署域名到 "业务域名"
   - 下载并安装域名验证文件
   - 提交小程序审核

## 功能说明

### 核心功能

- **智能聊天**：基于 DeepSeek AI 的自然语言对话
- **工具集成**：时间工具、GitHub 工具、网页工具
- **响应式设计**：适配桌面和手机设备
- **离线降级**：网络不稳定时自动切换到本地模式

### 工具功能

| 工具类别 | 工具名称 | 功能描述 |
|---------|---------|--------|
| 时间工具 | 获取当前时间 | 显示当前系统时间 |
| 时间工具 | 时区转换 | 转换本地时间和 UTC 时间 |
| 时间工具 | 星期几计算 | 计算指定日期是星期几 |
| 时间工具 | 时间戳转换 | 在时间和时间戳之间转换 |
| GitHub 工具 | 仓库搜索 | 搜索 GitHub 仓库（开发中） |
| GitHub 工具 | Issues 管理 | 管理 GitHub Issues（开发中） |
| 网页工具 | 网页爬虫 | 爬取网页内容（开发中） |

## 手机访问指南

### 方法一：直接访问部署地址

1. **云部署**
   - 在手机浏览器中打开 Vercel 部署地址
   - 添加到手机桌面，创建快捷方式

2. **本地暴露**
   - 在手机浏览器中打开 ngrok 提供的公网地址
   - 添加到手机桌面，创建快捷方式

### 方法二：微信小程序

1. **打开小程序**
   - 在微信中搜索并打开你的小程序
   - 点击首页的机器人卡片

2. **使用完全体功能**
   - 小程序会打开内嵌的聊天界面
   - 支持所有核心功能和工具

### 方法三：微信公众号

1. **创建公众号**
   - 注册微信公众号
   - 配置服务器地址为你的部署地址

2. **实现消息转发**
   - 在公众号后台配置消息转发到机器人
   - 用户可通过公众号直接与机器人对话

## 常见问题

### 1. API 密钥配置

**问题**：如何获取和配置 DeepSeek API 密钥？

**解决方案**：
- 访问 [DeepSeek](https://www.deepseek.com/)
- 注册账号并获取 API 密钥
- 在机器人设置界面中填入密钥
- 点击保存后即可使用 AI 功能

### 2. 部署失败

**问题**：Vercel 部署失败怎么办？

**解决方案**：
- 检查 `vercel.json` 配置是否正确
- 确保 `server.js` 使用的是 Node.js 内置模块
- 检查项目文件是否完整

### 3. 手机访问速度慢

**问题**：手机访问时速度较慢？

**解决方案**：
- 确保网络连接稳定
- 优先使用云部署方案
- 清理浏览器缓存

### 4. 微信小程序审核

**问题**：微信小程序审核不通过？

**解决方案**：
- 确保内容符合微信小程序规范
- 提供详细的功能说明
- 避免使用敏感内容

## 技术支持

如果遇到问题，请参考以下资源：

- **项目文档**：本指南和 README.md
- **GitHub Issues**：在仓库中提交问题
- **DeepSeek 文档**：https://docs.deepseek.com/
- **Vercel 文档**：https://vercel.com/docs

## 版本更新

### v1.0.0
- 初始版本
- 支持智能聊天功能
- 集成时间工具
- 支持云部署和本地部署
- 响应式设计，支持手机访问

### v1.1.0
- 添加 GitHub 工具
- 添加网页工具
- 优化手机端体验
- 支持微信小程序集成

## 结语

"小小同学" 旨在为用户提供一个智能、便捷的聊天机器人助手，通过多种部署方案，确保用户可以在手机上使用完全体功能。无论是通过云部署、本地暴露还是微信小程序，都能获得一致的使用体验。

祝使用愉快！ 🤖