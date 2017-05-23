var express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user");

router.get("/", function(req, res) {
	res.render("landingpage");
});

router.get("/register", function(req, res) {
	res.render("register");
});

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

module.exports = router;