var express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user"),
	Poll = require("../models/polls");

// root route ======================================================================
router.get("/", function(req, res) {
	res.render("landingpage");
});

// register new user form ===========================================================
router.get("/register", function(req, res) {
	res.render("register");
});


// register new user ===============================================================
router.post("/register", function(req, res) {
	User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/");
		});
	});
});

// log in form =====================================================================
router.get("/login", function(req, res) {
	res.render("login");
});

// log in post request =============================================================
router.post("/login", passport.authenticate("local", {
	successRedirect: "/polls",
	failureRedirect: "/login"
	}), function(req, res) {
});

// log out =========================================================================
router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

module.exports = router;