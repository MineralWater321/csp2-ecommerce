const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../auth")

/******************************************/
/*********Duplicate email test*************/
/******************************************/
router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});


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
/************Get user to details***********/
/******************************************/
router.get("/details", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);
	// Provides the user's ID for the getProfile controller method
	userController.getProfile({userId : userData.id}).then(resultFromController => res.send(resultFromController));
});

/******************************************/
/***********Setting user to admin**********/
/******************************************/
router.put("/:userId/admin", auth.verify, (req,res) => {

	const adminData = auth.decode(req.headers.authorization);

	userController.setAsAdmin(req.params, adminData).then(resultFromController => res.send(resultFromController));
})

/******************************************/
/************ Retrieve all users **********/
/******************************************/
router.get("/all", auth.verify, (req, res) => {

	const adminData = auth.decode(req.headers.authorization);

	userController.getAllUsers(adminData).then(resultFromController => res.send(resultFromController));
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







module.exports = router;