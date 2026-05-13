# 廣告收益整合計畫

## Google AdSense 申請流程

### 前置條件
- [ ] 網站至少有 10-15 個頁面（或文章）
- [ ] 網站內容為原創且有價值
- [ ] 網站有隱私政策頁面
- [ ] 網站有「關於我們」頁面
- [ ] 網站有「聯絡我們」頁面
- [ ] 網站已部署至公開網域（非 localhost）
- [ ] 網站已啟用 HTTPS
- [ ] 網站已提交至 Google Search Console

### 申請步驟

1. **準備 AdSense 帳號**
   - 前往 https://adsense.google.com
   - 使用 Google 帳號登入
   - 填寫網站資訊（URL、內容類型等）

2. **放置審核程式碼**
   在每個 HTML 頁面的 `<head>` 中加入：
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
           data-ad-client="ca-pub-xxxxxxxxxxxxxx"></script>
   ```

3. **等待審核**
   - 審核時間：通常 1-2 週，最長可達一個月
   - 審核期間：網站需保持正常運作
   - 審核重點：內容品質、使用者體驗、頁面數量

4. **審核通過後**
   - 建立廣告單元（自動廣告或手動廣告）
   - 自動廣告：Google 自動決定廣告位置（最簡單，推薦初學者使用）
   - 手動廣告：自行決定廣告位置
   - 等待廣告開始展示（通常 1-2 天）

## 廣告配置方案

### 方案 A：自動廣告（推薦初學者）

在 `<head>` 中啟用自動廣告：

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        data-ad-client="ca-pub-xxxxxxxxxxxxxx"
        crossorigin="anonymous"></script>
```

Google 會自動在最佳位置插入廣告。只需：
1. 確保頁面內容結構清晰
2. 避免過多干擾元素
3. 設定自動廣告頻率（建議：中等）

### 方案 B：手動廣告（精準控制）

在特定位置放置廣告容器：

```html
<!-- 頂部橫幅廣告 -->
<div class="ad-container ad-top">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-xxxxxxxxxxxxxx"
       data-ad-slot="1234567890"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>

<!-- 結果下方廣告 -->
<div class="ad-container ad-middle">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-xxxxxxxxxxxxxx"
       data-ad-slot="0987654321"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

## 廣告放置位置（每頁）

| 位置           | 廣告類型   | 說明                           | 優先級 |
|---------------|-----------|-------------------------------|-------|
| 導航下方       | 橫幅       | 所有頁面頂部                    | 高    |
| 計算結果下方   | 橫幅       | 使用者完成計算後展示              | 高    |
| 頁腳上方       | 橫幅       | 頁面底部                        | 中    |

## CSS 廣告容器樣式

```css
.ad-container {
  margin: 20px 0;
  padding: 16px;
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  min-height: 90px; /* 預留空間防止 CLS */
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-container::before {
  content: "廣告";
  position: absolute;
  font-size: 11px;
  color: #999;
  top: 4px;
  left: 8px;
}

.ad-container ins {
  display: block;
  width: 100%;
}
```

## 廣告政策合規清單

- [ ] 不放置超過 3 個廣告單元在同一頁面
- [ ] 廣告不遮擋計算器輸入區域
- [ ] 廣告與內容有清楚區隔
- [ ] 不放置彈出式廣告
- [ ] 不放置誤導性廣告（偽裝成下載按鈕等）
- [ ] 廣告內容不涉及禁止類別（成人、賭博、武器等）— Google 自動過濾
- [ ] 網站有隱私政策頁面
- [ ] 網站有免責聲明（金融計算器特別需要）
- [ ] 網站在所有裝置上正常顯示廣告
- [ ] 不點擊自己的廣告（違反政策）

## 預期收益（僅供參考）

| 流量階段       | 日訪客   | 月預估收入（USD） | 備註              |
|---------------|---------|-----------------|------------------|
| 初期           | 100-500 | $5-$30          | SEO 尚未見效      |
| 成長期         | 500-2K  | $30-$150        | SEO 開始發力      |
| 穩定期         | 2K-10K  | $150-$800       | 持續產出內容      |
| 成熟期         | 10K+    | $800-$5000+     | 需流量最佳化      |

> 注意：以上為粗估，實際收益取決於多種因素（利基市場、地理位置、廣告季節等）。

## 收益最佳化策略

1. **SEO 最佳化**：確保每個計算機頁面有獨立的 meta description 和標題
2. **長尾關鍵字**：例如「2025 房貸利率計算」「30 年貸款月付金額」
3. **內容補充**：在每個計算機下方加入相關說明文章
4. **頁面速度**：快取策略、壓縮資源
5. **行動體驗**：確保手機上計算機易用、廣告顯示正常
6. **A/B 測試**：測試不同廣告位置和格式
7. **多語言**：未來可考慮加入英文版

## 收益替代方案（未來考慮）

| 方案           | 優點                     | 缺點                     |
|---------------|-------------------------|-------------------------|
| Google AdSense | 自動化、低門檻          | 收益較低、政策嚴格          |
| 聯盟行銷       | 收益較高（金融產品常高佣金） | 需要流量和信任             |
| 贊助內容       | 收益穩定                 | 需要一定知名度              |
| 付費工具       | 使用者付費、無廣告        | 需要獨特功能、轉換率低       |
| Crypto 廣告    | 填充率高、審核寬鬆        | 受眾侷限、品牌風險          |
