const express = require('express');
const mysqlConnection = require("../module/mysql.js");
const connection = mysqlConnection.connection;
//const prefix = 'https://image.mileverse.com/article'
const upload = require("../module/upload")

const router = express.Router();

router.post('/upload', upload.single('img'), async (req, res) =>{
    const {title, content, date, time} = req.body;
    const image = req.file.location;
    try{
        connection.query(`INSERT INTO project_data.items (title, content, IMG_URL, PUB_DT) VALUES(?,?,?,?)`,
            [title, content, image, date + " " + time],
            (err) => {
                if(err) return console.log(err)
                   console.log(title + " inserted")
                   res.status(200).json(title+" inserted")
                })
    }catch(err){
        res.status(400).json(err)
        console.log(err)
    }
});

module.exports = router;