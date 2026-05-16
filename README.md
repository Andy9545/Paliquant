# 金融計算器 — 一站式免費金融試算工具

一站式金融計算器網站，部署於 Cloudflare Pages，使用自訂網域，透過 Google AdSense 賺取收益。

## 功能列表

| 計算機 | 狀態 | 功能說明 |
|--------|------|----------|
| 貸款計算機 | ✅ | 等額本息計算、月付款/總還款/總利息、Doughnut 圖表 |
| 房貸試算 | ✅ | 房價/自備款/利率/年限、攤還明細表（前12期）、Doughnut 圖表 |
| 儲蓄規劃 | ✅ | 初始存款+每月存入、複利計算、成長曲線圖 |
| 投資報酬 | ✅ | 定期定額投資、年化報酬率、總報酬/報酬率、成長曲線圖 |
| 退休規劃 | ✅ | 年齡/儲蓄/報酬率/通膨/生活費、充足性評估、資產預測圖 |
| 匯率轉換 | ✅ | 20種貨幣、Frankfurter API 即時匯率、互換功能 |

## 設計系統

採用深色主題設計，參考 `DESIGN.md`。

### 核心特色
- 深色背景（`#0a0a0a`）搭配漸層光暈
- 藍色主色調（`#3b82f6`）用於 CTA 與強調
- 毛玻璃導航列（backdrop-filter blur）
- 圓角 pill 按鈕 + 卡片懸停漸層光條
- 所有圖表適配深色主題

## 技術棧

- HTML5 + CSS3 + Vanilla JavaScript
- Chart.js（CDN）
- Font Awesome（CDN）
- Google Fonts Noto Sans TC（CDN）
- Cloudflare Pages（部署）
- Google AdSense（廣告收益）
- Frankfurter API（匯率資料）

## 開始使用

1. 克隆倉庫
2. 在瀏覽器中直接開啟 `index.html` 即可以本地方式預覽
3. 無需安裝任何套件或建置工具

## 部署

推送至 GitHub 後，Cloudflare Pages 會自動部署。

## 專案文件

詳細文件請參考 `docs/` 目錄：
- `docs/architecture.md` — 系統架構
- `docs/workflow.md` — 開發工作流（含行銷技能觸發流程）
- `docs/tech-stack.md` — 技術棧說明
- `docs/ad-revenue.md` — 廣告收益計畫
- `DESIGN.md` — 深色主題設計系統
- `.agents/skills/` — AI 行銷技能（SEO、Schema、內容策略等）
- `AGENTS.md` — AI 協作規則
