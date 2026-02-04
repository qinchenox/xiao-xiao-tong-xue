# 小小同学

这是一个集成了 DeepSeek AI 服务的智能聊天机器人项目，提供了现代化的聊天界面和智能回复功能。

## 功能特性

- ✅ 现代化聊天界面，模拟微信聊天样式
- ✅ 智能回复功能（由 DeepSeek AI 提供支持）
- ✅ 消息发送和接收
- ✅ 实时加载状态显示
- ✅ 多种工具集成（时间工具、GitHub 工具、网页工具）
- ✅ 后端代理服务，保护 API 密钥
- ✅ 降级机制，确保服务稳定性
- ✅ 响应式设计，支持桌面和移动设备
- ✅ 流畅的动画效果和用户交互

## 接入方案

由于微信官方API的限制，接入真实微信有以下几种方案：

### 方案1：使用itchat库（Python）

```python
# 安装依赖
pip install itchat

# 基础代码示例
import itchat

@itchat.msg_register(itchat.content.TEXT)
def reply_message(msg):
    # 处理收到的消息
    return "你好！我是微信机器人"

# 登录微信
itchat.auto_login(hotReload=True)
itchat.run()
```

### 方案2：使用wechaty库（Node.js）

```bash
# 安装依赖
npm install wechaty
npm install wechaty-puppet-wechat4u
```

```javascript
// 基础代码示例
const { Wechaty } = require('wechaty');
const { PuppetWechat4u } = require('wechaty-puppet-wechat4u');

const puppet = new PuppetWechat4u();
const bot = new Wechaty({ puppet });

bot.on('message', async (message) => {
    // 处理收到的消息
    if (message.type() === bot.Message.Type.Text) {
        await message.say('你好！我是微信机器人');
    }
});

// 启动机器人
bot.start()
    .then(() => console.log('机器人已启动'))
    .catch(console.error);
```

### 方案3：使用企业微信API

1. 注册企业微信
2. 创建应用
3. 获取AppID和Secret
4. 参考企业微信开发文档实现

## 项目结构

```
wechat-bot/
├── index.html          # 聊天界面
├── server.js           # 后端代理服务
├── package.json        # 项目配置和依赖
└── README.md           # 说明文档
```

## Dify 集成说明

本项目集成了 Dify AI 服务，通过后端代理服务调用 Dify API，实现智能回复功能。

### Dify 工作流

项目使用的 Dify 工作流地址：
http://127.0.0.1/app/8c005365-4dad-49b8-9837-966275e96213/workflow

## 使用方法

### 1. 配置 Dify API

已默认配置好 Dify API 相关信息：

```javascript
// Dify API 配置
const DIFY_API_URL = 'http://127.0.0.1/api/v1/chat/completions';
const DIFY_API_KEY = 'app-sAaaT7wywPCld9J04cmGYDgr'; // 用户提供的 API 密钥
const MODEL_NAME = 'wechat-bot-ai'; // AI 部署名称
```

如果需要修改配置，请编辑 `server.js` 文件。

### 2. 安装依赖

```bash
# 进入项目目录
cd wechat-bot

# 安装依赖
npm install
```

### 3. 启动后端服务

```bash
# 启动服务
npm start

# 或使用开发模式（自动重启）
npm run dev
```

服务启动后，会在 http://localhost:3001 运行。

### 4. 打开聊天界面

直接在浏览器中打开 `index.html` 文件，或通过后端服务访问：
http://localhost:3001

### 5. 开始聊天

在输入框中输入消息并发送，机器人会通过 Dify AI 服务生成智能回复。

## 自定义回复

修改 `index.html` 文件中的 `getReply` 方法，可以自定义机器人的回复逻辑：

```javascript
getReply(message) {
    // 自定义回复逻辑
    const replies = {
        '你好': '你好！很高兴为你服务。',
        '再见': '再见！期待下次与你聊天。',
        // 添加更多回复
    };
    
    // 检查是否有匹配的回复
    for (const [key, value] of Object.entries(replies)) {
        if (message.includes(key)) {
            return value;
        }
    }
    
    // 默认回复
    return '抱歉，我不太明白你的意思。';
}
```

## 注意事项

1. 个人微信账号使用机器人可能会被限制，请谨慎使用
2. 企业微信API是官方支持的方式，推荐使用
3. 第三方库可能会随着微信版本更新而失效

## 扩展功能

- 接入AI对话模型（如GPT、文心一言等）
- 添加图片识别功能
- 实现群管理功能
- 接入外部服务（如天气查询、新闻推送等）

## 技术栈

- HTML5
- CSS3
- JavaScript

## 许可证

MIT License
