"use strict";

var request = require('request');

var geocode = function geocode(address, callback) {
  var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoieXVnYWxqb3NoaSIsImEiOiJja2YyM3Q5ZTUweXRwMnlwaHNtaWdobGM0In0.W7rzOK668Yg3_Ij_UiV89Q&limit=1';
  request({
    url: url,
    json: true
  }, function (error, _ref) {
    var body = _ref.body;

    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;