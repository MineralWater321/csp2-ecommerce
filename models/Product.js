const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"]
	},
	description: {
		type: String,
		required: [true, "Description is requried"]
	},
	price: {
		type: Number,
		required: [true, "Price is requried"]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	}

})

module.exports = mongoose.model("Product", productSchema)