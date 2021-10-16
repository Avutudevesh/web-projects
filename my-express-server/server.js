const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
	console.log(req.body);
	res.send("thanks for posting");
});

app.post("/bmiCalculator", function(req, res) {
	var height = Number(req.body.height);
	var weight = Number(req.body.weight);
	res.send("Your BMI is " + weight / (height * height));
});

app.get("/bmiCalculator", function(req, res) {
	res.sendFile(__dirname + "/bmiCalculator.html");
});
app.listen(3000, function() {
	console.log("Server Started on port 3000");
});
