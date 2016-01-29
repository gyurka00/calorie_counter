'use strict';

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
