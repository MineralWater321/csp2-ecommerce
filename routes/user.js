const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../auth")

//Route for user registration
router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
})

//Route for authenticating user
router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
});

//Route for setting user as admin
router.put("/:userId/admin", auth.verify, (req,res) => {

	const adminData = auth.decode(req.headers.authorization);

	userController.setAsAdmin(req.params, adminData).then(resultFromController => res.send(resultFromController));
})


//////////////////////////////////////////////////////
//Alternative method to set user as admin. Using email provided in body to indicate which user instead of param
/*
//Route for setting user as admin
router.put("/admin", auth.verify, (req,res) => {

	const adminData = auth.decode(req.headers.authorization);

	userController.setAdmin(req.body.email, adminData).then(resultFromController => res.send(resultFromController));
})
*/
///////////////////////////////////////////////////////

module.exports = router;