const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
	const apiKey = "00b74452d77dc6f0a35173b5535c8438";
	const city = req.body.city;
	const url =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		city +
		"&appid=00b74452d77dc6f0a35173b5535c8438&units=metric";
	https.get(url, function(response) {
		response.on("data", function(data) {
			var parsedData = JSON.parse(data);
			res.send(
				"<h1>The temperature in" + city + "is " + parsedData.main.temp + "</h1>"
			);
		});
	});
});
app.listen(3000, function() {
	console.log("Server is up and running on 3000 port");
});
