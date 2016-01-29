'use strict';

function sendRequest(method, url, message, user, callback) {
  var mealsRequest = new XMLHttpRequest();
  mealsRequest .open(method, url);
  mealsRequest .setRequestHeader('Content-Type','application/json');
  mealsRequest .send(JSON.stringify(message));
  mealsRequest .onreadystatechange = function () {
    if (mealsRequest .readyState === 4) {
      if (method === 'GET') {
        callback(mealsRequest.response);
      } else {
        callback(user);
      }
    }
  }
}
