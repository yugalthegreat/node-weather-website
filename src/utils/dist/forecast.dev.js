"use strict";

var request = require('request');

var forecast = function forecast(latitude, longitude, callback) {
  var url = 'http://api.weatherstack.com/current?access_key=b3723119927180878ee469814a3a36ad&query=' + latitude + ',' + longitude;
  request({
    url: url,
    json: true
  }, function (error, _ref) {
    var body = _ref.body;

    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, body.current.weather_description[0].summary + ' It is currently ' + body.current.feelslike + ' degress out.');
    }
  });
};

module.exports = forecast;