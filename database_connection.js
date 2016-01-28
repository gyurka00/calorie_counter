'use strict';

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  database: 'meals',
  timezone: 'utc'
});

module.exports = {
  conn: connection,
};
