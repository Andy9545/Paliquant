# 技術棧文件

## 技術選型總表

| 層面        | 選擇              | 版本      | 原因                                      |
|------------|------------------|----------|------------------------------------------|
| 標記語言    | HTML5            | —        | 語意化、無障礙標準支援                        |
| 樣式語言    | CSS3             | —        | 自訂變數、Grid/Flexbox、響應式設計             |
| 程式語言    | JavaScript ES6+  | —        | 瀏覽器原生支援、不需編譯                      |
| 圖表函式庫  | Chart.js         | 4.x      | CDN 載入、輕量（約 70KB）、互動式圖表          |
| 圖示        | Font Awesome     | 6.x      | CDN 載入、豐富的免費圖示庫                    |
| 託管平台    | Cloudflare Pages | —        | 免費、全球 CDN、自動 HTTPS、DDoS 防護         |
| DNS        | Cloudflare DNS   | —        | 與 Pages 完美整合、一鍵設定                   |
| 廣告平台    | Google AdSense   | —        | 最大廣告網絡、收益穩定                         |
| 版本控制    | Git + GitHub     | —        | 業界標準、Cloudflare Pages 原生支援           |
| 字體        | Google Fonts     | —        | CDN 載入、字體優化                           |

## 為什麼選擇這些技術？

### 不使用框架 / 建置工具的原因

| 選項           | 結果  | 原因                                                    |
|---------------|------|--------------------------------------------------------|
| React/Vue     | ❌    | 學習曲線陡峭、需要建置工具、對 SEO 不友好（無 SSR）          |
| TypeScript    | ❌    | 需要編譯步驟、增加複雜度                                    |
| Tailwind      | ❌    | 需要建置流程、違反「零建置」原則                              |
| Node.js 後端  | ❌    | 不需要伺服器端邏輯、增加維護成本、不適用 Cloudflare Pages      |
| 資料庫         | ❌    | 計算器無需持久化儲存                                        |
| npm/yarn      | ❌    | 不需要套件管理（所有依賴透過 CDN）                          |

### Cloudflare Pages 的優勢

1. **免費方案**：每月 500 次建置、無限頻寬（合理使用）
2. **全球 CDN**：330+ 個節點，低延遲
3. **自動 HTTPS**：一鍵啟用 SSL 憑證
4. **自訂網域**：直接綁定已購買網域
5. **Git 整合**：推送即部署
6. **DDoS 防護**：內建安全功能
7. **Analytics**：提供基本流量分析（無需 Google Analytics）

### Chart.js 的選擇理由

- CDN 直接載入（無需 npm）：`<script src="https://cdn.jsdelivr.net/npm/chart.js">`
- 支援：長條圖、折線圖、圓餅圖、散佈圖
- 動畫效果、響應式設計
- 繁體中文社區廣泛，文件豐富

## 依賴管理

所有外部資源透過 CDN 載入，在每個 HTML 頁面的 `<head>` 中統一管理：

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js" defer></script>

<!-- Google AdSense (僅在審核通過後加入) -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        data-ad-client="ca-pub-xxxxxxxxxxxxxx"></script>
```

### SRI（Subresource Integrity）

對所有 CDN 資源添加 integrity 雜湊值，確保檔案未被篡改：

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"
        integrity="sha256-zy+7CqgPJbY1fF56vsXQgXo9RnYG6V6S7A0n5XioJU="
        crossorigin="anonymous" defer></script>
```

## 瀏覽器支援

| 瀏覽器       | 支援狀態 |
|-------------|---------|
| Chrome 90+  | ✅ 完全支援 |
| Firefox 90+ | ✅ 完全支援 |
| Safari 15+  | ✅ 完全支援 |
| Edge 90+    | ✅ 完全支援 |
| iOS Safari  | ✅ 完全支援 |
| Android Chrome | ✅ 完全支援 |

不需支援 Internet Explorer。

## 效能目標

| 指標              | 目標        | 工具               |
|------------------|------------|-------------------|
| First Contentful Paint | < 1.5s    | Cloudflare 快取 + 資源最小化 |
| Largest Contentful Paint | < 2.5s | 圖片最佳化 + 延遲載入 |
| Cumulative Layout Shift | < 0.1    | 廣告容器預留空間 |
| Lighthouse 評分    | 90+        | 定期使用 Chrome DevTools 檢查 |

## 監控與分析

- **Cloudflare Analytics**：基礎流量分析（免費）
- **Google Search Console**：SEO 監控（免費）
- **Cloudflare Web Analytics**：隱私友好的訪客統計（免費，可選）
