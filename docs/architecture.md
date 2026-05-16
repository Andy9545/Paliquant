# 系統架構文件

## 整體架構概覽

```
┌─────────────────────────────────────────────────────────┐
│                   瀏覽器 (Client)                        │
│  ┌──────────┐  ┌────────────┐  ┌───────────────────┐  │
│  │ HTML5    │  │ CSS3       │  │ Vanilla JS        │  │
│  │ 語意化標籤 │  │ 響應式設計   │  │ 計算機邏輯         │  │
│  │ Schema   │  │ DESIGN.md  │  │ Chart.js          │  │
│  │ JSON-LD  │  │ Token 系統  │  │ AdSense           │  │
│  └──────────┘  └────────────┘  └───────────────────┘  │
│                    │                                    │
│                    ↓ (HTTPS)                            │
├────────────────────┼────────────────────────────────────┤
│                    ↓                                    │
│           Cloudflare Pages                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 靜態檔案託管 + CDN 快取 + 自動 HTTPS              │  │
│  └──────────────────────────────────────────────────┘  │
│                    │                                    │
│                    ↓                                    │
│            Cloudflare DNS                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 自訂網域 → CNAME → pages.dev                    │  │
│  └──────────────────────────────────────────────────┘  │
│                    │                                    │
│                    ↓                                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Google AdSense (外部 JS)                        │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 架構決策

| 面向 | 決策 | 原因 |
|------|------|------|
| 託管 | Cloudflare Pages | 免費、全球 CDN、自動 HTTPS、與 DNS 完美整合 |
| 前端框架 | 無（Vanilla JS） | 適合初學者、無建置步驟、直接上傳即可運作 |
| 後端 | 無 | 所有計算在瀏覽器端完成，不需伺服器 |
| CSS 框架 | 無（自訂 CSS） | 輕量化、完全控制、對應 DESIGN.md token |
| 圖表 | Chart.js（CDN） | 輕量、易用、適合金融圖表展示 |
| 設計系統 | DESIGN.md（Coinbase 風格） | AI agent 可讀取的純文字設計規範 |
| 資料 | 前端 JSON 或 API | 匯率等動態資料透過免費 API 在前端獲取 |

## 專案目錄角色

### 設計層

| 檔案 | 角色 | 誰讀取 |
|------|------|--------|
| `DESIGN.md` | Coinbase 風格設計系統定義 | AI agent、開發者 |
| `assets/css/style.css` | CSS 實作（對應 DESIGN.md token） | 瀏覽器 |

### 行銷層

| 路徑 | 角色 | 觸發時機 |
|------|------|----------|
| `.agents/skills/free-tools/` | 免費計算機行銷策略 | 提到「計算機行銷/SEO」 |
| `.agents/skills/schema/` | 結構化資料模板 | 提到「JSON-LD/schema」 |
| `.agents/skills/seo-audit/` | SEO 檢查清單 | 提到「SEO/搜尋優化」 |
| `.agents/skills/site-architecture/` | 網站結構規劃 | 提到「網站結構/導覽」 |
| `.agents/skills/content-strategy/` | 內容策略框架 | 提到「內容策略/文章」 |
| `.agents/skills/analytics/` | 分析追蹤規劃 | 提到「分析/GA4」 |

## 頁面路由設計

```
/                     → 首頁（計算機列表）
/calculators/loan.html       → 貸款計算機
/calculators/mortgage.html   → 房貸計算機
/calculators/savings.html    → 儲蓄計算機
/calculators/investment.html → 投資計算機
/calculators/retirement.html → 退休規劃計算機
/calculators/currency.html   → 匯率轉換計算機
/privacy.html                → 隱私政策
/about.html                  → 關於我們
/contact.html                → 聯絡我們
```

路由由靜態檔案系統決定，無需前端路由器。

## 資料流

### 計算機操作流程

```
使用者輸入數值
       ↓
JavaScript 監聽 submit 事件
       ↓
輸入驗證（型別檢查、範圍檢查、非空檢查）
  ❌無效 → 顯示錯誤訊息
  ✅有效 → 執行計算公式
       ↓
渲染結果到 DOM（數字格式化：千分位、小數點後 2 位）
       ↓
（可選）Chart.js 渲染圖表
       ↓
AdSense 廣告（不干擾使用者流程）
```

### 匯率轉換資料流

```
頁面載入
       ↓
fetch() → 免費匯率 API（如 exchangerate-api.com）
       ↓
JSON 解析 → 填充貨幣下拉選單
       ↓
使用者選擇幣別 + 輸入金額
       ↓
計算並顯示轉換結果
```

## 廣告放置架構

```
┌─────────────────────────────────┐
│ 導航列                           │
├─────────────────────────────────┤
│ [ 廣告單元 #1 - 橫幅 ]          │  ← 頁面頂部
├─────────────────────────────────┤
│                                 │
│  計算機輸入區域                   │
│                                 │
├─────────────────────────────────┤
│  計算結果區域                     │
│                                 │
├─────────────────────────────────┤
│ [ 廣告單元 #2 - 橫幅 ]          │  ← 結果下方
├─────────────────────────────────┤
│  免責聲明                        │
├─────────────────────────────────┤
│ [ 廣告單元 #3 - 橫幅 ]          │  ← 頁腳上方
├─────────────────────────────────┤
│ 頁腳（版權、隱私政策、關於）      │
└─────────────────────────────────┘
```

每個廣告單元使用 `class="ad-container"` 統一管理樣式，確保：
- 廣告與內容有足夠間距（margin: 20px 0）
- 廣告區塊有邊框或背景色區隔
- 廣告不遮擋計算機操作
- 行動版廣告自動調整大小
- 廣告容器預留空間防止 CLS（Cumulative Layout Shift）

## Schema 結構化資料架構

每個計算機頁面應包含以下 JSON-LD：

### BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://domain.com/" },
    { "@type": "ListItem", "position": 2, "name": "貸款計算機", "item": "https://domain.com/calculators/loan.html" }
  ]
}
```

### HowTo（計算步驟）
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "如何使用貸款計算機",
  "step": [
    { "@type": "HowToStep", "text": "輸入貸款總額" },
    { "@type": "HowToStep", "text": "輸入年利率" },
    { "@type": "HowToStep", "text": "選擇貸款年限" },
    { "@type": "HowToStep", "text": "點擊計算按鈕查看結果" }
  ]
}
```

### FAQ（常見問題）
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "等額本息和等額本金有什麼區別？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "等額本息每月還款金額相同..."
      }
    }
  ]
}
```

## 安全考量

- 所有表單輸入進行客戶端驗證（防止 XSS 和意外輸入）
- 不使用 eval() 或 innerHTML 插入使用者輸入
- 使用 textContent 或 createTextNode 處理動態文字
- HTTPS 由 Cloudflare 自動提供
- 外部 CDN 資源使用 SRI（Subresource Integrity）雜湊

## 效能策略

- 靜態檔案透過 Cloudflare CDN 快取
- 圖片使用 WebP 格式（如需要）
- CSS/JS 檔案壓縮（Cloudflare 自動進行）
- 延遲載入非關鍵廣告單元（使用 requestIdleCallback）
- 使用 `<link rel="preload">` 預載關鍵資源
- 廣告容器預留空間防止 CLS
