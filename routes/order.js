const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const auth = require("../auth")

/*********************************************/
/************ Create an order ****************/
/*********************************************/
router.post("/addToCart", auth.verify, (req, res) => {
	
	const adminData = auth.decode(req.headers.authorization);

	orderController.addToCart(req.body, adminData).then(resultFromController => res.send(resultFromController));
})

/*********************************************/
/************ Update an order ****************/
/*********************************************/
router.post("/updateOrder", auth.verify, (req,res) => {

	const adminData = auth.decode(req.headers.authorization);

	orderController.updateOrder(req.body, adminData).then(resultFromController => res.send(resultFromController));
})
/*********************************************/
/************* Retrieve all orders ***********/
/*********************************************/
router.get("/orders", auth.verify, (req, res) => {
	
	const adminData = auth.decode(req.headers.authorization);

	orderController.getAllOrders(adminData).then(resultFromController => res.send(resultFromController));
})

/*********************************************/
/********* Retrieve all User's Orders*********/
/*********************************************/
router.get("/myOrders", auth.verify, (req, res) => {
	const adminData = auth.decode(req.headers.authorization);

	orderController.getMyOrders(adminData).then(resultFromController => res.send(resultFromController));
})


module.exports = router;