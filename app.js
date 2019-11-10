const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
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

/* Method-Override 셋팅 */
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));


/* Router 셋팅 */
const boardRouter = require(path.join(__dirname,"router/board"));
const adminRouter = require(path.join(__dirname,"router/admin"));
const restRouter = require(path.join(__dirname,"router/rest"));
app.use("/board", boardRouter);
app.use("/admin", adminRouter);
app.use("/rest", restRouter);