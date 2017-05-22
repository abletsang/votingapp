var express = require("express"),
	router = express.Router(),
	passport = require("passport");

console.log("index.js");

router.get("/", function(req, res) {
	res.render("landingpage");
});

router.get("/register", function(req, res) {
	res.render("register");
});

module.exports = router;