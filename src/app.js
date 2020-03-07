const debug = require("debug")("my-application");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { PORT } = require("./config");
const routes = require("./routes");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app
  .use(favicon(path.join(__dirname, "public", "favicon.ico")))
  .use(logger("dev"))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(express.static(path.join(__dirname, "public")))
  .use("/", routes);

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

app.listen(PORT, () => {
  debug(`Express server listening on port ${PORT}`);
});
