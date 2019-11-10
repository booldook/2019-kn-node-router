const express = require("express");
const path = require("path");
const {alertLoc} = require(path.join(__dirname, "../modules/util-loc"));
const {sqlExec, ...db} = require(path.join(__dirname, "../modules/mysql-conn"));
const router = express.Router();

router.get("/", (req, res) => {
	(async () => {
		let sql = "SELECT * FROM rest ORDER BY id DESC";
		let result = await sqlExec(sql);
		res.json(result[0]);
	})();
});

router.post("/", (req, res) => {
	(async () => {
		let username = req.body.username;
		let sql = "INSERT INTO rest SET username=?, wdate=?";
		let sqlVals = [username, new Date()];
		let result = await sqlExec(sql, sqlVals);
		res.json(result[0]);
	})();
});

router.put("/", (req, res) => {
	(async () => {
		let sql = "UPDATE rest SET username=? WHERE id=?";
		let sqlVals = [req.body.username, req.body.id];
		let result = await sqlExec(sql, sqlVals);
		res.json(result[0]);
	})();
});

router.delete("/", (req, res) => {
	(async () => {
		let sql = "DELETE FROM rest WHERE id="+req.body.id;
		let result = await sqlExec(sql);
		res.json(result[0]);
	})();
});


module.exports = router;