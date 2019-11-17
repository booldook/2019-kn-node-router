const express = require("express");
const router = express.Router();
const path = require("path");

const {User} = require(path.join(__dirname, "../models/User"));

router.get("/", (req, res, next) => {
	res.send("<h1>Hello Sequelize</h1>");
});

module.exports = router;