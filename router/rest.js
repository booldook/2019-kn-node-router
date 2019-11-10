const express = require("express");
const path = require("path");
const {alertLoc} = require(path.join(__dirname, "../modules/util-loc"));
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
	(async () => {
		let sql = "UPDATE rest SET username=? WHERE id=?";
		let sqlVals = [req.body.username, req.body.id];
		let result = await sqlExec(sql, sqlVals);
		if(result[0].affectedRows > 0) res.send(alertLoc("수정되었습니다.", "/rest"));
		else res.send(alertLoc("수정에 실패하였습니다.", "/rest"));
	})();
});

router.delete("/", (req, res) => {
	(async () => {
		let sql = "DELETE FROM rest WHERE id="+req.body.id;
		let result = await sqlExec(sql);
		if(result[0].affectedRows > 0) res.send(alertLoc("삭제되었습니다.", "/rest"));
		else res.send(alertLoc("삭제에 실패하였습니다.", "/rest"));
	})();
});


module.exports = router;