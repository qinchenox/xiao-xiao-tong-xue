// 使用 Node.js 内置模块实现简单的后端服务
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

// Dify API 配置
const DIFY_API_URL = 'http://127.0.0.1/api/v1/chat/completions';
const DIFY_API_KEY = 'app-sAaaT7wywPCld9J04cmGYDgr'; // 用户提供的 API 密钥
const MODEL_NAME = 'wechat-bot-ai'; // AI 部署名称

// 工具实现模块
const tools = {
    // 时间工具
    async getCurrentTime(params) {
        const now = new Date();
        const format = params.format || 'full';
        
        if (format === 'timestamp') {
            return now.getTime();
        }
        
        return now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    },
    
    async getTimezoneConversion(params) {
        const now = new Date();
        const localTime = now.toLocaleString('zh-CN');
        const utcTime = now.toUTCString();
        
        return `本地时间: ${localTime}\nUTC时间: ${utcTime}`;
    },
    
    async getWeekday(params) {
        const date = params.date ? new Date(params.date) : new Date();
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const weekday = weekdays[date.getDay()];
        const formattedDate = date.toLocaleDateString('zh-CN');
        
        return `${formattedDate} ${weekday}`;
    },
    
    async getTimestampConversion(params) {
        const timestamp = params.timestamp || Date.now();
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleString('zh-CN');
        
        return `当前时间: ${formattedDate}\n时间戳: ${timestamp}`;
    },
    
    // GitHub 工具（模拟）
    async getGitHubRepos(params) {
        const query = params.query || 'dify';
        return `GitHub 仓库搜索: ${query}\n功能开发中...`;
    },
    
    async getGitHubIssues(params) {
        const owner = params.owner || 'langgenius';
        const repo = params.repo || 'dify';
        return `GitHub Issues: ${owner}/${repo}\n功能开发中...`;
    },
    
    // 网页爬虫工具（模拟）
    async getWebScraper(params) {
        const url = params.url || 'https://dify.ai';
        return `网页内容: ${url}\n功能开发中...`;
    }
};

// 解析请求体
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', reject);
    });
}

// 发送 JSON 响应
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

// 发送静态文件
function sendStaticFile(res, filePath) {
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, '404.html'), (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                return;
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

// 创建 HTTP 服务器
const server = http.createServer(async (req, res) => {
    // 处理 OPTIONS 请求（CORS 预检）
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // 解析 URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    // 健康检查端点
    if (pathname === '/api/health') {
        sendJSON(res, 200, { status: 'ok', message: '服务运行正常' });
        return;
    }

    // 工具调用端点
    if (pathname === '/api/tools/call' && req.method === 'POST') {
        try {
            const body = await parseBody(req);
            const { tool_name, params = {} } = body;
            
            if (!tool_name) {
                sendJSON(res, 400, { success: false, error: '工具名称不能为空' });
                return;
            }
            
            let result;
            
            // 根据工具名称调用不同的工具
            switch (tool_name) {
                case 'current_time':
                    result = await tools.getCurrentTime(params);
                    break;
                case 'timezone_conversion':
                    result = await tools.getTimezoneConversion(params);
                    break;
                case 'weekday':
                    result = await tools.getWeekday(params);
                    break;
                case 'timestamp_conversion':
                    result = await tools.getTimestampConversion(params);
                    break;
                case 'github_repos':
                    result = await tools.getGitHubRepos(params);
                    break;
                case 'github_issues':
                    result = await tools.getGitHubIssues(params);
                    break;
                case 'webscraper':
                    result = await tools.getWebScraper(params);
                    break;
                default:
                    sendJSON(res, 404, { success: false, error: '工具不存在' });
                    return;
            }
            
            sendJSON(res, 200, { success: true, data: result });
        } catch (error) {
            console.error('工具调用错误:', error);
            sendJSON(res, 500, { success: false, error: error.message || '工具调用失败' });
        }
        return;
    }

    // Dify API 代理端点
    if (pathname === '/api/dify/chat' && req.method === 'POST') {
        try {
            const body = await parseBody(req);
            const { message, user_id = 'default-user' } = body;
            
            if (!message) {
                sendJSON(res, 400, { success: false, error: '消息内容不能为空' });
                return;
            }
            
            // 模拟 Dify API 响应
            const mockResponse = {
                choices: [{
                    message: {
                        content: `你好！我是智能微信机器人，你刚才说："${message}"`
                    }
                }]
            };
            
            sendJSON(res, 200, {
                success: true,
                reply: mockResponse.choices[0].message.content || '抱歉，我暂时无法回答这个问题。'
            });
        } catch (error) {
            console.error('Dify API 代理错误:', error);
            sendJSON(res, 500, {
                success: false,
                error: error.message || '服务内部错误'
            });
        }
        return;
    }

    // 静态文件服务
    let filePath = '.' + pathname;
    if (filePath === './') {
        filePath = './start.html';
    }

    sendStaticFile(res, filePath);
});

// 启动服务器
server.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log(`健康检查: http://localhost:${PORT}/api/health`);
    console.log(`工具调用: http://localhost:${PORT}/api/tools/call`);
    console.log(`Dify API 代理: http://localhost:${PORT}/api/dify/chat`);
});
