# 開發工作流文件

## 整體開發流

```
行銷評估 → 需求撰寫 → 設計套用 → 開發 → 結構化資料 → SEO 檢查 → 測試 → 整合廣告 → 提交部署
   ↑                                                                                    ↓
   └────────────────────────────── 反饋迭代 ←───────────────────────────────────────────┘
```

## 階段一：專案初始化（已完成 ✅）

- [x] 建立 AGENTS.md（AI 協作規則）
- [x] 建立 DESIGN.md（Coinbase 設計系統）
- [x] 安裝行銷技能（.agents/skills/）
- [x] 建立 docs/（文件目錄）
- [x] 建立 HTML 基礎模板
- [x] 建立 CSS 基礎樣式
- [x] 建立 JS 共用工具函式
- [x] SSH 金鑰設定完成，Remote URL 切換為 SSH
- [x] 首次推送至 GitHub 完成
- [ ] 設定 Cloudflare Pages 專案（待 Cloudflare 操作）
- [ ] 設定自訂網域（待 Cloudflare 操作）

## 階段二：核心功能開發

### 每個計算機的完整開發流程

```
Step 1: 行銷評估（新功能建議）
   └─ 觸發 free-tools 技能 → 評估關鍵字需求、選題策略
   └─ 觸發 content-strategy 技能 → 規劃周邊內容矩陣
   └─ 輸出：選題評估報告、關鍵字清單

Step 2: 需求撰寫
   └─ 對 AI 描述功能規格（參考 AGENTS.md 的 AI 請求規範）
   └─ 必須包含：輸入、輸出、公式、邊界情況、UI 偏好

Step 3: 設計套用
   └─ 參考 DESIGN.md 的元件定義
   └─ 使用 Coinbase 色票（{colors.primary} #0052ff 等）
   └─ 遵循圓角規範（pill / xl / md / full）
   └─ 遵循字體層級（display weight 400、負 letter-spacing）

Step 4: 開發（HTML + CSS + JS）
   └─ HTML：表單結構（input、label、button）、結果區域、廣告容器
   └─ CSS：響應式設計、與全域變數一致、對應 DESIGN.md token
   └─ JS：計算邏輯（含公式註解）、輸入驗證、結果渲染
   └─ 所有貨幣金額使用千分位逗號 + 小數點後 2 位

Step 5: 結構化資料（Schema Markup）
   └─ 觸發 schema 技能 → 取得 JSON-LD 模板
   └─ 為每個計算機頁面嵌入：
       • BreadcrumbList Schema（導覽路徑）
       • HowTo Schema（計算步驟說明）
       • FAQ Schema（常見問題）
   └─ 嵌入位置：頁面 <head> 或 <body> 底部

Step 6: SEO 檢查
   └─ 觸發 seo-audit 技能 → 技術 SEO 檢查清單
   └─ 確保：獨立的 meta title + description、Open Graph 標籤
   └─ 確保：圖片 alt 文字、內部連結使用相對路徑
   └─ 確保：H1 唯一、URL 簡潔

Step 7: 手動測試
   └─ 正常案例
   └─ 邊界案例（零、極大值）
   └─ 錯誤案例（負數、非數字）
   └─ 行動版 / 桌面版佈局（320px、768px、1024px）
   └─ 廣告區塊不影響功能

Step 8: 整合廣告
   └─ 在頁面合適位置加入廣告容器（頂部、結果下方、頁腳上方）
   └─ 確認廣告不影響功能使用
   └─ 廣告容器預留空間防止 CLS

Step 9: 提交程式碼
   └─ git add + git commit + git push
   └─ commit message 格式：`feat: add [calculator name] calculator`
```

### 行銷技能觸發對照表

| AI 聽到關鍵字 | 自動載入的技能 | 主要產出 |
|---------------|---------------|----------|
| 「免費工具」「計算機行銷」「SEO 策略」 | `free-tools` | 選題評估、SEO 策略、連結誘餌 |
| 「結構化資料」「schema」「json-ld」 | `schema` | FAQ/HowTo/BreadcrumbList 模板 |
| 「SEO」「搜尋優化」「排名」 | `seo-audit` | 技術 SEO 檢查清單 |
| 「網站結構」「導覽」「URL」 | `site-architecture` | 頁面層級規劃、內部連結 |
| 「內容策略」「文章規劃」 | `content-strategy` | 內容矩陣、關鍵字地圖 |
| 「分析」「追蹤」「GA4」 | `analytics` | 事件埋設規劃 |

### 計算機開發優先順序

1. **房貸計算機**（mortgage）— 貸款延伸，加入攤還表 + Chart.js 長條圖
2. **儲蓄計算機**（savings）— 複利計算 + 成長曲線圖
3. **投資計算機**（investment）— 定期定額 + 複利
4. **退休規劃計算機**（retirement）— 多參數綜合
5. **匯率轉換計算機**（currency）— API 串接練習

## 階段三：廣告整合

```
Step 1: 申請 Google AdSense
   └─ 使用現有 Google 帳號申請
   └─ 等待審核（通常 1-2 週）

Step 2: 審核期間準備
   └─ 在網站放置 AdSense 審核程式碼
   └─ 確保至少有 10-15 頁有意義的內容
   └─ 建立隱私政策頁面
   └─ 建立關於我們頁面
   └─ 建立聯絡我們頁面
   └─ 所有頁面需有 SEO 優化（meta title + description + schema）

Step 3: 審核通過後
   └─ 建立廣告單元
   └─ 在每個頁面放置廣告（最多 3 個/頁）
   └─ 監控廣告表現
   └─ 最佳化廣告位置
```

## 階段四：部署與維運

### 部署流程（Cloudflare Pages）

1. 將程式碼推送至 GitHub 倉庫（SSH 認證，無需密碼）
   ```bash
   git add -A && git commit -m "feat: add [功能描述]" && git push
   ```

2. Cloudflare Pages 自動部署
   - 登入 Cloudflare 儀表盤
   - 選擇 Pages → 連結 GitHub
   - 選擇對應倉庫
   - 設定：
     ```
     建置指令：（留空，靜態網站無需建置）
     輸出目錄：/（或留空）
     根目錄：/（或留空）
     ```

3. 設定自訂網域
   - 在 Cloudflare Pages → 自訂網域 → 輸入已購買的網域
   - Cloudflare 自動新增 DNS 記錄
   - 等待 DNS 傳播（通常幾分鐘到 24 小時）

4. 啟用 HTTPS
   - Cloudflare 自動提供 SSL 憑證
   - 可設定強制 HTTPS 重新導向

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

## 測試清單

### 每個計算機的測試案例

```
輸入驗證測試：
  □ 空欄位 → 顯示「請輸入數值」
  □ 非數字字元 → 顯示「請輸入有效數字」
  □ 負數 → 顯示「請輸入正數」
  □ 超過合理範圍 → 顯示「數值超出範圍」
  □ 極大值 → 不會當機

計算邏輯測試（以貸款為例）：
  □ 本金 100 萬、年利率 5%、20 年 → 月供 6,599 元
  □ 利率 0% → 月供 = 本金 / 期數
  □ 本金 0 → 月供 = 0
  □ 1 年 vs 30 年 → 較長年限月供較低

顯示測試：
  □ 結果格式：千分位逗號、小數點後 2 位
  □ 貨幣符號正確
  □ 圖表正常渲染（如有）
  □ 列印/螢幕閱讀器可讀

響應式測試：
  □ 320px（小手機）— 沒有水平滾動
  □ 768px（平板）— 雙欄或單欄正常
  □ 1024px+（桌面）— 完整佈局

SEO 測試：
  □ 頁面有獨立的 <title>
  □ 頁面有 meta description
  □ 頁面有 Open Graph 標籤
  □ 頁面有 BreadcrumbList JSON-LD
  □ 頁面有 HowTo 或 FAQ JSON-LD
  □ H1 唯一且包含主要關鍵字
  □ 圖片有 alt 文字
  □ 內部連結使用相對路徑
```

## 每日開發 SOP

1. 從 `git pull` 開始，確保程式碼最新
2. 選擇一個未完成的計算機功能 (mortgage → savings → investment → retirement → currency)
3. 檢查 `.agents/skills/` 中相關技能，觸發對應的行銷評估
4. 向 AI 描述功能需求（參考 AGENTS.md 的 AI 請求規範）
5. AI 生成程式碼後，對照 DESIGN.md 確認設計一致性
6. 手動測試（輸入驗證 / 邊界案例 / 響應式）
7. 嵌入 Schema JSON-LD（FAQ / HowTo / BreadcrumbList）
8. 確認 SEO 檢查清單
9. 加入廣告容器
10. Git commit 並推送
11. Cloudflare 自動部署
12. 檢查線上版本是否正常
