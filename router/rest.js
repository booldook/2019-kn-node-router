const express = require("express");
const path = require("path");
const {sqlExec, ...db} = require(path.join(__dirname, "../modules/mysql-conn"));
const router = express.Router();
router.get("/", (req, res) => {
	(async () => {
		let sql = "SELECT * FROM rest ORDER BY id DESC";
		let result = await sqlExec(sql);
		res.render("rest/crud.pug", {datas: result[0]});
	})();
});

router.post("/", (req, res) => {
	(async () => {
		let username = req.body.username;
		let sql = "INSERT INTO rest SET username=?, wdate=?";
		let sqlVals = [username, new Date()];
		let result = await sqlExec(sql, sqlVals);
		res.redirect("/rest");
	})();
});

router.put("/", (req, res) => {
	res.send("<h1>REST-PUT</h1>");
});

router.delete("/", (req, res) => {
	res.send("<h1>REST-DELETE</h1>");
});


module.exports = router;