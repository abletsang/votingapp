var express = require("express"),
	router = express.Router();

// index route for polls ================================================================
router.get("/polls", function(req, res) {
	res.render("polls/polls");
});

// form to create new poll ================================================================
router.get("/polls/new", function(req, res) {
	// res.send("new polls");
	res.render("polls/new");
});

// create new poll ================================================================
router.post("/polls", function(req, res) {
	res.redirect("polls");
});
// show route ================================================================
// edit poll route ================================================================
// update poll route ================================================================
// delete poll route ================================================================


module.exports = router;