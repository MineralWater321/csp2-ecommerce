// TODO:
// 1. Add to Cart
// 2. Add quantity
// 3. Subtract Quantity
// 4. Remove Item
// 5. Checkout

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const auth = require("../auth");
const { runOnChangeOnly } = require("nodemon/lib/config/defaults");

router.post("/:productId/addToCart", auth.verify, (req, res) => {

    const adminData = auth.decode(req.headers.authorization);

    cartController.addToCart(req.params, adminData).then(resultFromController => res.send(resultFromController));
})

router.get("/cartItems", auth.verify, (req, res) => {

    const adminData = auth.decode(req.headers.authorization);

    cartController.cartItems(adminData).then(resultFromController => res.send(resultFromController));
})

router.put("/addQuantity", auth.verify, (req, res) => {

    const adminData = auth.decode(req.headers.authorization);

    cartController.addQuantity(req.body, adminData).then(resultFromController => res.send(resultFromController));
})

router.put("/subtractQuantity", auth.verify, (req, res) => {

    const adminData = auth.decode(req.headers.authorization);

    cartController.subtractQuantity(req.body, adminData).then(resultFromController => res.send(resultFromController));
})

router.delete("/removeItem", auth.verify, (req, res) => {

    const adminData = auth.decode(req.headers.authorization);

    cartController.removeItem(req.body, adminData).then(resultFromController => res.send(resultFromController));
})

router.post("/checkOut", auth.verify, (req, res) => {

    const adminData = auth.decode(req.headers.authorization);

    cartController.checkOut(adminData).then(resultFromController => res.send(resultFromController));
})

router.get("/cartPrice", auth.verify, (req, res) => {

    const adminData = auth.decode(req.headers.authorization);

    cartController.cartPrice(adminData).then(resultFromController => res.send(resultFromController));
})
module.exports = router;