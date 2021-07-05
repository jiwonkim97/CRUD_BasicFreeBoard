const express = require("express");
const router = express.Router();

const items = require("./items.js");

router.post("/create", items.create);
router.post("/update", items.update);
router.post("/delete", items.delete);
router.get("/read", items.read);

module.exports = router;