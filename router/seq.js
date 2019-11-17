const express = require("express");
const router = express.Router();
const path = require("path");

const {User} = require(path.join(__dirname, "../models/User"));
// const {Scores} = require(path.join(__dirname, "../models/Scores"));

router.get("/", getData);
router.post("/", postData);
router.delete("/", deleteData);
router.put("/", putData);

async function getData(req, res, next) {
	let result = await User.findAll({
		order: [["id", "desc"]]
	});
	res.json(result);
}

async function postData(req, res, next) {
	let result = await User.create({
		username: req.body.username
	});
	res.json(result);
}

async function deleteData(req, res, next) {
	res.send("DELETE");
}

async function putData(req, res, next) {
	res.send("PUT");
}

module.exports = router;