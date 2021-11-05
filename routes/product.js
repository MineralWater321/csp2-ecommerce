const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const auth = require("../auth")

///////////////////////////////////////////
//Route for creating a product
router.post("/", auth.verify, (req, res) => {

	const adminData = auth.decode(req.headers.authorization);

	productController.registerProduct(req.body, adminData).then(resultFromController => res.send(resultFromController));
})
///////////////////////////////////////////
//Route for all active products
router.get("/", (req, res) => {
	productController.getAllActive().then(resultFromController => res.send(resultFromController));
})
///////////////////////////////////////////
//Route for retrieving a single product
router.get("/:productId", (req,res) => {
	console.log(req.params.productId);
	productController.getProduct(req.params).then(resultFromController => res.send(resultFromController));
})
///////////////////////////////////////////
//Update Product Info
router.put("/:productId", auth.verify, (req, res) => {

	const adminData = auth.decode(req.headers.authorization);

	productController.updateProduct(req.params, adminData, req.body).then(resultFromController => res.send(resultFromController));
})

module.exports = router;

///////////////////////////////////////////
//Archive a Product
router.put("/:productId/archive", auth.verify, (req, res) => {

	const adminData = auth.decode(req.headers.authorization);

	productController.updateProduct(req.params, adminData).then(resultFromController => res.send(resultFromController));
})

module.exports = router;

///////////////////////////////////////////