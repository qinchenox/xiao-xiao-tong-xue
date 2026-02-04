# 灏忓皬鍚屽

杩欐槸涓€涓泦鎴愪簡 DeepSeek AI 鏈嶅姟鐨勬櫤鑳借亰澶╂満鍣ㄤ汉椤圭洰锛屾彁渚涗簡鐜颁唬鍖栫殑鑱婂ぉ鐣岄潰鍜屾櫤鑳藉洖澶嶅姛鑳姐€?
## 鍔熻兘鐗规€?
- 鉁?鐜颁唬鍖栬亰澶╃晫闈紝妯℃嫙寰俊鑱婂ぉ鏍峰紡
- 鉁?鏅鸿兘鍥炲鍔熻兘锛堢敱 DeepSeek AI 鎻愪緵鏀寔锛?- 鉁?娑堟伅鍙戦€佸拰鎺ユ敹
- 鉁?瀹炴椂鍔犺浇鐘舵€佹樉绀?- 鉁?澶氱宸ュ叿闆嗘垚锛堟椂闂村伐鍏枫€丟itHub 宸ュ叿銆佺綉椤靛伐鍏凤級
- 鉁?鍚庣浠ｇ悊鏈嶅姟锛屼繚鎶?API 瀵嗛挜
- 鉁?闄嶇骇鏈哄埗锛岀‘淇濇湇鍔＄ǔ瀹氭€?- 鉁?鍝嶅簲寮忚璁★紝鏀寔妗岄潰鍜岀Щ鍔ㄨ澶?- 鉁?娴佺晠鐨勫姩鐢绘晥鏋滃拰鐢ㄦ埛浜や簰

## 鎺ュ叆鏂规

鐢变簬寰俊瀹樻柟API鐨勯檺鍒讹紝鎺ュ叆鐪熷疄寰俊鏈変互涓嬪嚑绉嶆柟妗堬細

### 鏂规1锛氫娇鐢╥tchat搴擄紙Python锛?
```python
# 瀹夎渚濊禆
pip install itchat

# 鍩虹浠ｇ爜绀轰緥
import itchat

@itchat.msg_register(itchat.content.TEXT)
def reply_message(msg):
    # 澶勭悊鏀跺埌鐨勬秷鎭?    return "浣犲ソ锛佹垜鏄井淇℃満鍣ㄤ汉"

# 鐧诲綍寰俊
itchat.auto_login(hotReload=True)
itchat.run()
```

### 鏂规2锛氫娇鐢╳echaty搴擄紙Node.js锛?
```bash
# 瀹夎渚濊禆
npm install wechaty
npm install wechaty-puppet-wechat4u
```

```javascript
// 鍩虹浠ｇ爜绀轰緥
const { Wechaty } = require('wechaty');
const { PuppetWechat4u } = require('wechaty-puppet-wechat4u');

const puppet = new PuppetWechat4u();
const bot = new Wechaty({ puppet });

bot.on('message', async (message) => {
    // 澶勭悊鏀跺埌鐨勬秷鎭?    if (message.type() === bot.Message.Type.Text) {
        await message.say('浣犲ソ锛佹垜鏄井淇℃満鍣ㄤ汉');
    }
});

// 鍚姩鏈哄櫒浜?bot.start()
    .then(() => console.log('鏈哄櫒浜哄凡鍚姩'))
    .catch(console.error);
```

### 鏂规3锛氫娇鐢ㄤ紒涓氬井淇PI

1. 娉ㄥ唽浼佷笟寰俊
2. 鍒涘缓搴旂敤
3. 鑾峰彇AppID鍜孲ecret
4. 鍙傝€冧紒涓氬井淇″紑鍙戞枃妗ｅ疄鐜?
## 椤圭洰缁撴瀯

```
wechat-bot/
鈹溾攢鈹€ index.html          # 鑱婂ぉ鐣岄潰
鈹溾攢鈹€ server.js           # 鍚庣浠ｇ悊鏈嶅姟
鈹溾攢鈹€ package.json        # 椤圭洰閰嶇疆鍜屼緷璧?鈹斺攢鈹€ README.md           # 璇存槑鏂囨。
```

## Dify 闆嗘垚璇存槑

鏈」鐩泦鎴愪簡 Dify AI 鏈嶅姟锛岄€氳繃鍚庣浠ｇ悊鏈嶅姟璋冪敤 Dify API锛屽疄鐜版櫤鑳藉洖澶嶅姛鑳姐€?
### Dify 宸ヤ綔娴?
椤圭洰浣跨敤鐨?Dify 宸ヤ綔娴佸湴鍧€锛?http://127.0.0.1/app/8c005365-4dad-49b8-9837-966275e96213/workflow

## 浣跨敤鏂规硶

### 1. 閰嶇疆 Dify API

宸查粯璁ら厤缃ソ Dify API 鐩稿叧淇℃伅锛?
```javascript
// Dify API 閰嶇疆
const DIFY_API_URL = 'http://127.0.0.1/api/v1/chat/completions';
const DIFY_API_KEY = 'app-sAaaT7wywPCld9J04cmGYDgr'; // 鐢ㄦ埛鎻愪緵鐨?API 瀵嗛挜
const MODEL_NAME = 'wechat-bot-ai'; // AI 閮ㄧ讲鍚嶇О
```

濡傛灉闇€瑕佷慨鏀归厤缃紝璇风紪杈?`server.js` 鏂囦欢銆?
### 2. 瀹夎渚濊禆

```bash
# 杩涘叆椤圭洰鐩綍
cd wechat-bot

# 瀹夎渚濊禆
npm install
```

### 3. 鍚姩鍚庣鏈嶅姟

```bash
# 鍚姩鏈嶅姟
npm start

# 鎴栦娇鐢ㄥ紑鍙戞ā寮忥紙鑷姩閲嶅惎锛?npm run dev
```

鏈嶅姟鍚姩鍚庯紝浼氬湪 http://localhost:3001 杩愯銆?
### 4. 鎵撳紑鑱婂ぉ鐣岄潰

鐩存帴鍦ㄦ祻瑙堝櫒涓墦寮€ `index.html` 鏂囦欢锛屾垨閫氳繃鍚庣鏈嶅姟璁块棶锛?http://localhost:3001

### 5. 寮€濮嬭亰澶?
鍦ㄨ緭鍏ユ涓緭鍏ユ秷鎭苟鍙戦€侊紝鏈哄櫒浜轰細閫氳繃 Dify AI 鏈嶅姟鐢熸垚鏅鸿兘鍥炲銆?
## 鑷畾涔夊洖澶?
淇敼 `index.html` 鏂囦欢涓殑 `getReply` 鏂规硶锛屽彲浠ヨ嚜瀹氫箟鏈哄櫒浜虹殑鍥炲閫昏緫锛?
```javascript
getReply(message) {
    // 鑷畾涔夊洖澶嶉€昏緫
    const replies = {
        '浣犲ソ': '浣犲ソ锛佸緢楂樺叴涓轰綘鏈嶅姟銆?,
        '鍐嶈': '鍐嶈锛佹湡寰呬笅娆′笌浣犺亰澶┿€?,
        // 娣诲姞鏇村鍥炲
    };
    
    // 妫€鏌ユ槸鍚︽湁鍖归厤鐨勫洖澶?    for (const [key, value] of Object.entries(replies)) {
        if (message.includes(key)) {
            return value;
        }
    }
    
    // 榛樿鍥炲
    return '鎶辨瓑锛屾垜涓嶅お鏄庣櫧浣犵殑鎰忔€濄€?;
}
```

## 娉ㄦ剰浜嬮」

1. 涓汉寰俊璐﹀彿浣跨敤鏈哄櫒浜哄彲鑳戒細琚檺鍒讹紝璇疯皑鎱庝娇鐢?2. 浼佷笟寰俊API鏄畼鏂规敮鎸佺殑鏂瑰紡锛屾帹鑽愪娇鐢?3. 绗笁鏂瑰簱鍙兘浼氶殢鐫€寰俊鐗堟湰鏇存柊鑰屽け鏁?
## 鎵╁睍鍔熻兘

- 鎺ュ叆AI瀵硅瘽妯″瀷锛堝GPT銆佹枃蹇冧竴瑷€绛夛級
- 娣诲姞鍥剧墖璇嗗埆鍔熻兘
- 瀹炵幇缇ょ鐞嗗姛鑳?- 鎺ュ叆澶栭儴鏈嶅姟锛堝澶╂皵鏌ヨ銆佹柊闂绘帹閫佺瓑锛?
## 鎶€鏈爤

- HTML5
- CSS3
- JavaScript

## 璁稿彲璇?
MIT License
