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
