/* Node, Express */
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const httpErrors = require("http-errors");
const log = console.log;

/* node_modules */
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");
const rfs = require('rotating-file-stream');
app.listen(3000, () => {
	log("http://127.0.0.1:3000");
});

log(__dirname);
log(__filename);
log(path.join(__dirname, "public"));

/* Express 셋팅 */
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.locals.pretty = true;

/* Morgan 셋팅 */
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
});
app.use(morgan('combined', { stream: accessLogStream }));

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
const apiRouter = require(path.join(__dirname,"router/api"));
const seqRouter = require(path.join(__dirname,"router/seq"));
app.use("/board", boardRouter);
app.use("/admin", adminRouter);
app.use("/rest", restRouter);
app.use("/api", apiRouter);
app.use("/seq", seqRouter);


/* 예외처리 */
app.use((req, res, next) => {
  next(httpErrors(404));
});

app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = error;
  res.render("error");
});
