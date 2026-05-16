# AGENTS.md — AI 協作規則與 Vibe Coding 約束

## 專案概述

一站式金融計算器網站，部署於 Cloudflare Pages，使用自訂網域，透過 Google AdSense 賺取收益。

## 專案狀態

- **Repo**: `Andy9545/Paliquant` (GitHub)
- **Remote (SSH)**: `git@github.com:Andy9545/Paliquant.git`
- **SSH 金鑰位置**: `~/.ssh/id_ed25519` (對應 GitHub 帳號 Andy9545)
- **目前進度**: 已初始化專案結構、貸款計算機完整實作、其餘 5 個計算機為骨架頁面
- **設計系統**: Coinbase 風格（參考 `DESIGN.md`）
- **行銷技能**: 已安裝 6 組 AI 行銷技能（`.agents/skills/`）
- **已推到 GitHub**: ✅ (可至 Cloudflare Pages 設定部署)

### 已實作頁面

| 頁面 | 狀態 | 說明 |
|------|------|------|
| index.html | ✅ 完成 | 首頁含 6 張計算機卡片、導航、廣告位 |
| calculators/loan.html | ✅ 完成 | 貸款計算機（Chart.js doughnut 圖表） |
| calculators/mortgage.html | ⏸ 骨架 | 待實作房貸試算含攤還表 |
| calculators/savings.html | ⏸ 骨架 | 待實作複利儲蓄計算 |
| calculators/investment.html | ⏸ 骨架 | 待實作定期定額投資報酬 |
| calculators/retirement.html | ⏸ 骨架 | 待實作退休金需求評估 |
| calculators/currency.html | ⏸ 骨架 | 待實作匯率轉換（API 串接） |

### 交辦事項（高優先）

1. 開發 mortgage 房貸試算（含攤還明細表 + Chart.js 長條圖）
2. 開發 savings 儲蓄規劃（複利計算 + 成長曲線圖）
3. 開發 investment 投資報酬（定期定額計算）
4. 開發 retirement 退休規劃（多參數綜合評估）
5. 開發 currency 匯率轉換（串接免費匯率 API）
6. 建立隱私政策 / 關於我們 / 聯絡我們 等法律頁面
7. 申請 Google AdSense 並整合廣告程式碼
8. 設定 Cloudflare Pages 自訂網域

## 技術棧

- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **圖表**: Chart.js 4.x (CDN: `https://cdn.jsdelivr.net/npm/chart.js`)
- **圖示**: Font Awesome 6.x (CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`)
- **字體**: Google Fonts Noto Sans TC (CDN)
- **部署**: Cloudflare Pages (靜態網站)
- **版本控制**: Git + GitHub (SSH 認證)
- **套件管理**: 無（純靜態網站，不需建置工具）

## 重要：不允許使用的技術

- ❌ 不引入 React / Vue / Svelte 等框架
- ❌ 不引入 Node.js / npm / bundler
- ❌ 不引入 TypeScript（使用純 JS）
- ❌ 不引入後端語言（PHP / Python / Node 等）
- ❌ 不使用資料庫
- ✅ 僅使用 CDN 載入必要函式庫（Chart.js 等）

## 設計系統（DESIGN.md）

專案根目錄的 `DESIGN.md` 定義了基於 Coinbase 風格的設計語言：

### 核心色票
- **Coinbase Blue** (`#0052ff`): 主要 CTA 按鈕、品牌標誌、強調連結（唯一品牌色彩）
- **Ink** (`#0a0b0d`): 標題與強調文字
- **Body** (`#5b616e`): 內文預設色
- **Canvas** (`#ffffff`): 頁面底色
- **Surface Dark** (`#0a0b0d`): 深色全幅英雄區
- **Semantic Up** (`#05b169`): 正值/漲（文字色）
- **Semantic Down** (`#cf202f`): 負值/跌（文字色）

### 字體層級
- 內文使用 Noto Sans TC（Google Fonts），對應 CoinbaseSans
- 展示級標題使用 weight 400（不粗體），負 letter-spacing
- 所有數字使用 tabular-figures（tnum）等寬數字

### 圓角規範
- CTA 按鈕: `pill` (100px)
- 特色卡片: `xl` (24px)
- 表單輸入: `md` (12px)
- 圖示頭像: `full` (9999px)

### 元件
所有元件定義在 `DESIGN.md` 的 `components:` 區塊，引用時使用 `{token.ref}` 語法：
- `{colors.primary}` / `{colors.ink}` / `{colors.canvas}`
- `{typography.body-md}` / `{typography.display-mega}`
- `{rounded.pill}` / `{rounded.xl}`
- `{spacing.section}` / `{spacing.xl}`

實作時遵循 Do's and Don'ts（詳見 DESIGN.md），重點：
- ✅ Blue 只用於主要 CTA，不氾濫使用
- ✅ 所有按鈕 pill 形狀
- ✅ 96px 區塊節奏、充足的留白
- ❌ 不引入第二品牌色
- ❌ 不使用尖角（0px border-radius）
- ❌ 不將漲跌色作為按鈕背景

## AI 行銷技能（.agents/skills/）

專案已安裝 6 組行銷技能，AI 在處理對應任務時會自動讀取：

| 技能 | 誰觸發 | 用途 |
|------|--------|------|
| `free-tools` | 提到「免費工具/計算機行銷/SEO」 | 計算機選題評估、SEO 策略、連結誘餌 |
| `schema` | 提到「結構化資料/ schema/json-ld」 | FAQ/HowTo/BreadcrumbList Schema 模板 |
| `seo-audit` | 提到「SEO/搜尋優化/排名」 | 技術 SEO 檢查清單、關鍵字策略 |
| `site-architecture` | 提到「網站結構/導覽/URL」 | 頁面層級、內部連結、目錄規劃 |
| `content-strategy` | 提到「內容策略/文章規劃」 | 圍繞計算機關鍵字的內容矩陣 |
| `analytics` | 提到「分析/追蹤/GA4」 | 事件埋設、轉換追蹤、數據架構 |

### 觸發方式
AI 偵測到上述關鍵字時，應自動載入對應的 `.agents/skills/<skill>/SKILL.md` 並遵循其框架。

## 目錄結構規範

```
/
├── index.html               # 首頁
├── DESIGN.md                # 設計系統（Coinbase 風格）
├── calculators/             # 各計算機頁面
├── assets/
│   ├── css/
│   │   └── style.css        # 全域樣式
│   ├── js/
│   │   ├── main.js          # 共用 JS（導航、廣告等）
│   │   ├── utils.js         # 共用工具函式
│   │   └── calculators/     # 各計算機邏輯
│   ├── images/
│   │   └── favicon.ico
│   └── data/
│       └── exchange-rates.json
├── docs/                    # 專案文件
│   ├── architecture.md
│   ├── workflow.md
│   ├── tech-stack.md
│   └── ad-revenue.md
├── .agents/                 # AI 技能與設定
│   └── skills/
│       ├── free-tools/
│       ├── schema/
│       ├── seo-audit/
│       ├── site-architecture/
│       ├── content-strategy/
│       └── analytics/
├── AGENTS.md                # 本文件
├── README.md
├── .gitignore
└── CNAME                    # Cloudflare 自訂網域設定
```

## 編碼習慣

### HTML
- 使用語意化標籤 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- 每個頁面需包含 `<meta name="description">` 和 Open Graph 標籤
- 表單 input 需有 `name`、`id`、`aria-label` 屬性
- 行動裝置 viewport meta 標籤必須存在
- 不使用 table 做排版

### CSS
- 使用 CSS 自定義屬性（variables）管理主題色彩
- 行動優先（Mobile-first）響應式設計
- 使用 flexbox 和 grid 進行排版
- 不使用任何 CSS 框架（Bootstrap、Tailwind 等）
- 類別命名採用 BEM 風格（選用）
- 所有元件對應 DESIGN.md 的 token

### JavaScript
- 使用 ES6+ 語法（但保持瀏覽器相容性）
- 每個計算機一個獨立 .js 檔案
- 全域命名空間避免污染（使用 IIFE 或全域物件包裹）
- 所有使用者輸入必須進行型別驗證和非負數檢查
- 使用 `'use strict'` 模式
- DOMContentLoaded 事件監聽器確保 DOM 載入後執行

### 金融計算機規則
- 每個計算機需包含：
  1. 簡潔的 HTML 表單（輸入 + 按鈕）
  2. 清晰的結果顯示區域
  3. JavaScript 計算邏輯
  4. 輸入驗證（錯誤提示）
  5. 免責聲明文字
- 計算公式需在 JS 檔案註解中標明來源
- 預設範例數值幫助使用者理解
- 貨幣金額使用千分位逗號 + 小數點後 2 位

## 廣告（Google AdSense）規範

- AdSense 程式碼統一在 `assets/js/main.js` 或直接在 HTML 中管理
- 廣告位置：
  - 頁面頂部（導航下方）— 橫幅廣告
  - 計算器結果下方 — 橫幅廣告
  - 頁腳上方 — 橫幅廣告
- 每個頁面最多放置 3 個廣告單元
- 廣告容器需有唯一樣式 `ad-container` 類別
- 廣告區塊必須與內容清楚區隔
- 嚴禁點擊欺詐或誤導使用者點擊廣告

## 安全與憑證規則

### Git 推送規則
- 遠端使用 SSH 認證：`git@github.com:Andy9545/Paliquant.git`
- SSH 私鑰位於 `~/.ssh/id_ed25519`（無密碼，對應 GitHub 帳號 Andy9545）
- **嚴禁在對話中直接使用 PAT（Personal Access Token）**，若必須使用，用完需立即撤銷 token
- 推送指令：`git add -A && git commit -m "訊息" && git push`

### Session 檔案管理
- 每次對話的記錄會自動儲存為 `session-*.md`
- 新對話開始時應先讀取 `AGENTS.md` 和最新的 `session-*.md` 以了解專案狀態
- Session 檔案僅供參考，不應提交到 Git

### 安全敏感操作
- 任何 token、密碼、金鑰等敏感資訊不得寫入程式碼或 commit 中
- 外部 CDN 資源建議使用 SRI（Subresource Integrity）雜湊
- 廣告容器預留空間防止 CLS（Cumulative Layout Shift）

## AI 請求規範

### 向 AI 描述功能時，必須包含：

1. **功能描述**：一句話概括
2. **輸入清單**：所有欄位名稱、型別、範圍
3. **計算公式**：數學公式或邏輯步驟
4. **輸出要求**：顯示格式、精度、單位
5. **邊界情況**：零值、負值、極大值、空值時的處理方式
6. **UI 偏好**：桌面/行動版佈局參考

### 範例（貸款計算器需求描述）

> 功能：等額本息貸款計算器
> 輸入：貸款總額（正數）、年利率（0-100%）、貸款年限（1-50年）
> 公式：月供 = P * r * (1+r)^n / ((1+r)^n - 1)，r=月利率，n=總期數
> 輸出：月供金額、總還款額、總利息、還款明細表
> 邊界：當利率為0時直接 P/n；貸款總額為0時顯示0
> UI：桌面左側輸入右側結果；行動版上下排列，遵循 DESIGN.md 規範

## 開發工作流

### 每個計算機的開發流程

```
Step 1: 行銷評估（選擇性或首次開發）
   └─ 觸發 free-tools 技能 → 評估關鍵字需求、選題策略
   └─ 觸發 content-strategy 技能 → 規劃周邊內容

Step 2: 需求撰寫
   └─ 對 AI 描述功能規格（參考 AI 請求規範）
   └─ 包含：輸入、輸出、公式、邊界情況

Step 3: 設計套用
   └─ 參考 DESIGN.md 的元件定義
   └─ 使用 Coinbase 色票、圓角、排版層級

Step 4: 開發（HTML + CSS + JS）
   └─ AI 生成程式碼，遵循編碼習慣
   └─ 響應式設計
   └─ 輸入驗證 + 免責聲明

Step 5: 結構化資料
   └─ 觸發 schema 技能 → 生成 FAQ/HowTo/BreadcrumbList JSON-LD
   └─ 嵌入頁面 `<head>` 或 `<body>` 底部

Step 6: SEO 檢查
   └─ 觸發 seo-audit 技能 → 檢查 meta、標題、圖片 alt、網址
   └─ 確保每個計算機有獨立的 title 與 description

Step 7: 手動測試
   └─ 正常案例 / 邊界案例 / 錯誤案例
   └─ 行動版 / 桌面版佈局
   └─ 廣告區塊不影響功能

Step 8: 整合廣告
   └─ 在頁面合適位置加入廣告容器

Step 9: 提交程式碼
   └─ git add + git commit + git push
   └─ commit message 格式：`feat: add [calculator name] calculator`
```

### 優先順序
1. mortgage → 2. savings → 3. investment → 4. retirement → 5. currency

### Git Commit 規範

| 類型 | 情境 | 範例 |
|------|------|------|
| `feat` | 新增計算機或功能 | `feat: add mortgage calculator` |
| `fix` | 修復錯誤 | `fix: validate negative loan amount` |
| `docs` | 文件異動 | `docs: add marketing skills setup` |
| `style` | 設計系統調整 | `style: apply Coinbase design tokens` |
| `refactor` | 重構 | `refactor: extract utils functions` |
| `perf` | 效能最佳化 | `perf: lazy load ad units` |
| `seo` | 搜尋引擎優化 | `seo: add FAQ schema to loan page` |
| `chore` | 設定異動 | `chore: update gitignore` |

## 新對話啟動流程

每次開啟新對話時，AI 應依序執行：
1. 讀取 `AGENTS.md` — 了解專案規則、狀態、交辦事項
2. 讀取 `DESIGN.md` — 了解設計系統 Token
3. 讀取最新的 `session-*.md` — 了解上次對話的上下文和進度
4. 檢查 `.agents/skills/` 中與本次任務相關的技能
5. 檢查 `git status` 和 `git log -5` — 確認目前程式碼狀態
6. 根據交辦事項決定本次要開發的功能

## Code Review 清單

每次 AI 產生程式碼後，檢查以下項目：
- [ ] 所有 input 有驗證邏輯
- [ ] 沒有 console.log 遺留
- [ ] 響應式設計正常（測試 320px、768px、1024px）
- [ ] 沒有硬編碼的敏感資訊
- [ ] 廣告區塊正確放置（但不影響功能）
- [ ] 免責聲明存在且明顯
- [ ] 無未使用的 CSS/JS 程式碼
- [ ] 所有頁面導航連結正確
- [ ] 色彩使用符合 DESIGN.md 規範
- [ ] 按鈕圓角使用 pill（100px）
- [ ] 數字使用千分位逗號 + 2 位小數
- [ ] 頁面包含 FAQ 或 HowTo Schema（JSON-LD）
- [ ] 頁面有獨立的 meta title + description
- [ ] 圖片有 alt 文字
- [ ] 內部連結使用相對路徑
