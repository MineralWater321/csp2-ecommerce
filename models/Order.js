const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	totalAmount: {
		type: Number,
		required: [true, "Total Amount is required"]
	},
	totalPrice: {
		type: Number,
		required: [true, "Total Amount is required"]
	},
	purchasedOn: {
		type: Date,
		default: new Date()
	},
	userEmail: {
		type: String,
		required: [true, "User ID is requried"]
	},
	userId: {
		type: String,
		required: [true, "User ID is requried"]
	},
	productName: {
		type: String,
		required: [true, "Product ID is required"]
	},
	productId: {
		type: String,
		required: [true, "Product ID is required"]
	},
	isCheckOut: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("Order", orderSchema)