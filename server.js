'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var items = require("./items.js");
var users = require("./users.js");

var app = express();

app.use(logRequest);
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/meals/users/:user", items.all);
app.get("/meals/users", users.all);
app.get("/meals/:user/:date",items.get);
app.post("/meals", items.add);
app.delete("/meals/:id", items.remove);

var port = parseInt(process.env.PORT || "3000")
app.listen(port, function () {
  console.log("Listening on port 3000...")
});

function logRequest(req, res, next) {
  var parts = [
    new Date(),
    req.method,
    req.originalUrl,
  ];
  console.log(parts.join(" "));

  next();
}
