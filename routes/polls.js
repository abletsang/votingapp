var express = require("express"),
	router = express.Router(),
	Poll = require("../models/polls");

// index route for polls ================================================================
router.get("/polls", function(req, res) {
	Poll.find({}, function(err, polls) {
		if (err) {
			console.log(err);
		} else {
			res.render("polls/polls", {polls: polls});
		}
	});
	
});

// form to create new poll ================================================================
router.get("/polls/new", function(req, res) {
	// res.send("new polls");
	res.render("polls/new");
});

// create new poll ================================================================
router.post("/polls", function(req, res) {
	// req.body.poll.creator = {
	// 	id: req.user._id,
	// 	username: req.user.username
	// };
	var newPoll = {
		name: req.body.name,
		options: req.body.options
	};
	Poll.create(newPoll, function(err, polls) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("polls");
		}
	})
	// var newPoll = {req.body.poll};
	// console.log(req.body.poll);
	
});
// show route ================================================================
// edit poll route ================================================================
// update poll route ================================================================
// delete poll route ================================================================


module.exports = router;