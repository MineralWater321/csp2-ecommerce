const Order = require("../models/Order");
const Product = require("../models/Product");
const auth = require("../auth");

/*********************************************/
/************ Create an order ****************/
/*********************************************/
module.exports.createOrder = async (reqBody, adminData) => {
	
	let productInfo = await Product.findById(reqBody.productId).then(result => {
				return result;
			})
	//Checks if user is admin
	if(!adminData.isAdmin){
		//Checks if product is for sale
		if(productInfo.isActive){
			let newOrder = new Order({
				totalAmount: reqBody.quantity*productInfo.price,
				userId: adminData.id,
				productId: reqBody.productId
			})
			return newOrder.save().then((user, error) => {
				if(error){
					return false;
				}
				else{
					return true;
				}
			})
		}
		else{
			return(`Product currently not on sale`)
		}
	}
	else{
		return (`Only non-Admin accounts can place orders`);
	}
}

/*********************************************/
/************* Retrieve all orders ***********/
/*********************************************/
module.exports.getAllOrders = async (adminData) => {
	if(adminData.isAdmin){
		return Order.find({}).then(result => {
			return result;
		})
	}
	else{
		return (`You have no Admin access`);
	}
}

/*********************************************/
/********* Retrieve all User's Orders*********/
/*********************************************/
module.exports.getMyOrders = async (adminData) => {
	if(!adminData.isAdmin){
		return Order.find({userId: adminData.id}).then(result => {
			return result;
		})
	}
	else{
		return (`Only non-Admin accounts can retrieve user orders`);
	}	
}