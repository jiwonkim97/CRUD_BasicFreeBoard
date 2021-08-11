const express = require("express");
const router = express.Router();

const items = require("./items.js");
const { upload } = require('../module/upload.js');
//const imgUploader = require("./img_uploader.js");

router.post("/create", items.create);
router.post("/update", items.update);
router.post("/delete", items.delete);
router.get("/read", items.read);

router.post("/image", upload.fields([
    {
        
    }
]));

module.exports = router;