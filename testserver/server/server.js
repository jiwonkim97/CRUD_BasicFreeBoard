const express = require("express");
const routes = require("../routes/routes.js");
const port = 3000;

const app = express();  // express 사용

app.use(express.json()) // JSON 형식 수신을 위함
app.use("/", routes)    // express router 미들웨어 사용

app.listen(port, () => {  
  console.log('서버 실행 완료!');
});