'use strict';

var url = 'http://localhost:3000/meals';

var foodName = document.querySelector('.food-name');
var foodCalories = document.querySelector('.food-calories');
var date = document.querySelector('.date');
var submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', function() {
  var message = {name: foodName.value, calories: foodCalories.value, date: date.value};
  sendPost(url,message, refresh);
  foodName.value = '';
  foodCalories.value = '';
  date.value = '';
});

function sendGET(callback) {
  var mealsRequest = new XMLHttpRequest();
  mealsRequest .open('GET', url);
  mealsRequest .send();
  mealsRequest .onreadystatechange = function () {
    if (mealsRequest .readyState === 4) {
      callback(mealsRequest.response);
    }
  }
}

function sendPost(url, message, callback) {
  var mealsRequest = new XMLHttpRequest();
  mealsRequest .open('POST', url);
  mealsRequest .setRequestHeader('Content-Type','application/json');
  mealsRequest .send(JSON.stringify(message));
  mealsRequest .onreadystatechange = function () {
    if (mealsRequest .readyState === 4) {
      callback();
    }
  }
}

function refresh() {
  sendGET(draweMeals);
}

var mealTable = document.querySelector('.meal-table');

var draweMeals = function (response) {
  var mealArray = JSON.parse(response);
  mealTable.innerHTML = '<tr><td>Name</td><td>Calories</td><td>Date</td></tr>';
  mealArray.forEach(function  (meal) {
    addMealToTable(meal,mealTable);

  });
}

function addMealToTable(meal,parent) {
  var newMealRow = document.createElement('tr');
  newMealRow.setAttribute('id', meal.meal_id);
  parent.appendChild(newMealRow);
  addMealToTableRow(meal,'name',newMealRow);
  addMealToTableRow(meal,'calories',newMealRow);
  addMealToTableRow(meal,'date',newMealRow);
}

function addMealToTableRow(meal,type,row) {
  var newMealColumn = document.createElement('td');
  newMealColumn.innerText = meal[type];
  row.appendChild(newMealColumn);
}

refresh();
