const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("<h1>REST-READ</h1>");
});

router.post("/", (req, res) => {
	res.send("<h1>REST-POST</h1>");
});

router.put("/", (req, res) => {
	res.send("<h1>REST-PUT</h1>");
});

router.delete("/", (req, res) => {
	res.send("<h1>REST-DELETE</h1>");
});


module.exports = router;