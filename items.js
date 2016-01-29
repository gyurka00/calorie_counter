'use strict';

var connection = require("./database_connection.js");

function allItems(req, res) {
  connection.conn.query('SELECT meals.meal_id,meals.name,meals.calories,meals.date FROM meals, user WHERE user.user_id= meals.user_id AND user.name=?;', req.params.user, function(err, result){
    if (err) throw err;
    res.status(200).json(result);
  });
}

function addItem(req, res) {
  connection.conn.query('SELECT user_id FROM user WHERE name=?', req.body.user, function(err, result){
    if (req.body.date !== '') {
    var data = {name: req.body.name, calories: req.body.calories, date: req.body.date, user_id: result[0].user_id};
  } else {
    var data = {name: req.body.name, calories: req.body.calories, user_id: result[0].user_id};
  }
    connection.conn.query('INSERT INTO meals SET ?', data, function(err, insertResult){
      if (err) throw err;
      res.status(201).json(insertResult);
    });
  });
}

function removeItem(req, res) {
  connection.conn.query('DELETE FROM meals WHERE meal_id=?', req.params.id, function(err, result){
    if (err) throw err;
    res.status(200).json(result);
  });
}

function getFilter(req,res) {
  connection.conn.query('SELECT meals.meal_id, meals.name, meals.calories, meals.date FROM meals, user WHERE CAST(meals.date AS DATE)=? AND user.user_id= meals.user_id AND user.name=?;', [req.params.date, req.params.user], function(err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
}

module.exports = {
  add: addItem,
  all: allItems,
  remove: removeItem,
  get: getFilter,
};
