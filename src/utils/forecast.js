const request = require('request');
//const weatherAPI = '3b87993fe264b2f09ba97e824c2b905e';
 
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b3723119927180878ee469814a3a36ad&query='+latitude+','+longitude
 
    request({url, json: true}, (error, 
        {
        body:{
            error: bodyErorr, 
            location:{name, region, latitude, longitude}, 
            current:{temperature,feelslike,humidity}
        }}={}) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (bodyErorr) {
            callback(bodyErorr.type, undefined);
        } else {
            callback(undefined, {name, region, latitude, longitude, temperature, feelslike,humidity});
        }
    });
};
 
module.exports = forecast;