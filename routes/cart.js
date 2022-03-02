// TODO:
// 1. Add to Cart
// 2. Add quantity
// 3. Subtract Quantity
// 4. Remove Item
// 5. Checkout

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const auth = require("../auth")

router.post("/:productId/addToCart", auth.verify, (req, res) => {

    const adminData = auth.decode(req.headers.authorization);

    cartController.addToCart(req.params, adminData).then(resultFromController => res.send(resultFromController));
})

router.post("/addQuantity", auth.verify, (req, res) => {

    const adminData = auth.decode(req.headers.authorization);

    cartController.addQuantity(req.body, adminData).then(resultFromController => res.send(resultFromController));
})


module.exports = router;