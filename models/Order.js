const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	// totalAmount: {
	// 	type: Number,
	// 	required: [true, "Total Amount is required"]
	// },
	purchasedOn: {
		type: Date,
		default: new Date()
	},
	userId: {
		type: String,
		required: [true, "User ID is requried"]
	},
	orderList: {
		type: Array,
		required: [true, "Product ID is required"]
	}
})

module.exports = mongoose.model("Order", orderSchema)