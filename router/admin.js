const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("<h1>ADMIN-ROOT</h1>");
});
router.get("/list", (req, res) => {
	res.send("<h1>ADMIN-LIST</h1>");
});

module.exports = router;