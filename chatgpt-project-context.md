# Paliquant 金融計算器網站 — 專案完整上下文

> 此文件供上傳至 ChatGPT Projects 作為知識庫使用。
> 合夥人可直接對此文件提問，ChatGPT 會根據內容給予專業建議。

---

## 1. 專案概述

**Paliquant** 是一個一站式金融計算器網站，提供免費的線上金融試算工具。

- **目標**: 透過金融計算器吸引流量，使用 Google AdSense 賺取廣告收益
- **部署方式**: Cloudflare Pages（靜態網站托管）
- **網域**: 已預先購買（待綁定）
- **技術風格**: 極簡、純靜態、零建置步驟

---

## 2. 技術棧

| 類別 | 技術 | 版本 |
|------|------|------|
| 標記語言 | HTML5 | — |
| 樣式語言 | CSS3（自定義變數） | — |
| 程式語言 | Vanilla JavaScript (ES6+) | — |
| 圖表函式庫 | Chart.js（CDN 載入） | 4.x |
| 圖示 | Font Awesome（CDN 載入） | 6.x |
| 字體 | Google Fonts Noto Sans TC | — |
| 部署平台 | Cloudflare Pages | — |
| DNS | Cloudflare DNS | — |
| 廣告平台 | Google AdSense | — |
| 版本控制 | Git + GitHub (SSH) | — |

### 嚴格禁止的技術
- ❌ React / Vue / Svelte 等前端框架
- ❌ Node.js / npm / 任何 bundler
- ❌ TypeScript
- ❌ 任何後端語言（PHP / Python / Node）
- ❌ 資料庫
- ✅ 僅使用 CDN 載入必要函式庫

---

## 3. 目錄結構

```
/
├── index.html                    # 首頁（6 張計算機卡片）
├── calculators/                  # 各計算機頁面
│   ├── loan.html                 # ✅ 貸款計算機（已實作）
│   ├── mortgage.html             # ⏸ 房貸試算（骨架）
│   ├── savings.html              # ⏸ 儲蓄規劃（骨架）
│   ├── investment.html           # ⏸ 投資報酬（骨架）
│   ├── retirement.html           # ⏸ 退休規劃（骨架）
│   └── currency.html             # ⏸ 匯率轉換（骨架）
├── assets/
│   ├── css/style.css             # 全域樣式（CSS 變數、BEM、響應式）
│   ├── js/
│   │   ├── main.js               # 共用功能（手機選單、版權）
│   │   ├── utils.js              # 工具函式（驗證、格式化、DOM）
│   │   └── calculators/
│   │       ├── loan.js           # ✅ 貸款計算邏輯 + Chart.js
│   │       ├── mortgage.js       # 待開發
│   │       ├── savings.js        # 待開發
│   │       ├── investment.js     # 待開發
│   │       ├── retirement.js     # 待開發
│   │       └── currency.js       # 待開發
│   ├── images/favicon.ico
│   └── data/exchange-rates.json  # 靜態匯率資料（待建立）
├── docs/
│   ├── architecture.md
│   ├── workflow.md
│   ├── tech-stack.md
│   └── ad-revenue.md
├── AGENTS.md                     # AI 協作規則
├── session-handover.md           # 交辦事項
├── chatgpt-project-context.md    # 本文件
├── CNAME                         # Cloudflare 自訂網域（待設定）
└── .gitignore
```

---

## 4. 開發狀態

### 已實作 ✅
- 首頁（index.html）：完整的導航、6 張計算機卡片、頁腳、廣告佔位
- 全域 CSS（style.css）：CSS 變數主題色、響應式 grid/flexbox、BEM 命名
- 共用 JS：main.js（選單切換）、utils.js（validateNumber、formatCurrency 等）
- 貸款計算機（loan.html + loan.js）：
  - 等額本息公式 `M = P * r * (1+r)^n / ((1+r)^n - 1)`
  - 輸入驗證（非空、正數、利率 0-100%、年限 1-50）
  - 結果顯示（月付款、總還款、總利息）
  - Chart.js doughnut 圖表（本金 vs 利息佔比）
  - 邊界處理（利率 0% 時直接除、本金 0 時結果為 0）

### 待開發 ⏸
| 計算機 | 功能說明 | 預計實作方式 |
|--------|---------|-------------|
| 房貸試算 | 等額本息 + 攤還明細表 + 長條圖 | 參考 loan.js，加入表格渲染 |
| 儲蓄規劃 | 複利計算 `FV = PV(1+r)^n` + 成長曲線圖 | 獨立邏輯，Chart.js line chart |
| 投資報酬 | 定期定額 `FV = P * ((1+r)^n - 1)/r` | 參考 savings |
| 退休規劃 | 年齡/退休年齡/壽命/通膨/報酬率多參數 | 綜合多個公式 |
| 匯率轉換 | 串接免費匯率 API | fetch() + 即時更新 |

### 待建立的法律頁面
- 隱私政策（privacy.html）
- 關於我們（about.html）
- 聯絡我們（contact.html）
- 免責聲明（disclaimer.html）

---

## 5. 設計約定

### HTML 約定
- 使用語意化標籤：`<header>` `<main>` `<section>` `<article>` `<footer>`
- 每個頁面需含 `<meta name="description">` 和 Open Graph 標籤
- 表單 input 需有 `id`、`aria-label` 屬性
- 使用 `<meta name="viewport">` 支援行動裝置
- 不使用 `<table>` 做排版

### CSS 約定
- 使用 `:root` 變數管理色彩與間距
- 行動優先（Mobile-first）響應式設計
- 使用 flexbox 和 grid 排版
- 不引入任何 CSS 框架（Bootstrap/Tailwind 等）
- BEM 命名風格（例如 `.calculator-card__title`）

### JavaScript 約定
- 使用 `'use strict'` 模式
- 每個計算機獨立一個 `.js` 檔案於 `assets/js/calculators/`
- 全域命名空間使用 `window.FinCalc` 物件避免污染
- 所有使用者輸入需驗證型別和非負數
- 使用 `DOMContentLoaded` 確保 DOM 載入後執行
- 支援 Enter 鍵觸發計算

---

## 6. 廣告收益規劃

### Google AdSense
- **申請前置條件**：網站需有 10-15 頁內容、隱私政策、部署到公開網域、HTTPS
- **廣告位置**（每頁 3 個）：
  1. 導航下方（頂部橫幅）
  2. 計算結果下方（橫幅）
  3. 頁腳上方（橫幅）
- **廣告容器**：`class="ad-container"`，預留 min-height 防止 CLS
- **合規要求**：不超過 3 個廣告單元、廣告與內容清楚區隔、無誤導性廣告、有免責聲明

### 預期收益（粗估）
| 階段 | 日訪客 | 月收入 (USD) |
|------|--------|-------------|
| 初期 | 100-500 | $5-$30 |
| 成長期 | 500-2K | $30-$150 |
| 穩定期 | 2K-10K | $150-$800 |

---

## 7. 部署設定

### Git 遠端
- Remote URL: `git@github.com:Andy9545/Paliquant.git`（SSH）
- 推送指令：`git add -A && git commit -m "訊息" && git push`

### Cloudflare Pages 設定步驟
1. 登入 Cloudflare Dashboard → Workers & Pages → Create → Pages
2. 連結 GitHub 帳號，選擇 `Andy9545/Paliquant` 倉庫
3. 框架選 None，建置指令留空，輸出目錄留空
4. 部署後在 Pages 專案 → Custom domains → 輸入購買的網域
5. HTTPS 由 Cloudflare 自動提供

---

## 8. 商業模式與建議諮詢方向

### 可以問 ChatGPT 的問題範例

**關於開發：**
- 「貸款計算機已經實作完成了，接下來房貸試算還需要加入攤還明細表，要怎麼設計 UI 比較好？」
- 「Chart.js 的長條圖要怎麼顯示每月本金與利息的變化？」
- 「匯率轉換需要串接 API，推薦哪個免費的匯率 API？」

**關於營利：**
- 「金融計算器網站的 SEO 策略建議？」
- 「Google AdSense 要多久才能通過審核，審核期間可以做什麼準備？」
- 「除了 AdSense，金融計算器網站還有什麼方式可以增加收益？」

**關於設計：**
- 「6 個計算機卡片在手機上要怎麼排列比較好？」
- 「免責聲明要放在哪個位置比較恰當？」
- 「網站的色彩配置建議，金融主題適合什麼色系？」

**關於部署：**
- 「Cloudflare Pages 的自訂網域要怎麼設定？」
- 「靜態網站的效能優化建議？」
- 「如何讓 Google 更快索引我的網站？」

---

## 9. 重要提醒

1. 所有計算結果必須附帶免責聲明（僅供參考，不構成財務建議）
2. AdSense 審核需要時間（1 週至 1 個月），建議先充實內容
3. 確保所有頁面在手機上正常運作（320px 以上）
4. 不要在任何程式碼中硬編碼敏感資訊（token、密碼等）
5. Chart.js、Font Awesome、Google Fonts 均透過 CDN 載入，不需下載
