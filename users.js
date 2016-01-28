'use strict';

var connection = require("./database_connection.js");

function allUsers(req, res) {
  connection.conn.query('SELECT name FROM meals.user;', function(err, result){
    if (err) throw err;
    res.status(200).json(result);
  });
}

module.exports = {
  all: allUsers,
};
