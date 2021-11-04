const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	totalAmount: {
		type: Number,
		required: [true, "Total Amount is required"]
	},
	purchasedOn: {
		type: Date,
		default: new Date()
	},
	userId: {
		type: String,
		required: [true, "Product ID is requried"]
	}
	productId: {
		type: String,
		required: [true, "Product ID is required"]
	}
})

module.exports = mongoose.model("Order", orderSchema)