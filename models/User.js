const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is required"]
	},
	password: {
		type: String,
		required: [true, "Password is requried"]
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("User", userSchema)