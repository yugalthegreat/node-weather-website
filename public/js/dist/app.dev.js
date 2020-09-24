"use strict";

var location1 = document.querySelector("#address");
document.querySelector("#weather").addEventListener("submit", function (e) {
  e.preventDefault();
  var search = location1.value;
  var url = fetch("http://localhost:3000/weather?address=" + search);
  url.then(function (response) {
    response.json().then(function (data) {
      if (data.error) {
        document.querySelector("#myweather").innerHTML = "";
        var errorEl = document.createElement('p');
        errorEl.textContent = data.error;
        document.querySelector("#myweather").appendChild(errorEl);
      } else {
        document.querySelector("#myweather").innerHTML = "";
        var forecastEl = document.createElement('p');
        forecastEl.textContent = data.forecast;
        document.querySelector("#myweather").appendChild(forecastEl);
      }
    });
  });
});