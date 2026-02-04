// 浣跨敤 Node.js 鍐呯疆妯″潡瀹炵幇绠€鍗曠殑鍚庣鏈嶅姟
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

// Dify API 閰嶇疆
const DIFY_API_URL = 'http://127.0.0.1/api/v1/chat/completions';
const DIFY_API_KEY = 'app-sAaaT7wywPCld9J04cmGYDgr'; // 鐢ㄦ埛鎻愪緵鐨?API 瀵嗛挜
const MODEL_NAME = 'wechat-bot-ai'; // AI 閮ㄧ讲鍚嶇О

// 宸ュ叿瀹炵幇妯″潡
const tools = {
    // 鏃堕棿宸ュ叿
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
        
        return `鏈湴鏃堕棿: ${localTime}\nUTC鏃堕棿: ${utcTime}`;
    },
    
    async getWeekday(params) {
        const date = params.date ? new Date(params.date) : new Date();
        const weekdays = ['鏄熸湡鏃?, '鏄熸湡涓€', '鏄熸湡浜?, '鏄熸湡涓?, '鏄熸湡鍥?, '鏄熸湡浜?, '鏄熸湡鍏?];
        const weekday = weekdays[date.getDay()];
        const formattedDate = date.toLocaleDateString('zh-CN');
        
        return `${formattedDate} ${weekday}`;
    },
    
    async getTimestampConversion(params) {
        const timestamp = params.timestamp || Date.now();
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleString('zh-CN');
        
        return `褰撳墠鏃堕棿: ${formattedDate}\n鏃堕棿鎴? ${timestamp}`;
    },
    
    // GitHub 宸ュ叿锛堟ā鎷燂級
    async getGitHubRepos(params) {
        const query = params.query || 'dify';
        return `GitHub 浠撳簱鎼滅储: ${query}\n鍔熻兘寮€鍙戜腑...`;
    },
    
    async getGitHubIssues(params) {
        const owner = params.owner || 'langgenius';
        const repo = params.repo || 'dify';
        return `GitHub Issues: ${owner}/${repo}\n鍔熻兘寮€鍙戜腑...`;
    },
    
    // 缃戦〉鐖櫕宸ュ叿锛堟ā鎷燂級
    async getWebScraper(params) {
        const url = params.url || 'https://dify.ai';
        return `缃戦〉鍐呭: ${url}\n鍔熻兘寮€鍙戜腑...`;
    }
};

// 瑙ｆ瀽璇锋眰浣?function parseBody(req) {
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

// 鍙戦€?JSON 鍝嶅簲
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

// 鍙戦€侀潤鎬佹枃浠?function sendStaticFile(res, filePath) {
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

// 鍒涘缓 HTTP 鏈嶅姟鍣?const server = http.createServer(async (req, res) => {
    // 澶勭悊 OPTIONS 璇锋眰锛圕ORS 棰勬锛?    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // 瑙ｆ瀽 URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    // 鍋ュ悍妫€鏌ョ鐐?    if (pathname === '/api/health') {
        sendJSON(res, 200, { status: 'ok', message: '鏈嶅姟杩愯姝ｅ父' });
        return;
    }

    // 宸ュ叿璋冪敤绔偣
    if (pathname === '/api/tools/call' && req.method === 'POST') {
        try {
            const body = await parseBody(req);
            const { tool_name, params = {} } = body;
            
            if (!tool_name) {
                sendJSON(res, 400, { success: false, error: '宸ュ叿鍚嶇О涓嶈兘涓虹┖' });
                return;
            }
            
            let result;
            
            // 鏍规嵁宸ュ叿鍚嶇О璋冪敤涓嶅悓鐨勫伐鍏?            switch (tool_name) {
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
                    sendJSON(res, 404, { success: false, error: '宸ュ叿涓嶅瓨鍦? });
                    return;
            }
            
            sendJSON(res, 200, { success: true, data: result });
        } catch (error) {
            console.error('宸ュ叿璋冪敤閿欒:', error);
            sendJSON(res, 500, { success: false, error: error.message || '宸ュ叿璋冪敤澶辫触' });
        }
        return;
    }

    // Dify API 浠ｇ悊绔偣
    if (pathname === '/api/dify/chat' && req.method === 'POST') {
        try {
            const body = await parseBody(req);
            const { message, user_id = 'default-user' } = body;
            
            if (!message) {
                sendJSON(res, 400, { success: false, error: '娑堟伅鍐呭涓嶈兘涓虹┖' });
                return;
            }
            
            // 妯℃嫙 Dify API 鍝嶅簲
            const mockResponse = {
                choices: [{
                    message: {
                        content: `浣犲ソ锛佹垜鏄櫤鑳藉井淇℃満鍣ㄤ汉锛屼綘鍒氭墠璇达細"${message}"`
                    }
                }]
            };
            
            sendJSON(res, 200, {
                success: true,
                reply: mockResponse.choices[0].message.content || '鎶辨瓑锛屾垜鏆傛椂鏃犳硶鍥炵瓟杩欎釜闂銆?
            });
        } catch (error) {
            console.error('Dify API 浠ｇ悊閿欒:', error);
            sendJSON(res, 500, {
                success: false,
                error: error.message || '鏈嶅姟鍐呴儴閿欒'
            });
        }
        return;
    }

    // 闈欐€佹枃浠舵湇鍔?    let filePath = '.' + pathname;
    if (filePath === './') {
        filePath = './start.html';
    }

    sendStaticFile(res, filePath);
});

// 鍚姩鏈嶅姟鍣?server.listen(PORT, () => {
    console.log(`鏈嶅姟鍣ㄨ繍琛屽湪 http://localhost:${PORT}`);
    console.log(`鍋ュ悍妫€鏌? http://localhost:${PORT}/api/health`);
    console.log(`宸ュ叿璋冪敤: http://localhost:${PORT}/api/tools/call`);
    console.log(`Dify API 浠ｇ悊: http://localhost:${PORT}/api/dify/chat`);
});
