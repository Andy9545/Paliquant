# Session Handover — 交辦事項

**Session ID:** ses_1de9c333effefCmozW093Mg7wd
**日期:** 2026-05-13

## 已完成事項

### 專案初始化
- [x] 從 Python 專案轉換為靜態網站專案
- [x] 建立完整目錄結構（calculators, assets, docs）
- [x] 定義技術棧規則（不允許 React/Node/TypeScript/後端）
- [x] 建立 AGENTS.md（AI 協作規則）
- [x] 建立 docs/architecture.md（系統架構）
- [x] 建立 docs/workflow.md（開發工作流）
- [x] 建立 docs/tech-stack.md（技術棧決策）
- [x] 建立 docs/ad-revenue.md（廣告收益計畫）

### 前端基礎
- [x] 建立 index.html（首頁含 6 張計算機卡片 + 導航欄 + 頁腳）
- [x] 建立 assets/css/style.css（全域樣式、響應式設計、CSS 變數）
- [x] 建立 assets/js/main.js（手機選單、版權年份更新）
- [x] 建立 assets/js/utils.js（工具函式：格式化、驗證、DOM 操作）

### 貸款計算機（完整實作）
- [x] calculators/loan.html（含表單、結果區、Chart.js 圖表、免責聲明）
- [x] assets/js/calculators/loan.js（等額本息計算公式、輸入驗證、Chart.js doughnut）
- [x] 支援邊界情況（利率 0%、本金 0、Enter 鍵觸發計算）

### 其他計算機（骨架）
- [x] calculators/mortgage.html（房貸試算骨架）
- [x] calculators/savings.html（儲蓄規劃骨架）
- [x] calculators/investment.html（投資報酬骨架）
- [x] calculators/retirement.html（退休規劃骨架）
- [x] calculators/currency.html（匯率轉換骨架）

### Git 設定
- [x] SSH 金鑰已產生並加入 GitHub 帳號
- [x] Remote URL 已切換為 SSH（git@github.com:Andy9545/Paliquant.git）
- [x] 首次推送已完成（commit: 8d9571e）

## 交付清單／待辦事項

### P0 — 核心功能（立即實作）

| 項目 | 說明 | 參考人數 |
|------|------|---------|
| mortgage 房貸試算 | 等額本息 + 攤還明細表 + Chart.js 長條圖（本金/利息比例） | 參考 loan |
| savings 儲蓄規劃 | 複利計算 FV = PV(1+r)^n + 成長曲線圖 | 獨立 |
| investment 投資報酬 | 定期定額 FV = P * ((1+r)^n - 1)/r + Chart.js | 參考 savings |
| retirement 退休規劃 | 需求評估：目前年齡、退休年齡、預期壽命、通膨率、年化報酬率 | 綜合 |
| currency 匯率轉換 | 串接免費匯率 API（exchangerate-api.com 或 frankfurter.app） | 獨立 |

### P1 — 基礎建設

| 項目 | 說明 |
|------|------|
| 隱私政策頁面 | privacy.html（AdSense 需要） |
| 關於我們頁面 | about.html |
| 聯絡我們頁面 | contact.html |
| 免責聲明頁面 | disclaimer.html |
| favicon | 建立或下載計算機圖示至 assets/images/favicon.ico |

### P2 — 營利整合

| 項目 | 說明 |
|------|------|
| 申請 Google AdSense | 需網站至少有 10-15 頁內容、隱私政策、部署到公開網域、HTTPS |
| 整合廣告程式碼 | 每個頁面的 ad-container 插入 AdSense 程式碼 |
| 提交 Search Console | 讓 Google 索引網站 |

### P3 — 部署

| 項目 | 說明 |
|------|------|
| 設定 Cloudflare Pages | 連結 GitHub 倉庫 Andy9545/Paliquant，選擇 main 分支 |
| 設定自訂網域 | 在 Cloudflare Pages 綁定已購買的網域 |
| 啟用 HTTPS | Cloudflare 自動提供 |

## 重要提醒

1. **技術限制**：不引入 React/Vue/Node/TypeScript/後端/資料庫，僅使用 CDN 載入 Chart.js、Font Awesome、Google Fonts
2. **SSH 推送**：推送指令為 `git add -A && git commit -m "訊息" && git push`，無需認證
3. **安全規範**：嚴禁在對話中輸入 PAT token，SSH 已配置好
4. **推播後**：Cloudflare Pages 會自動部署（如果已設定）或需手動觸發
5. **新對話啟動**：AI 應先讀取 AGENTS.md → session-handover.md → git status → 決定開發項目
