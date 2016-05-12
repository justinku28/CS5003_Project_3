var dataPath = "data/forecast.json";
	
	var margin = {top: 60, right: 30, bottom: 120, left: 80},
		width = 1000 - margin.left - margin.right,
		height = 300 - margin.top - margin.bottom;

	var width = 1000,
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
		if(d.weather[0].main === "Clear"){
				weatherTooltip += "<img src='http://openweathermap.org/img/w/01d.png' class='icons'><br>"
			} else if (d.weather[0].main === "Rain"){
				weatherTooltip += "<img src='http://openweathermap.org/img/w/10d.png' class='icons'><br>"
			} else if (d.weather[0].main === "Rain" & d.weather[0].description === "shower rain"){
				weatherTooltip += "<img src='http://openweathermap.org/img/w/09d.png' class='icons'><br>"
			} else if (d.weather[0].main === "Clouds" & d.weather[0].description === "scattered clouds"){
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
		weatherTooltip += "<strong>" + d.weather[0].description + "</strong><br>" 	
		//weatherTooltip += "<span style='color:red'>" + d.weather[0].description + "</span><br>"
		weatherTooltip += "<strong>Temperature:</strong> <span style='color:blue'>" + d.main.temp + " °C" + "</span><br>"
		if(d.weather[0].main === "Rain"){
			weatherTooltip += "<strong>Precipitation:</strong> <span style='color:blue'>" + d.rain['3h'] + " mm" + "</span><br>"
		} else {
			weatherTooltip
		}
		weatherTooltip += "<strong>Wind Speed:</strong> <span style='color:blue'>" + "<img src='pic/arrow.png' style='width:15px;height:15px;transform: rotate(" + d.wind.deg + "deg)'> " + d.wind.speed + " m/s" + "</span><br>"
		weatherTooltip += "</center>"
		
		return  weatherTooltip ;
	})
	
	var chart = d3.select(".chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	chart.call(tip);
		
	d3.json(dataPath, function(error, data){
	console.log(data);
	var myData = data;
	var cityName = myData.city.name
	var weatherForecast = data.list
	console.log(weatherForecast)
	x.domain(weatherForecast.map(function(d) { return d.dt_txt}));
	y.domain([0, d3.max(weatherForecast, function(d) { return d.main.temp + 5 })]);

	var barWidth = width / weatherForecast.length;

	var bar = chart.selectAll("g")
		.data(weatherForecast)
		.enter().append("g")
		.attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; })
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)
		/*.on("mouseenter", function(d,i){
			d3.select(this)
			.append("text")
			.attr("x", barWidth / 2)
			.attr("y", function(d) { return y(d.main.temp) + 3; })
			.attr("dy", ".75em")
			.attr("class", "tempToolTip")
			.text(function(d) { return d.main.temp + " °C" })
		})
		.on("mouseout", function(d,i){
			d3.selectAll(".tempToolTip")
			.remove()
		})*/
		
		d3.select(".chart")
		.append("text")
		.attr("text-anchor", "start")
		.attr("y", 30)
		.attr("x", 250)
		.text(function(d) { return cityName + " weather forecast"})
		.style("font-size", 26)
		
		chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
		.attr("y", 0)
		.attr("x", 9)
		.attr("dy", ".35em")
		.attr("transform", "rotate(60)")
		.style("text-anchor", "start")

		chart.append("g")
		.attr("class", "y axis")
		.call(yAxis);

		bar.append("rect")
		.attr("y", function(d) { return y(d.main.temp); })
		.attr("height", function(d) { return height - y(d.main.temp); })
		.attr("width", barWidth - 1)
		.attr("class", "dataBars")
		.style("fill", function(d) {
			if (d.weather[0].main == "Thunderstorm") {return "DimGrey"}
			if (d.weather[0].main == "Rain") {return "#AAAAAA"}
			if (d.weather[0].main == "Drizzle") {return "Silver"}
			if (d.weather[0].main == "Snow") {return "Snow"}
			if (d.weather[0].main == "Atmosphere") {return "WhiteSmoke"}
			if (d.weather[0].main == "Clouds" & d.weather[0].description != "sky is clear") {return "Gainsboro"}
			if (d.weather[0].main == "Extreme") {return "Tomato"}
			if (d.weather[0].main == "Clear") {return "SkyBlue"}
		})
		.style("stroke", "#222222")
		.on("mouseenter", function(d,i){
			d3.select(this)
			.transition()
			.duration(250)
			.style("stroke", "silver")
		})
		.on("mouseout", function(d,i){
			d3.select(this)
			.transition()
			.duration(250)
			.style("stroke", "#222222")
		})
	})

		/*bar.append("text")
		.attr("x", barWidth / 2)
		.attr("y", function(d) { return y(d.main.temp) + 3; })
		.attr("dy", ".75em")
		.text(function(d) { return d.main.temp; });
	//});*/

	function type(d) {
	  d.main.temp = +d.main.temp; // coerce to number
	  return d;
	}