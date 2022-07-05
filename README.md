## 使用方法:

- 1. npm i
- 2. install完後 在根目錄下建立.env檔(以便將金鑰存入)
![](https://i.imgur.com/EounCkF.png)

並定義REACT_APP_AUTHORIZATION_KEY = ''(''內為您的金鑰KEY)

![](https://i.imgur.com/O7TMG1f.png)

- 3. 設定完成後即可執行yarn start(npm start)

### 實際畫面:

==主畫面==
![](https://i.imgur.com/N4pM7RY.png)


可點擊每一筆資料後方的icon
去觀看更詳細的縣市氣象資訊

#### Export 按鈕
預設未勾選資料時，為匯出全部資料
若有勾選前方的checkbox則為匯出勾選的資料

#### Refresh 按鈕
重新撈取資料


==Modal==
![](https://i.imgur.com/7cnL9Pt.png)

點擊icon後跳出的Modal，資料為縣市的36小時詳細氣象資訊
