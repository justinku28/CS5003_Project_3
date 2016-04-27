/// Run this first, to initialise the data in CouchDB

// WARNING: It will delete any existing database called 'tasks'!

// You will also need to replace the server name with the details given by
// couchdb-setup
//
// NOTE: *NOT* your school/university username and password!
var nano = require('nano')('http://ojd2:q4vPxRFF@pc2-023-l.cs.st-andrews.ac.uk:20148');

// our application's model, populated with some entries and tags
var entryID = { "next_entry" : 10 };
var init_history = { "weather_history" :
                    {"1": {"city": "New York", "lon ":"138.933334", "lat":"34.966671", "country":"2016-03-25T17:11:45.385Z", "weather":"Clouds", "description":"overcast clouds", "dateSubmit":"2014-07-23 09:00:00"},
                    "2": {"city": "London", "coord":"lon : 138.933334,lat : 34.966671", "country":"2016-03-25T17:11:45.385Z", "weather":"Clouds", "description":"overcast clouds", "dateSubmit":"2014-07-23 09:00:00"},
                    "3": {"city": "St. Andrews", "coord":"lon : 138.933334,lat : 34.966671", "country":"2016-03-25T17:11:45.385Z", "weather":"FUCKING RAINING / HAIL / SUNSHINE AGAIN", "description":"overcast clouds", "dateSubmit":"2014-07-23 09:00:00"},  
             	   } };

nano.db.destroy('weather', function (err, body) {
   console.log(err);
});

nano.db.create('weather', function (err, body) {
    weatherdb = nano.db.use('weather');
    if (!err) {
        
        // Database didn't exist, so populate it with some initial data
        weatherdb.insert(init_history, 'weather_history', function(err, body) {
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