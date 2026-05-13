# 開發工作流文件

## 整體開發流

```
規劃 → 開發 → 測試 → 提交 → 部署
  ↑      ↓                      ↓
  └───── 反饋迭代 ←────────────┘
```

## 階段一：專案初始化（已完成）

- [x] 建立 AGENTS.md（AI 協作規則）
- [x] 建立 docs/（文件目錄）
- [ ] 建立 HTML 基礎模板
- [ ] 建立 CSS 基礎樣式
- [ ] 建立 JS 共用工具函式
- [ ] 設定 Cloudflare Pages 專案
- [ ] 設定自訂網域

## 階段二：核心功能開發

### 每個計算機的開發流程

```
Step 1: 需求撰寫
  └─ 在 AGENTS.md 或對 AI 描述功能規格
  └─ 包含：輸入、輸出、公式、邊界情況

Step 2: AI 生成 HTML
  └─ 表單結構（input、label、button）
  └─ 結果顯示區域
  └─ 與現有設計風格一致

Step 3: AI 生成 CSS
  └─ 響應式風格
  └─ 計算機專屬樣式
  └─ 與全域變數一致

Step 4: AI 生成 JS
  └─ 計算邏輯（含公式註解）
  └─ 輸入驗證
  └─ 結果渲染

Step 5: 手動測試
  └─ 正常案例
  └─ 邊界案例（零、極大值）
  └─ 錯誤案例（負數、非數字）
  └─ 行動版 / 桌面版佈局

Step 6: 整合廣告
  └─ 在頁面合適位置加入廣告容器
  └─ 確認廣告不影響功能使用

Step 7: 提交程式碼
  └─ git add + git commit
  └─ commit message 格式：`feat: add [計算機名稱] calculator`
```

### 計算機開發優先順序

1. **貸款計算機**（loan）— 最簡單，建立模式
2. **房貸計算機**（mortgage）— 貸款延伸，加入攤還表
3. **儲蓄計算機**（savings）— 複利計算
4. **投資計算機**（investment）— 定期定額 + 複利
5. **退休規劃計算機**（retirement）— 多參數綜合
6. **匯率轉換計算機**（currency）— API 串接練習

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

Step 3: 審核通過後
  └─ 建立廣告單元
  └─ 在每個頁面放置廣告
  └─ 監控廣告表現
  └─ 最佳化廣告位置
```

## 階段四：部署與維運

### 部署流程（Cloudflare Pages）

1. 將程式碼推送至 GitHub 倉庫
   ```bash
   git add .
   git commit -m "feat: add [功能描述]"
   git push origin main
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

| 類型       | 情境                           | 範例                                    |
|-----------|--------------------------------|----------------------------------------|
| `feat`    | 新增功能                        | `feat: add loan calculator`            |
| `fix`     | 修復錯誤                        | `fix: validate negative loan amount`   |
| `docs`    | 文件異動                        | `docs: add architecture document`      |
| `style`   | 樣式調整（不影響邏輯）           | `style: adjust mobile layout`          |
| `refactor`| 重構（不新增功能也不修復錯誤）    | `refactor: extract utils functions`    |
| `perf`    | 效能最佳化                      | `perf: lazy load ad units`             |
| `chore`   | 建置、CI、設定等雜項            | `chore: update gitignore`              |

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
```

## 每日開發 SOP

1. 從 `git pull` 開始，確保程式碼最新
2. 選擇一個未完成的計算機功能
3. 向 AI 描述功能需求（參考 AGENTS.md 的規範）
4. AI 生成程式碼後，手動測試
5. 將程式碼加入對應的 HTML/CSS/JS 檔案
6. 在瀏覽器中刷新測試
7. 修正任何問題（可再次諮詢 AI）
8. Git commit 並推送
9. Cloudflare 自動部署
10. 檢查線上版本是否正常
