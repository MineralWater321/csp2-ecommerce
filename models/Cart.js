const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
    }
})

module.exports = mongoose.model("Cart", cartSchema)