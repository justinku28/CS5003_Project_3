/// Run this first, to initialise the data in CouchDB

// You will also need to replace the server name with the details given by
// couchdb-setup
// Then get the username and password.
// couchdb-start
// THEN: run node SERVER.js -> node DB.js
// NOTE: *NOT* your school/university username and password!
// NOTE: Access the portal here: ... /_utils/index.html
var nano = require('nano')('http://ojd2:Fr4mcrct@pc2-084-l.cs.st-andrews.ac.uk:20148');
// Our application's model, populated with some entries and tags
var entryID = { "next_entry" : 2 };
var init_history = { "weather_history" :
                    {"1": {"city": "New York", "dateSubmit":"Wed 18 May 2016 : 17:09:21"},  
                   } };

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