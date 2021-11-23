const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const auth = require("../auth")

/******************************************/
/************* Create Product *************/
/******************************************/
router.post("/", auth.verify, (req, res) => {

	const adminData = auth.decode(req.headers.authorization);

	productController.registerProduct(req.body, adminData).then(resultFromController => res.send(resultFromController));
})

/******************************************/
/****** Retrieving all active product *****/
/******************************************/
router.get("/all", (req, res) => {
	productController.getAllActive().then(resultFromController => res.send(resultFromController));
})

/******************************************/
/****** Retrieving a specific product *****/
/******************************************/
router.get("/:productId", (req,res) => {
	console.log(req.params.productId);
	productController.getProduct(req.params).then(resultFromController => res.send(resultFromController));
})

/******************************************/
/********* Update a product sample ********/
/******************************************/
router.put("/:productId", auth.verify, (req, res) => {

	const adminData = auth.decode(req.headers.authorization);

	productController.updateProduct(req.params, req.body, adminData).then(resultFromController => res.send(resultFromController));
})

module.exports = router;

/******************************************/
/*********** Archive a product ************/
/******************************************/
router.put("/:productId/archive", auth.verify, (req, res) => {

	const adminData = auth.decode(req.headers.authorization);

	productController.archiveProduct(req.params, adminData).then(resultFromController => res.send(resultFromController));
})

