# Session Handover — 交辦事項

**Session ID:** ses_1de9c333effefCmozW093Mg7wd
**日期:** 2026-05-16

## 已完成事項

### 專案初始化
- [x] 從 Python 專案轉換為靜態網站專案
- [x] 建立完整目錄結構（calculators, assets, docs）
- [x] 定義技術棧規則（不允許 React/Node/TypeScript/後端）
- [x] 建立 AGENTS.md（AI 協作規則）
- [x] 建立 docs/architecture.md（系統架構）
- [x] 建立 docs/workflow.md（開發工作流）
- [x] 建立 docs/tech-stack.md（技術棧說明）
- [x] 建立 docs/ad-revenue.md（廣告收益計畫）

### 前端基礎
- [x] 建立 index.html（首頁含 6 張計算機卡片 + 導航欄 + 頁腳）
- [x] 建立 assets/css/style.css（全域樣式、響應式設計、CSS 變數）
- [x] 建立 assets/js/main.js（手機選單、版權年份更新）
- [x] 建立 assets/js/utils.js（工具函式：格式化、驗證、DOM 操作）

### 全部 6 個計算機（完整實作）
- [x] calculators/loan.html + loan.js（等額本息計算、Chart.js doughnut）
- [x] calculators/mortgage.html + mortgage.js（房價/自備款/利率/年限、攤還明細表前12期、Doughnut 圖表）
- [x] calculators/savings.html + savings.js（初始存款+每月存入、複利計算、Line 成長曲線圖）
- [x] calculators/investment.html + investment.js（定期定額投資、年化報酬率、Line 成長曲線圖）
- [x] calculators/retirement.html + retirement.js（年齡/儲蓄/報酬率/通膨、充足性評估、Bar 資產預測圖）
- [x] calculators/currency.html + currency.js（20種貨幣、Frankfurter API、互換功能）

### 設計系統
- [x] 深色主題全面套用（背景 #0a0a0a、漸層光暈、毛玻璃導航）
- [x] 所有圖表適配深色主題（文字顏色、tooltip、grid）
- [x] 按鈕 pill 形狀 + 漸層 + 懸停光暈
- [x] 卡片懸停頂部漸層光條效果
- [x] 自訂深色捲軸樣式

### SEO 與結構化資料
- [x] 所有頁面加入 BreadcrumbList JSON-LD
- [x] 首頁加入 WebSite Schema
- [x] 每個頁面獨立 meta title + description
- [x] Open Graph 標籤

### Google AdSense
- [x] AdSense 驗證程式碼加入所有頁面 `<head>`（ca-pub-1464276579658775）
- [x] 每個頁面 ad-container 已預留（ad-top、ad-bottom）

### Git 設定
- [x] SSH 金鑰已產生並加入 GitHub 帳號
- [x] Remote URL 已切換為 SSH（git@github.com:Andy9545/Paliquant.git）
- [x] 多次推送已完成

### AI 行銷技能
- [x] 安裝 6 組技能：free-tools、schema、seo-audit、site-architecture、content-strategy、analytics

## 待辦事項

### P1 — 高優先

| 項目 | 說明 |
|------|------|
| 建立法律頁面 | privacy.html、about.html、contact.html、disclaimer.html |
| 申請 Google AdSense | 需網站至少有 10-15 頁內容、隱私政策、部署到公開網域 |
| 整合廣告單元 | 每個頁面的 ad-container 填入 AdSense 程式碼 |

### P2 — 中優先

| 項目 | 說明 |
|------|------|
| 設定 Cloudflare Pages | 連結 GitHub 倉庫 Andy9545/Paliquant，選擇 main 分支 |
| 設定自訂網域 | 在 Cloudflare Pages 綁定已購買的網域 |
| 提交 Search Console | 讓 Google 索引網站 |

### P3 — 低優先

| 項目 | 說明 |
|------|------|
| 內容擴充 | 每個計算機頁面加入 FAQ 區塊、HowTo 教學 |
| Analytics 整合 | 加入 GA4 事件追蹤 |

## 重要提醒

1. **技術限制**：不引入 React/Vue/Node/TypeScript/後端/資料庫，僅使用 CDN 載入 Chart.js、Font Awesome、Google Fonts
2. **SSH 推送**：推送指令為 `git add -A && git commit -m "訊息" && git push`，無需認證
3. **安全規範**：嚴禁在對話中輸入 PAT token，SSH 已配置好
4. **推播後**：Cloudflare Pages 會自動部署（如果已設定）或需手動觸發
5. **新對話啟動**：AI 應先讀取 AGENTS.md → session-handover.md → git status → 決定開發項目
