const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../auth")

//Route for user registration
router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
})






module.exports = router;