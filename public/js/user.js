'use strict';

var url = 'http://localhost:3000/meals';
var users = document.querySelector('.users');

users.addEventListener('change', function(e) {
  console.log(e);
  window.location = '/meals.html?user='+ e.target.value;
});

function refreshUser() {
  sendGET(url+ '/users', draweUsers);
}

var draweUsers = function (response) {
  var usersArray = JSON.parse(response);
  usersArray.forEach(function (user) {
    addUser(user);
  });
}

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

function addUser(user) {
  var newUser = document.createElement('option')
  newUser.innerText = user.name;
  users.appendChild(newUser);
}
refreshUser();
