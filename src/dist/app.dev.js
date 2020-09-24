"use strict";

var path = require('path');

var express = require('express');

var hbs = require('hbs');

var forecast = require('./utils/forecast');

var geocode = require('./utils/geocode');

var geoCode = require('./utils/geocode');

var app = express(); //define paths for express config

var publicDirectoryPath = path.join(__dirname, "../public");
var viewPath = path.join(__dirname, "../templates/views");
var partialsPath = path.join(__dirname, "../templates/partials"); //setup handlebars engine and view location

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath); //setup static directory to serve

app.use(express["static"](publicDirectoryPath));
app.get('', function (req, res) {
  res.render('index', {
    title: "Weather App",
    name: "Yugal Joshi"
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    title: "ABOUT ME",
    name: "Yugal Joshi"
  });
});
app.get('/help', function (req, res) {
  res.render("help", {
    title: "Help",
    message: "this is help page. ask questions if you have a problem accessing this site",
    name: "Yugal Joshi"
  });
});
app.get('/weather', function (req, res) {
  var address = req.query.address;

  if (!address) {
    return res.send({
      error: "please provide an address"
    });
  }

  geoCode(address, function (error) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        latitude = _ref.latitude,
        longitude = _ref.longitude,
        location = _ref.location;

    if (error) {
      return res.send({
        error: error
      });
    }

    forecast(latitude, longitude, function (error, forecastdata) {
      if (error) {
        return res.send({
          error: error
        });
      }

      res.send({
        forecast: forecastdata,
        location: location
      });
    });
  });
});
app.get('/help/*', function (req, res) {
  res.render('helperror', {
    title: "Weather",
    name: "yugal joshi"
  });
});
app.get('*', function (req, res) {
  res.render('error', {
    title: "Weather",
    name: "yugal joshi"
  });
});
app.listen(3000, function () {
  console.log("test express!");
});