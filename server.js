'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var items = require("./items.js");

var app = express();

app.use(logRequest);
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/meals", function (req, res) {
  items.all(function(result) {
    res.status(200).json(result);
  });
});

app.post("/meals", function (req, res) {
  items.add(req.body, function(item) {
    res.status(201).json(item);
  });
});

app.delete("/todos/:id", function (req, res) {
  items.remove(req.params.id, function(item) {
    res.status(200).json(item);
  });
});

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
