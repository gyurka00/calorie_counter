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
var changeUser = document.querySelector('.change-user');

var user= getQueryUser('user');

function getQueryUser(key) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == key) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query key %s not found', key);
}

changeUser.addEventListener('click', function() {
  window.location = '/index.html';
});

submitButton.addEventListener('click', function() {
  var message = {name: foodName.value, calories: foodCalories.value, date: date.value, user: user};
  sendPost(url, message, refresh);
  foodName.value = '';
  foodCalories.value = '';
  date.value = '';
});

filterAllButton.addEventListener('click', function() {
  refresh(user);
  filterDate.value= '';
});

filterButton.addEventListener('click', function() {
  var newUrl = url + '/' + user + '/' + filterDate.value;
  sendGET(newUrl, refresh);
});

mealTable.addEventListener('click', function(e) {
  var newUrl = url + '/' + e.path[2].id;
  sendDELETE(newUrl, user, refresh);
});

function refresh(user) {
  var newUrl = url + '/users/' + user;
  sendGET(newUrl, draweMeals);
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

function addMealToTable(meal,parent) {
  var newMealRow = document.createElement('tr');
  newMealRow.setAttribute('id', meal.meal_id);
  parent.appendChild(newMealRow);
  addMealToTableRow(meal,'name',newMealRow);
  addMealToTableRow(meal,'calories',newMealRow);
  addMealToTableRow(meal,'date',newMealRow);
  createDeleteButton(newMealRow);
}

function addMealToTableRow(meal,type,row) {
  var newMealColumn = document.createElement('td');
  if (type === 'date') {
    var datetime = meal[type].split('T');
    newMealColumn.innerText = datetime[0] + ', ' + datetime[1].substring(0,8);
  }else {
    newMealColumn.innerText = meal[type];
  }
  row.appendChild(newMealColumn);
}

function createDeleteButton(row) {
  var newElem = document.createElement('td');
  var deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'hidden');
  deleteButton.classList.add('delete-button');
  deleteButton.innerText = 'X';
  row.appendChild(newElem);
  newElem.appendChild(deleteButton);
}

var sum = 0;

function countCalories(calorie) {
  sum += calorie;
}

refresh(user);
