'use strict';

var url = 'http://localhost:3000/meals';

var foodName = document.querySelector('.food-name');
var foodCalories = document.querySelector('.food-calories');
var date = document.querySelector('.date');
var submitButton = document.querySelector('.submit-button');
var filterButton = document.querySelector('.filter-button');
var filterAllButton = document.querySelector('.filter-all-button');
var filterDate = document.querySelector('.filter-date');
var mealTable = document.querySelector('.meal-table');
var mealContainer = document.querySelector('.meal-container');
var sumCalories = document.querySelector('.sum-calories');
var users = document.querySelector('.users');

users.addEventListener('change', function(user) {
  refresh();
});

submitButton.addEventListener('click', function() {
  var message = {name: foodName.value, calories: foodCalories.value, date: date.value, user: users.value};
  sendPost(url, message, refresh);
  foodName.value = '';
  foodCalories.value = '';
  date.value = '';
});

filterAllButton.addEventListener('click', function() {
  refresh(users.value);
  filterDate.value= '';
});

filterButton.addEventListener('click', function() {
  var newUrl = url + '/' + users.value + '/' + filterDate.value;
  sendGET(newUrl, draweMeals);
});


function sendGET(url,callback) {
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

function refresh(user) {
  var newUrl = url + '/users/' + users.value;
  sendGET(newUrl, draweMeals);
}

function refreshUser() {
  sendGET(url+ '/users',draweUsers);
}

var draweUsers = function (response) {
  var usersArray = JSON.parse(response);
  usersArray.forEach(function (user) {
    addUser(user);
  });
}

var draweMeals = function (response) {
  var mealArray = JSON.parse(response);
  mealTable.innerHTML = '<tr><td>Name</td><td>Calories</td><td>Date</td></tr>';
  mealArray.forEach(function  (meal) {
    addMealToTable(meal,mealTable);
    countCalories(meal.calories);
  });
  sumCalories.innerText = 'Sum of calories: ' + sum;
  mealContainer.appendChild(sumCalories);
  sum = 0;
}

function addUser(user) {
  var newUser = document.createElement('option')
  newUser.innerText = user.name;
  users.appendChild(newUser);
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

var sum = 0;

function countCalories(calorie) {
  sum += calorie;
}

refreshUser();
