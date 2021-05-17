
# expense-tracker
運用Node.js + Express框架與MongoDB資料庫製作的精簡版記帳網頁，使用者可以任意新增自己的支出，並將支出分類，首頁可以查看、編輯、刪除各項支出項目；使用者也可以使用篩選功能查看特定類別的支出項目總和。

專案畫面
![image](https://github.com/afwyou/expense-tracker/blob/master/Opera%20快照_2021-05-17_150357_localhost.png)

index

新增支出頁面
add-new-record

編輯支出項目
update-a-record

## 產品功能
* 使用者可以在首頁查看所有支出項目
* 使用者可以在首頁查看所有支出項目金額總和
* 使用者可以編輯任一支出項目
* 使用者可以刪除任一支出項目
* 使用者可以篩選任一支出類別，並於顯示該類別的總支出金額
## 環境建置與需求
Node.js: v14.16.1
## 安裝與執行步驟
```bash
打開終端機將專案下載至本地執行
```
```bash
git clone https://github.com/tinahung126/expense-tracker.git
進入專案資料夾
```
```bash
cd expense-tracker
安裝專案需求套件
```
```bash
npm install 
npm i nodemon
```
```bash
啟動伺服器，執行專案
```
```bash
npm run dev
終端機顯示 Start listening on http://localhost:3000 即成功啟動，可至 http://localhost:3000 開始使用！
```
