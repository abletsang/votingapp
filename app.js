var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override");

var app = express();
mongoose.connect("mongodb://localhost/votingapp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/pulic"));
app.use(methodOverride("_method"));

// require/link routes ========================================================================
var indexRoutes = require("./routes/index");


app.use(indexRoutes);

// start server =============================================================================
app.listen(3000, function() {
	console.log("start!");
});