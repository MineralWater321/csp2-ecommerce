const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../auth")

/******************************************/
/**********User Registration***************/
/******************************************/
router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
})

/******************************************/
/***********User authentication************/
/******************************************/
router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
});

/******************************************/
/***********Setting user to admin**********/
/******************************************/
router.put("/:userId/admin", auth.verify, (req,res) => {

	const adminData = auth.decode(req.headers.authorization);

	userController.setAsAdmin(req.params, adminData).then(resultFromController => res.send(resultFromController));
})


/*********************************************/
/**** Alternative method to set user *********/
/** as admin using email instead of user id **/
/*********************************************/
/*
//Route for setting user as admin
router.put("/admin", auth.verify, (req,res) => {

	const adminData = auth.decode(req.headers.authorization);

	userController.setAdmin(req.body.email, adminData).then(resultFromController => res.send(resultFromController));
})
*/
///////////////////////////////////////////////////////

module.exports = router;