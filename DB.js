/// Run this first, to initialise the data in CouchDB

// You will also need to replace the server name with the details given by
// couchdb-setup
// couchdb-start
// THEN: run node SERVER.js -> node DB.js
// NOTE: *NOT* your school/university username and password!
var nano = require('nano')('http://ojd2:3VWKFcnR@pc3-016-l.cs.st-andrews.ac.uk:20148');
// var nano = require('nano')('http://ojd2:q4vPxRFF@localhost:5984');
// NOTE: Access the portal here: ... /_utils/index.html

// our application's model, populated with some entries and tags
var entryID = { "next_entry" : 1 };
var init_history = { "weather_history" :{} };

nano.db.destroy('weather', function (err, body) {
   console.log(err);
});

nano.db.create('weather', function (err, body) {
    weatherdb = nano.db.use('weather');
    if (!err) {
        
        // Database didn't exist, so populate it with some initial data
        weatherdb.insert(init_history, 'weather_data', function(err, body) {
            if (!err) {
                console.log("Initialised weather_history:");
                console.log(body);
            } else {
                console.log("Error when initialising weather_history");
                console.log(err);
            }
        });

        weatherdb.insert(entryID, 'entryID', function(err, body) {
            if (!err) {
                console.log("Initialised Entry ID:");
                console.log(body);
            } else {
                console.log("Error when initialising entry ID");
                console.log(err);
            }
        })    
    }
});