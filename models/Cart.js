const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'ProductName is required']
    },
    userId: {
        type: String,
        required: [true, "User ID is required"]
    },
    productId: {
        type: String,
        required: [true, "Product ID is required"]
    },
    amount: {
        type: Number,
        default: 1
    },
    totalPrice: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model("Cart", cartSchema)