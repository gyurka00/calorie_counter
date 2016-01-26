'use strict';

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  database: 'meals'
});

function allItems(callback) {
  connection.query('SELECT meal_id,name,calories,date FROM meals;', function(err, result){
      if (err) throw err;
      callback(result);
    });
}

function addItem(data, callback) {
  connection.query('INSERT INTO meals SET ?', data, function(err, result){
    if (err) throw err;
    callback(result);
  });
}

function removeItem(id,callback) {
  connection.query('DELETE FROM meals WHERE meal_id=?', id, function(err, result){
    if (err) throw err;
    callback(result);
  });
}


module.exports = {
  add: addItem,
  all: allItems,
  remove: removeItem
};
