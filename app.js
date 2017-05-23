var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	User = require("./models/user"),
	Poll = require("./models/polls");

var app = express();
mongoose.connect("mongodb://localhost/votingapp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/pulic"));
app.use(methodOverride("_method"));

// configure passport ====================================================================
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

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

// require/link routes ========================================================================
var indexRoutes = require("./routes/index");
var pollRoutes = require("./routes/polls");


app.use(indexRoutes);
app.use(pollRoutes);

// start server =============================================================================
app.listen(3000, function() {
	console.log("start!");
});