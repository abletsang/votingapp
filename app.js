var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	passportLocalMongoose = require("passport-local-mongoose"),// ??? wasn't in yelpcamp app.js
	User = require("./models/user"),
	Poll = require("./models/polls");

// require routes ========================================================================
var indexRoutes = require("./routes/index");
var pollRoutes = require("./routes/polls");

// use packages and database ===========================================================

mongoose.connect("mongodb://localhost/votingapp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/pulic"));
app.use(methodOverride("_method"));

// configure passport ====================================================================
app.use(require("express-session")({
	secret: "This is my first backend project!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

// linking to routes ====================================================================
app.use(indexRoutes);
app.use(pollRoutes);

// start server =============================================================================
app.listen(3000, function() {
	console.log("start!");
});