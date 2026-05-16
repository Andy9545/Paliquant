# AGENTS.md — AI 協作規則與 Vibe Coding 約束

## 專案概述

一站式金融計算器網站，部署於 Cloudflare Pages，使用自訂網域，透過 Google AdSense 賺取收益。

## 專案狀態

- **Repo**: `Andy9545/Paliquant` (GitHub)
- **Remote (SSH)**: `git@github.com:Andy9545/Paliquant.git`
- **SSH 金鑰位置**: `~/.ssh/id_ed25519` (對應 GitHub 帳號 Andy9545)
- **目前進度**: ✅ 全部 6 個計算機已實作完成、Google AdSense 已整合、深色主題已套用
- **設計系統**: 深色主題（參考 `DESIGN.md`）
- **行銷技能**: 已安裝 6 組 AI 行銷技能（`.agents/skills/`）
- **已推到 GitHub**: ✅ (可至 Cloudflare Pages 設定部署)

### 已實作頁面

| 頁面 | 狀態 | 說明 |
|------|------|------|
| index.html | ✅ 完成 | 首頁含 6 張計算機卡片、導航、廣告位、WebSite Schema |
| calculators/loan.html | ✅ 完成 | 貸款計算機（Chart.js doughnut、BreadcrumbList Schema） |
| calculators/mortgage.html | ✅ 完成 | 房貸試算（攤還明細表前12期、Doughnut 圖表） |
| calculators/savings.html | ✅ 完成 | 儲蓄規劃（複利計算、Line 成長曲線圖） |
| calculators/investment.html | ✅ 完成 | 投資報酬（定期定額、Line 成長曲線圖） |
| calculators/retirement.html | ✅ 完成 | 退休規劃（多參數評估、Bar 資產預測圖） |
| calculators/currency.html | ✅ 完成 | 匯率轉換（Frankfurter API、20種貨幣） |

### 待辦事項

| 優先 | 項目 | 說明 |
|------|------|------|
| P1 | 建立法律頁面 | privacy.html、about.html、contact.html、disclaimer.html |
| P1 | 申請 Google AdSense | 需網站至少有 10-15 頁內容、隱私政策、部署到公開網域 |
| P1 | 整合廣告單元 | 每個頁面的 ad-container 填入 AdSense 程式碼 |
| P2 | 設定 Cloudflare Pages | 連結 GitHub 倉庫，選擇 main 分支 |
| P2 | 設定自訂網域 | 在 Cloudflare Pages 綁定已購買的網域 |
| P2 | 提交 Search Console | 讓 Google 索引網站 |
| P3 | 內容擴充 | 每個計算機頁面加入 FAQ 區塊、HowTo 教學 |
| P3 | Analytics 整合 | 加入 GA4 事件追蹤 |

## 技術棧

- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **圖表**: Chart.js 4.x (CDN: `https://cdn.jsdelivr.net/npm/chart.js`)
- **圖示**: Font Awesome 6.x (CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`)
- **字體**: Google Fonts Noto Sans TC (CDN)
- **匯率 API**: Frankfurter (免費、免 API Key)
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

專案根目錄的 `DESIGN.md` 定義了深色主題設計語言：

### 核心色票
- **Primary** (`#3b82f6`): 主要 CTA 按鈕、品牌標誌、強調連結
- **Primary Dark** (`#2563eb`): 按鈕懸停狀態
- **Text** (`#e5e7eb`): 標題與內文
- **Text Light** (`#9ca3af`): 次要文字、標籤
- **Text Muted** (`#6b7280`): 提示文字、placeholder
- **Bg** (`#0a0a0a`): 頁面底色
- **Bg Soft** (`#111111`): 次要背景、輸入框
- **Surface** (`#1a1a1a`): 卡片背景
- **Border** (`#2a2a2a`): 邊框
- **Success** (`#10b981`): 成功/正值
- **Error** (`#ef4444`): 錯誤/負值
- **Warning** (`#f59e0b`): 警告

### 圓角規範
- CTA 按鈕: `pill` (100px)
- 卡片: `lg` (16px)
- 表單輸入: `base` (12px)
- 圖示頭像: `full` (9999px)

### 視覺效果
- 背景漸層光暈（radial-gradient）
- 導航列毛玻璃（backdrop-filter blur）
- 卡片懸停頂部漸層光條
- 按鈕漸層 + 懸停光暈
- 表單聚焦藍色光暈
- 自訂深色捲軸

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
├── DESIGN.md                # 設計系統（深色主題）
├── calculators/             # 各計算機頁面
│   ├── loan.html            # ✅ 貸款計算機
│   ├── mortgage.html        # ✅ 房貸試算
│   ├── savings.html         # ✅ 儲蓄規劃
│   ├── investment.html      # ✅ 投資報酬
│   ├── retirement.html      # ✅ 退休規劃
│   └── currency.html        # ✅ 匯率轉換
├── assets/
│   ├── css/
│   │   └── style.css        # 全域樣式（深色主題）
│   ├── js/
│   │   ├── main.js          # 共用 JS（導航、版權年份）
│   │   ├── utils.js         # 共用工具函式
│   │   └── calculators/     # 各計算機邏輯
│   │       ├── loan.js
│   │       ├── mortgage.js
│   │       ├── savings.js
│   │       ├── investment.js
│   │       ├── retirement.js
│   │       └── currency.js
│   └── images/
│       └── favicon.ico
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

- AdSense 程式碼已在所有頁面的 `<head>` 中載入（`ca-pub-1464276579658775`）
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
   └─ 使用深色主題色票、圓角、排版層級

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

### Git Commit 規範

| 類型 | 情境 | 範例 |
|------|------|------|
| `feat` | 新增計算機或功能 | `feat: add mortgage calculator` |
| `fix` | 修復錯誤 | `fix: validate negative loan amount` |
| `docs` | 文件異動 | `docs: update README and AGENTS` |
| `style` | 設計系統調整 | `style: apply dark theme` |
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
6. 根據待辦事項決定本次要開發的功能

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
- [ ] 頁面包含 BreadcrumbList Schema（JSON-LD）
- [ ] 頁面有獨立的 meta title + description
- [ ] 圖片有 alt 文字
- [ ] 內部連結使用相對路徑
- [ ] 圖表適配深色主題（文字顏色、tooltip、grid）
