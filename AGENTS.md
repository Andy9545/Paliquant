# AGENTS.md — AI 協作規則與 Vibe Coding 約束

## 專案概述

一站式金融計算器網站，部署於 Cloudflare Pages，使用自訂網域，透過 Google AdSense 賺取收益。

## 技術棧

- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **圖表**: Chart.js (CDN)
- **部署**: Cloudflare Pages (靜態網站)
- **版本控制**: Git + GitHub
- **套件管理**: 無（純靜態網站，不需建置工具）

## 重要：不允許使用的技術

- ❌ 不引入 React / Vue / Svelte 等框架
- ❌ 不引入 Node.js / npm / bundler
- ❌ 不引入 TypeScript（使用純 JS）
- ❌ 不引入後端語言（PHP / Python / Node 等）
- ❌ 不使用資料庫
- ✅ 僅使用 CDN 載入必要函式庫（Chart.js 等）

## 目錄結構規範

```
/
├── index.html               # 首頁
├── calculators/             # 各計算機頁面
│   ├── loan.html
│   ├── mortgage.html
│   ├── savings.html
│   ├── investment.html
│   ├── retirement.html
│   └── currency.html
├── assets/
│   ├── css/
│   │   └── style.css        # 全域樣式
│   ├── js/
│   │   ├── main.js          # 共用 JS（導航、廣告等）
│   │   ├── utils.js         # 共用工具函式
│   │   └── calculators/     # 各計算機邏輯
│   │       ├── loan.js
│   │       ├── mortgage.js
│   │       ├── savings.js
│   │       ├── investment.js
│   │       ├── retirement.js
│   │       └── currency.js
│   ├── images/
│   │   └── favicon.ico
│   └── data/                # 靜態資料（如匯率 JSON）
│       └── exchange-rates.json
├── docs/                    # 專案文件
│   ├── architecture.md
│   ├── workflow.md
│   ├── tech-stack.md
│   └── ad-revenue.md
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
> UI：桌面左側輸入右側結果；行動版上下排列

## 開發工作流

1. **規劃** → 先在 `docs/` 中撰寫或更新對應文件
2. **開發** → 使用 AI 生成程式碼，每次專注一個計算機
3. **測試** → 在瀏覽器中手動測試所有邊界情況
4. **提交** → Git commit 並推送
5. **部署** → Cloudflare Pages 自動部署（或手動觸發）

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
