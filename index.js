const express = require("express");
const rate_limit = require("express-rate-limit");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const limiter = rate_limit({
 windowMs: 60 * 1000, // 1 minute
 max: 5, // 5 requests per 1 minute
});
require("dotenv").config();
if (!process.env.PORT) throw new Error("You need to enter PORT number in .env (eg. 8080)!");
if (!process.env.DOMAIN) throw new Error("You need to enter domain in .env (eg. http://localhost)!");
if (!process.env.WEBHOOK) throw new Error("You have to enter vaild Discord Webhook in .env!")
const port = process.env.PORT || 6565;
app.use(bodyParser.json());
app.set("query parser", "simple");
app.set("trust proxy", true);
app.use(limiter);
app.locals.domain = process.env.DOMAIN.split("//")[1];
const dataDir = path.resolve(`${process.cwd()}${path.sep}`);
app.use(express.static(`${dataDir}${path.sep}static`)); // Static DIR
app.set("view engine", "html");

// APIS
require("./api/v1/index")(app); // v1

app.use(function (req, res, next) {
 res.status(404);
 const json = {
  error: true,
  message: "Page not found!",
  error_code: 404,
 };
 res.send(json);
});

app.listen(port, null, null, () => {
 console.log(`🚀 Server is up and running on port ${port}!`);
});
