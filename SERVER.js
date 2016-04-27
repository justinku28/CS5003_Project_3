/**
* April 2016, CS5003, St Andrews MSc
* SERVER.js
* Authors: Bernard, Oat, Justin and Oliver.
*
**/
var http = require('http');
var express = require('express');
var json = require('express-json');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sanitizer = require('sanitizer');

// You will also need to replace the server name with the details given by
// couchdb. Will need to include password and user name if this is setup in couchdb
// "http://user:password@addressToCouchdb"
var nano = require('nano')('http://ojd2:q4vPxRFF@pc2-023-l.cs.st-andrews.ac.uk:20148');


var weather_db = nano.db.use('weather_history'); // Reference to the database storing the weather history data

//---------------------------------------------------------------------------------------------------
// ----------- FUNCTIONS FOR THE ROUTING SECTION TO CALL --------------------------------------------
//---------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//   Once reply or a tag has been added to the weather data, update weather_history 
//   Function very much like updateqa_db 
//   Note, does not update tag_info. See updateTaskInfo for that. 
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
function updateWeatherHistory(weather) {
    weather_db.insert(weather, 'weather_history', function(err_t, t) { 
        console.log("Added reply or a tag to a weather to CouchDB");
        //console.log(err_e);
        console.log(err_t);
    });
}

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
// Add updated weather information to CouchDB
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
function updateWeather_db(entryID, weather) {
    weather_db.insert(entryID, 'entryID', function(err_e, e) {
        weather_db.insert(weather, 'weather_history', function(err_t, t) { 
            console.log("Added weather item to CouchDB");
            console.log(err_e);
            console.log(err_t);
        });
    });
}
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//  Add a new weather with the next weather id (entryID).
//  Needs to do: 
//  Adds a new weather to the DB. Looks into body of 
//  post, and adds this as the weather.  
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
function addweather(req, res) {
    var weather = req.body;
    //santise weather here

    weather_db.get('entryID', { revs_info : true }, function (err, entryID) {
        if (!err) {
            var next_entry = entryID["next_entry"];
            weather_db.get('weather_history', { revs_info : true }, function (err, weather) {
                if (!err) {
                    var now = new Date();
                    var jsonDate = now.toJSON();
                    weather["weather_history"][next_entry] = { city: city, lon: lon, lat: lat, country: country, weather: weather, description: description, dateSubmit:jsonDate};
                    entryID["next_entry"] = next_entry + 1;
                    console.log("Submitted the weather: " + city + country + description);
                    // Add the new data to CouchDB (separate function since
                    // otherwise the callbacks get very deeply nested!)
                    updateweather_db(entryID, weather);

                    res.writeHead(201, {'Location' : next_entry});
                    res.end();
                }
            });
        }
    });
}

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//    List all the weather information as JSON, test for valid session. 
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
function listWeather(req, res) {
        weather_db.get('weather_history', { revs_info : true }, function (err, weather) {
            res.json(weather["weather_history"]);
        });
}
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
// ----------- END OF FUNCTIONS SECTION -------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
// Standard app setup for express 
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
var app = express()
app.use(json());
app.use(express.query());
app.use(bodyParser.text()); // For parsing POST requests 
app.use(cookieParser()); //For cookie handling.

app.use(express.static('node_modules'));
app.use(express.static('dist'));

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
// Routing using Express as middleware follow ------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
// Returns a list of weather in JSON format. 
//  Provided valid session cookie is present.
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------


// STILL TO DO:
app.get('/listWeather/', listWeather);

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
// Adds a new weather object to the DB. Looks into body of 
// post, and adds this as the weather. Still a stub.
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
app.post('/weather/', addweather);


app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');    
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
// End of Routing Middleware ---------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------