var dataPathWeather = WeatherURL;
console.log(dataPathWeather);
	
	var margin = {top: 20, right: 30, bottom: 30, left: 40},
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
		
	var weatherChart = d3.select(".weather_chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		

	d3.json(dataPathWeather, function(error, data){
	console.log(data);
	var weatherData = data;
	x.domain(weatherData.map(function(d) { return d.name + " (" + d.sys.country + ")" }));
	y.domain([0, d3.max(weatherData, function(d) { return d.main.temp + 5 })]);

	var barWidth = width / weatherData.length;

	var weatherBar = weatherChart.selectAll("g")
		.data(weatherData)
		.enter().append("g")
		.attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; })
		.on("mouseenter", function(d,i){
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
		})
		weatherChart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
		weatherChart.append("g")
		.attr("class", "y axis")
		.call(yAxis);
		weatherBar.append("rect")
		.attr("y", function(d) { return y(d.main.temp); })
		.attr("height", function(d) { return height - y(d.main.temp); })
		.attr("width", barWidth - 1)
		.attr("class", "dataBars")
		.style("fill", "steelblue")
		.on("mouseenter", function(d,i){
			d3.select(this)
			.transition()
			.duration(500)
			.style("fill", "silver")
		})
		.on("mouseout", function(d,i){
			d3.select(this)
			.transition()
			.duration(500)
			.style("fill", "steelblue")
		})
	})
	function type(d) {
	  d.main.temp = +d.main.temp; // coerce to number
	  return d;
	}
