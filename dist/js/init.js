//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
// Begin init() which is called on load.
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
function init() {

	// A function which calls our Weather API.

	// Username: ojd2
	// API: be0b44175983b4c5337b54cbf2356b9c

	// Returns the API json.

	// Prints the json objects.

	// http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=json&appid=be0b44175983b4c5337b54cbf2356b9c

/**
* 
* Some globals:
*
**/
var city, lon, lat, country, city_weather, description, dateSubmit;

/**
* 
* Var Base URL for forecast only. The following variable will store our base URL for all API calls.
* You can search weather forecast for 5 days with data every 3 hours by city name. 
* All weather data can be obtained in JSON, XML or HTML format. 
* Parameters:
* @q="city_name" and "country_code" divided by comma, use ISO 3166 country codes.
* 
**/
var baseURLForcast = "http://api.openweathermap.org/data/2.5/forecast?q=";
/**
* 
* Var Base URL for weather only. The following variable will store our base URL for all API calls.
* You can search weather forecast for 5 days with data every 3 hours by city name. 
* All weather data can be obtained in JSON, XML or HTML format. 
* Parameters:
* See the following URL for parameter details under weather: http://openweathermap.org/forecast5
* 
**/
var baseURLWeather = "http://api.openweathermap.org/data/2.5/weather?q=";
/**
* 
* Var API key. This will be concatenated onto the end of our callback string. 
* Currently, the following API is from Ollie's account: ojd2.
*
**/
var API = "&appid=" + "be0b44175983b4c5337b54cbf2356b9c";
var ForcastURL, WeatherURL;
/**
* 
* The following apiForcast() function calls the API URL for forcast only along with the city parameter.
* This function generates our API URL in the accepted format for the Open weather API.
*
**/
function APIForcast(city) {
	ForcastURL = baseURLForcast + city + API; // Create another base URL
}
/**
* 
* The following APIWeather() function calls the API URL for weather only along with the city parameter.
* This function generates our API URL in the accepted format for the Open weather API.
*
**/
function APIWeather(city) {
	WeatherURL = baseURLWeather + city + API; // Create another base URL.
}


// Perform Callbacks for API URLs.
APIForcast("Fife");
APIWeather("New York");


/**
* 
* The following print() function calls the response and returns the JSON.
* Next, the JSON (objects) is printed using the Object.Keys() method.
*
**/
function print(objects) {
	Object.keys(objects).forEach(function(k) {
		console.log("Printed Forcast JSON objects associated with the following GET URL above : ");
		console.log(objects[k]);

		city = objects.name;
		lon = objects.coord.lon;
		lat = objects.coord.lat;
		country = objects.sys.country;
		city_weather = objects.weather[0].main;
		description = objects.weather[0].description;
		dateSubmit = objects.dt;
		

	});


}
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Add a new weather object by making POST request to node server
// weather = a new weather object from the getAPIResponse().
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
function sendWeather(weather){
    req = new XMLHttpRequest();
    req.open("POST", "weather");
    req.setRequestHeader("Content-Type", "text/plain");
    req.send('{"city":"'+city+'","lon":"'+lon+'","lat":"'+lat+'","country":"'+country+'","weather":"'+city_weather+'","description":"'+description+'","dateSubmit":"'+dateSubmit+'"}');
    req.onreadystatechange = function() {
        //console.log(req.responseText);
     	if (req.readyState == 4) {
     		console.log('sent weather!');  		
     	}
    }
    // req.send(weather);
}
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Retrieve ALL data by making an AJAX request. 
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
function getAPIResponse(url) {
    req = new XMLHttpRequest();
    req.open("GET", url);
    req.setRequestHeader("Content-Type", "text/plain");
    req.onreadystatechange = function() {
        // Call method and parse our response.
    	if (req.readyState == 4) {
    		print(JSON.parse(req.responseText));
    		// Call the sendWeather() method
			sendWeather(JSON.parse(req.responseText));
   		}
    }
    req.send(null);
}

// Call our getResponse(); method for a Forcast
//getAPIResponse(ForcastURL);
// Call our getResponse(); method for a Weather
getAPIResponse(WeatherURL);






}// END init();



