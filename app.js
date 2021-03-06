var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var methodOverride = require('method-override');
var gruposRouter = require("./routes/GruposRouter");
var indexRouter = require("./routes/IndexRouter");
var cadastroRouter = require("./routes/CadastroRouter");
var authRouter = require("./routes/AuthRouter");

var app = express();
app.use('/stylesheets/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(session({secret:"UMASENHAPARATODOSGOVERNAR"}));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/login", authRouter);
app.use("/grupos", gruposRouter);
app.use("/cadastro", cadastroRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;