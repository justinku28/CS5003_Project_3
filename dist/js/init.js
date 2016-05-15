//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
// Begin init() which is called on load.
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
function init() {
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Open Weather Globals:
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
	// Username: ojd2
	// API: be0b44175983b4c5337b54cbf2356b9c

	// Returns the API json.

	// Prints the json objects.

	// http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=json&appid=be0b44175983b4c5337b54cbf2356b9c
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Some globals:
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
var city, lon, lat, country, overview, description, dateSubmit;
// ----------------------------------------------------------------------
// ---------------------------------------------------------------------- 
// Var Base URL for forecast only. The following variable will store our base URL for all API calls.
// You can search weather forecast for 5 days with data every 3 hours by city name. 
// All weather data can be obtained in JSON, XML or HTML format. 
// Parameters:
// @q="city_name" and "country_code" divided by comma, use ISO 3166 country codes.
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
var baseURLForcast = "http://api.openweathermap.org/data/2.5/forecast?q=";
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Var Base URL for weather only. The following variable will store our base URL for all API calls.
// You can search weather forecast for 5 days with data every 3 hours by city name. 
// All weather data can be obtained in JSON, XML or HTML format. 
// Parameters:
// See the following URL for parameter details under weather: http://openweathermap.org/forecast5
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
var baseURLWeather = "http://api.openweathermap.org/data/2.5/weather?q=";
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Var API key. This will be concatenated onto the end of our callback string. 
// Currently, the following API is from Ollie's account: ojd2.
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
var API = "&appid=" + "be0b44175983b4c5337b54cbf2356b9c";
// var ForcastURL, WeatherURL;
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// The following apiForcast() function calls the API URL for forcast only along with the city parameter.
// This function generates our API URL in the accepted format for the Open weather API.
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
function APIForcast(city) {
	ForcastURL = baseURLForcast + city + API; // Create another base URL
    weatherGraphForecast(ForcastURL);
}
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// The following APIWeather() function calls the API URL for weather only along with the city parameter.
// This function generates our API URL in the accepted format for the Open weather API.
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
function APIWeather(city) {
	WeatherURL = baseURLWeather + city + API; // Create another base URL.
}
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Retrieve input data for user destination from input element
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
var btn = document.getElementById("getDestination");
btn.onclick = function() { 
    input = $('.destination').val().toLowerCase().toString();
    if (input === '') {
        $('#basic-addon1').css({'background': '#a94442', 'border': '#a94442 1px solid', 'color': 'white'}).html('Please enter a city:');
        $('.destination').css({'border': '#a94442 1px solid'});
    } else if (input === input) {
    // Clear
    $('#introduction-meta').empty();
    $('#graph-1-meta').empty();
    $('#basic-addon1').css({'background': '#eee', 'border': '#ccc 1px solid', 'color': '#555'}).html('Generating Results:');
    $('.destination').css({'border': '#ccc 1px solid'});
    // Update charts
    APIForcast(input);
    APIWeather(input);
    getAPIResponse(WeatherURL);
    //getAPIResponse(ForcastURL);
    $('#introduction-meta h1').fadeOut(1000);
    $('#introduction-meta h1').fadeIn(2000)
    $("#graph-1 .container").fadeOut(1200);
    $("#graph-1 .container").fadeIn(1200);
    $("#graph-2 .container").fadeOut(1700);
    $("#graph-2 .container").fadeIn(2100);
    $("#graph-map .container").fadeOut(2300);
    $("#graph-map .container").fadeIn(2300);
    $("#map-canvas").fadeOut(1300);
    $("#map-canvas").fadeIn(1300);

    // Clear map-canvas HTML and call Map again.
    console.log(latitude, longitude);
    function initMap() {
        var mapOptions = {
          zoom: 6,
          center: new google.maps.LatLng(latitude, longitude)
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        // Add interaction listeners to make weather requests
        google.maps.event.addListener(map, 'idle', checkIfDataRequested);
        // Sets up and populates the info window with details
        map.data.addListener('click', function(event) {
          infowindow.setContent(
           "<img src=" + event.feature.getProperty("icon") + ">"
           + "<br /><strong>" + event.feature.getProperty("city") + "</strong>"
           + "<br />" + event.feature.getProperty("temperature") + "&deg;C"
           + "<br />" + event.feature.getProperty("weather")
           );
          infowindow.setOptions({
              position:{
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
              },
              pixelOffset: {
                width: 0,
                height: -15
              }
            });
          infowindow.open(map);
        });
    }
    initMap();
    // Call the Google Map API function for the chosen Longitude and Latitude.
    //google.maps.event.addDomListener(btn, 'click', initMap);
    }
 }; 
 // Perform Default Callbacks for API URLs on page Load.
APIForcast("New York");
APIWeather("New York");
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// The following print() function calls the response and returns the JSON.
// Next, the JSON (objects) is printed using the Object.Keys() method.
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
function assignWeather(objects) {
	Object.keys(objects).forEach(function(k) {
		console.log("Printed Weather JSON objects associated with the following GET URL above : ");
		console.log(objects[k]);
        // Assign objects to global variables.
		city = objects.name;
		longitude = objects.coord.lon;
		latitude = objects.coord.lat;
		country = objects.sys.country;
		overview = objects.weather[0].main;
		description = objects.weather[0].description;
		dateSubmit = objects.dt;
        tempMax = objects.main.temp_max;
        tempMin = objects.main.temp_min;
        airPressure = objects.main.pressure;
        humidity = objects.main.humidity;
        windSpeed = objects.wind.speed; 
	});
}
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// The following displayWeatherMeta() function calls the response 
// as a result, appends the objects.key to the HTML for certain HTML areas.
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
function displayWeatherMeta(objects) {
		// Append the title of the city to the introduction area in the HTML.
        var title = document.createElement("h1");
        var intro = document.createTextNode("The following weather report is for " + city);
        title.appendChild(intro);
        // Assign the DOM created elements to the HTML area.
        var element = document.getElementById("introduction-meta");
        element.appendChild(title);

        // Append the more weather information from the collected data to the first graph
        $("#graph-1-meta").append("<h2>Forecast Meta Information:</h2><br>");
        $("#graph-1-meta").append("<p><span style='color:#e4bfb0;'>Maximum Temperature:</span> " + tempMax + "</p>");
        $("#graph-1-meta").append("<p><span style='color:#F7E6CB;'>Minimum Temperature:</span> " + tempMin + "</p>");
        $("#graph-1-meta").append("<p><span style='color:#BFA169;'>Air Pressure:</span> " + airPressure + "</p>");
        $("#graph-1-meta").append("<p><span style='color:#fdbe6a;'>Humidity:</span> " + humidity + "</p>");
        $("#graph-1-meta").append("<p><span style='color:#CAACBC;'>Wind Speed:</span> " + windSpeed + " m/s</p>");
        $("#graph-1-meta").append("<p><span style='color:#D1BFB0;'>Longitude:</span> " + longitude + "</p>");
        $("#graph-1-meta").append("<p><span style='color:#F2EFBD;'>Latitude:</span> " + latitude + "</p>");

        // Append the more weather information from the collected data.
        var info = document.createElement("p");
        info.className = "weather-meta-desc";
        var desc = document.createTextNode("Seems like today's weather is " + description + "!");
        info.appendChild(desc);
        // Assign the DOM created elements to the HTML area.
        var metaDesc = document.getElementById("graph-1-meta");
        metaDesc.appendChild(info);
}
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Fetch the weather data for the particular City that has been called.
// Then push the weather from couchDB into displayWeatherMeta().
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
function getHistory(weather){
   req = new XMLHttpRequest();
    req.open("GET", "weather");
    req.setRequestHeader("Content-Type", "text/plain");    
    req.onreadystatechange = function() {
  		if (req.readyState == 4) {
  			displayWeatherMeta(JSON.parse(req.responseText));
  		}
    }
    req.send(null);
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Add a new weather object by making POST request to couchdb server
// weather = a new weather object from the getAPIResponse().
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
function sendWeather(weather){
    req = new XMLHttpRequest();
    req.open("POST", "weather");
    req.setRequestHeader("Content-Type", "text/plain");
    req.send('{"city":"'+city+'","lon":"'+longitude+'","lat":"'+latitude+'","country":"'+country+'","overview":"'+overview
        +'","description":"'+description+'","dateSubmit":"'+dateSubmit+'","tempMax":"'+tempMax+'","tempMin":"'+tempMin
        +'","airPressure":"'+airPressure+'","windSpeed":"'+windSpeed+'","humidity":"'+humidity+'"}');
    req.onreadystatechange = function() {
        //console.log(req.responseText);
     	if (req.readyState == 4) {
     		console.log('Sent weather objects for: City: ' + city + ", Description: " + overview);
     		// Call fetchTemp
     		getHistory();	
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
    		console.log('Print the following GET URL:' + url);
            assignWeather(JSON.parse(req.responseText));

    		// Call the sendWeather() method
			sendWeather(JSON.parse(req.responseText));
   		}
    }
    req.send(null);
}

// Call our getResponse(); method for a Forecast
//getAPIResponse(ForcastURL);
// Call our getResponse(); method for a Weather
getAPIResponse(WeatherURL);

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Generate Google Maps API / OpenWeather Maps API.
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
    var map;
    var geoJSON;
    var request;
    var gettingData = false;
    var openWeatherMapKey = "be0b44175983b4c5337b54cbf2356b9c"
    function mapInitialize() {
        var mapOptions = {
          zoom: 6,
          center: new google.maps.LatLng(latitude, longitude)
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        // Add interaction listeners to make weather requests
        google.maps.event.addListener(map, 'idle', checkIfDataRequested);
        // Sets up and populates the info window with details
        map.data.addListener('click', function(event) {
          infowindow.setContent(
           "<img src=" + event.feature.getProperty("icon") + ">"
           + "<br /><strong>" + event.feature.getProperty("city") + "</strong>"
           + "<br />" + event.feature.getProperty("temperature") + "&deg;C"
           + "<br />" + event.feature.getProperty("weather")
           );
          infowindow.setOptions({
              position:{
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
              },
              pixelOffset: {
                width: 0,
                height: -15
              }
            });
          infowindow.open(map);
        });
      }
      var checkIfDataRequested = function() {
        // Stop extra requests being sent
        while (gettingData === true) {
          request.abort();
          gettingData = false;
        }
        getCoords();
      };
      // Get the coordinates from the Map bounds
      var getCoords = function() {
        var bounds = map.getBounds();
        var NE = bounds.getNorthEast();
        var SW = bounds.getSouthWest();
        getWeather(NE.lat(), NE.lng(), SW.lat(), SW.lng());
      };
      // Make the weather request
      var getWeather = function(northLat, eastLng, southLat, westLng) {
        gettingData = true;
        var requestString = "http://api.openweathermap.org/data/2.5/box/city?bbox="
                            + westLng + "," + northLat + "," //left top
                            + eastLng + "," + southLat + "," //right bottom
                            + map.getZoom()
                            + "&cluster=yes&format=json"
                            + "&APPID=" + openWeatherMapKey;
        request = new XMLHttpRequest();
        request.onload = proccessResults;
        request.open("get", requestString, true);
        request.send();
      };
      // Take the JSON results and proccess them
      var proccessResults = function() {
        console.log(this);
        var results = JSON.parse(this.responseText);
        if (results.list.length > 0) {
            resetData();
            for (var i = 0; i < results.list.length; i++) {
              geoJSON.features.push(jsonToGeoJson(results.list[i]));
            }
            drawIcons(geoJSON);
        }
      };
      var infowindow = new google.maps.InfoWindow();
      // For each result that comes back, convert the data to geoJSON
      var jsonToGeoJson = function (weatherItem) {
        var feature = {
          type: "Feature",
          properties: {
            city: weatherItem.name,
            weather: weatherItem.weather[0].main,
            temperature: weatherItem.main.temp,
            min: weatherItem.main.temp_min,
            max: weatherItem.main.temp_max,
            humidity: weatherItem.main.humidity,
            pressure: weatherItem.main.pressure,
            windSpeed: weatherItem.wind.speed,
            windDegrees: weatherItem.wind.deg,
            windGust: weatherItem.wind.gust,
            icon: "http://openweathermap.org/img/w/"
                  + weatherItem.weather[0].icon  + ".png",
            coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
          },
          geometry: {
            type: "Point",
            coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
          }
        };
        // Set the custom marker icon
        map.data.setStyle(function(feature) {
          return {
            icon: {
              url: feature.getProperty('icon'),
              anchor: new google.maps.Point(25, 25)
            }
          };
        });
        // returns object
        return feature;
      };
      // Add the markers to the map
      var drawIcons = function (weather) {
         map.data.addGeoJson(geoJSON);
         // Set the flag to finished
         gettingData = false;
      };
      // Clear data layer and geoJSON
      var resetData = function () {
        geoJSON = {
          type: "FeatureCollection",
          features: []
        };
        map.data.forEach(function(feature) {
          map.data.remove(feature);
        });
    };
    google.maps.event.addDomListener(window, 'load', mapInitialize);
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Generate Graph 1
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
function weatherGraphForecast(ForcastURL) {
    var dataPathForecast = ForcastURL;
    console.log('visual called for : ' + dataPathForecast);
    
    var margin = {top: 20, right: 30, bottom: 120, left: 40},
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var width = 500,
        height = 300;
        
    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
    
    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
        
    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        var weatherTooltip = "<center>"
        weatherTooltip += '<strong class="dateTimeTitle">' + "Date: " + d.dt_txt.toString().slice(0,11) + '<span style="color:#333;">@</span>' + '<span style="color:#324D5C;"> ' + d.dt_txt.toString().slice(11,16) + '</span>' + "</strong><br>"
        if(d.weather[0].main === "Clear"){
                weatherTooltip += "<img src='http://openweathermap.org/img/w/01d.png' class='icons'><br>"
            } else if (d.weather[0].main === "Rain"){
                weatherTooltip += "<img src='http://openweathermap.org/img/w/10d.png' class='icons'><br>"
            } else if (d.weather[0].main === "Rain" & d.weather[0].description === "shower rain"){
                weatherTooltip += "<img src='http://openweathermap.org/img/w/09d.png' class='icons'><br>"
            } else if (d.weather[0].main === "Clouds" & d.weather[0].description === "scattered clouds"){
                weatherTooltip += "<img src='http://openweathermap.org/img/w/03d.png' class='icons'><br>"
            } else if (d.weather[0].main === "Clouds" & d.weather[0].description === "few clouds"){
                weatherTooltip += "<img src='http://openweathermap.org/img/w/03d.png' class='icons'><br>"
            } else if (d.weather[0].main === "Clouds" & d.weather[0].description === "broken clouds"){
                weatherTooltip += "<img src='http://openweathermap.org/img/w/04d.png' class='icons'><br>"
            } else if (d.weather[0].main === "Clouds" & d.weather[0].description === "overcast clouds"){
                weatherTooltip += "<img src='http://openweathermap.org/img/w/04d.png' class='icons'><br>"
            } else if (d.weather[0].main === "Snow"){
                weatherTooltip += "<img src='http://openweathermap.org/img/w/13d.png' class='icons'><br>"
            } else if (d.weather[0].main === "Mist"){
                weatherTooltip += "<img src='http://openweathermap.org/img/w/50d.png' class='icons'><br>"
            } else {
                weatherTooltip += d.weather[0].main + " - "
            }
        weatherTooltip += '<strong class="weatherTitle"> Weather:</strong> ' + d.weather[0].description.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + "</strong><br>"   
        //weatherTooltip += "<span style='color:red'>" + d.weather[0].description + "</span><br>"
        weatherTooltip += '<strong class="tempTitle">Temperature:</strong> <span style="color:#6c6596">' + d.main.temp + " °C" + "</span><br>"
        if(d.weather[0].main === "Rain"){
            weatherTooltip += '<strong class="precepTitle">Precipitation:</strong> <span style="color:#6c6596">' + d.rain['3h'] + " mm" + "</span><br>"
        } else {
            weatherTooltip
        }
        weatherTooltip += '<strong class="windTitle">Wind Speed:</strong> <span style="color:#6c6596">' + "<img src='img/pic/arrow.png' style='width:15px;height:15px;transform: rotate(" + d.wind.deg + "deg)'> " + d.wind.speed + " m/s" + "</span><br>"
        weatherTooltip += "</center>"
        
        return  weatherTooltip ;
    })
    
    var forecastChart = d3.select(".forecast_chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    forecastChart.call(tip);
        
    d3.json(dataPathForecast, function(error, data){
    console.log(data);
    var forecastData = data;
    var weatherForecast = data.list
    console.log(weatherForecast)
    x.domain(weatherForecast.map(function(d) { return d.dt_txt.toString().slice(0, 11)}));
    y.domain([0, d3.max(weatherForecast, function(d) { return d.main.temp + 5 })]);

    var barWidth = width / weatherForecast.length;

    var forecastBar = forecastChart.selectAll("g")
        .data(weatherForecast)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        
        forecastChart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("d", ".5em")
        .attr("transform", "rotate(60)")
        .style("text-anchor", "start")

        forecastChart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

        forecastBar.append("rect")
        .attr("y", function(d) { return y(d.main.temp); })
        .attr("height", function(d) { return height - y(d.main.temp); })
        .attr("width", barWidth - 1)
        .attr("class", "dataBars")
        .style("fill", function(d) {
            if (d.weather[0].main == "Thunderstorm") {return "#3B3F45"}
            if (d.weather[0].main == "Rain") {return "#75766D"}
            if (d.weather[0].main == "Drizzle") {return "#ADA190"}
            if (d.weather[0].main == "Snow") {return "#FFFFFF"}
            if (d.weather[0].main == "Atmosphere") {return "#F7E6CB"}
            if (d.weather[0].main == "Clouds" & d.weather[0].description != "sky is clear") {return "#E4BFB0"}
            if (d.weather[0].main == "Extreme") {return "#CAACBC"}
            if (d.weather[0].main == "Clear") {return "#F2F2F2"}
        })
        .style("stroke", "#23293f")
        .on("mouseenter", function(d,i){
            d3.select(this)
            .transition()
            .duration(250)
            .style("stroke", "#fdbe6a")
            .style("fill", "#fdbe6a")
        })
        .on("mouseout", function(d,i){
            d3.select(this)
            .transition()
            .duration(250)
            .style("stroke", "#23293f")
            .style("fill", function(d) {
                if (d.weather[0].main == "Thunderstorm") {return "#3B3F45"}
                if (d.weather[0].main == "Rain") {return "#75766D"}
                if (d.weather[0].main == "Drizzle") {return "#ADA190"}
                if (d.weather[0].main == "Snow") {return "#FFFFFF"}
                if (d.weather[0].main == "Atmosphere") {return "#F7E6CB"}
                if (d.weather[0].main == "Clouds" & d.weather[0].description != "sky is clear") {return "#E4BFB0"}
                if (d.weather[0].main == "Extreme") {return "#CAACBC"}
                if (d.weather[0].main == "Clear") {return "#F2F2F2"}
            })
        })
    })
    function type(d) {
      d.main.temp = +d.main.temp; // coerce to number
      return d;
    }
}



} // End init();



