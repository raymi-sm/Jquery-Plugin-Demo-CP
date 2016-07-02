var express = require("express");
var web = express();
var port = process.env.BASKET_APP_PORT;
var path = require('path');
var app;

app = web.listen(port, function(){
	console.log("server up on port: " + port);
});

web.get("/", function(req, res){
	res.sendFile( __dirname + "/public/index.html");
});

web.use(express.static(path.join(__dirname, "public")));
