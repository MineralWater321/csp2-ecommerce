const Order = require("../models/Order");
const Product = require("../models/Product");
const auth = require("../auth");
const { findOneAndUpdate, findByIdAndUpdate } = require("../models/Order");

/*********************************************/
/************ Create an order ****************/
/*********************************************/
module.exports.addToCart = async (reqBody, adminData) => {
	let orderInfo = await Order.findOne({productId: reqBody.productId, userId: adminData.id}).then(result => {
				return result;
			})

	let productInfo = await Product.findById(reqBody.productId).then(result => {
				return result;
			})
	if (orderInfo){
		let updateAmount = {
			totalAmount: orderInfo.totalAmount + 1,
			totalPrice: orderInfo.totalPrice + productInfo.price
		}
		return Order.findByIdAndUpdate(orderInfo._id, updateAmount).then((product, error) => {
			if(error){
				return false;
			}
			else{
				return true;
			}
		})
	}
	//Checks if user is admin
	if(!adminData.isAdmin){
		//Checks if product is for sale
		if(productInfo.isActive){
			let newOrder = new Order({
				totalAmount: reqBody.quantity,
				totalPrice: reqBody.quantity*productInfo.price,
				userEmail: adminData.email,
				userId: adminData.id,
				productName: productInfo.name,
				productId: reqBody.productId,
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
			return(`notOnSale`)
		}
	}
	else{
		return (`noAdmin`);
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