const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const log = console.log;
app.listen(3000, () => {
	log("http://127.0.0.1:3000");
});

log(__dirname);
log(__filename);
log(path.join(__dirname, "public"));

/* Express 셋팅 */
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({}));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.locals.pretty = true;

/* Router 셋팅 */
const boardRouter = require(path.join(__dirname,"router/board"));
const adminRouter = require(path.join(__dirname,"router/admin"));
app.use("/board", boardRouter);
app.use("/admin", adminRouter);