const express = require('express');
const imgRouter = require('../routes/img_uploader.js');
const PORT = 4000;

const app = express();

app.use('/api', imgRouter);

app.listen(PORT, () =>{
    console.log(`${PORT}번 포트 서버 실행`);
})