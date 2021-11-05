const Product = require("../models/Product");
const auth = require("../auth");

//////////////////////////////////////////////
//Create Product
module.exports.registerProduct = async (reqBody, adminData) => {
	if(adminData.isAdmin){
		let newProduct = new Product({
				name: reqBody.name,
				description: reqBody.description,
				price: reqBody.price
			});

		return newProduct.save().then((product, error) => {
			if(error){
				return false;
			}
			else{
				return true;
			}
		})
	}
	else{
		return(`You have no admin access`);
	}
}

///////////////////////////////////////////////
//Retrieving all active product
module.exports.getAllActive = () => {
	return Product.find({isActive: true}).then(result => {
		return result;
	})
}

////////////////////////////////////////////////
//Retrieving a specific product
module.exports.getProduct = (reqParams) => {
	return Product.findById(reqParams.productId).then(result => {
		return result;
	})
}
//////////////////////////////////////////////////
//Update a product sample
module.exports.updateProduct = async (reqParams, adminData, reqBody) => {

	if(adminData.isAdmin){

		let updatedProduct = {
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price,
			isActive: reqBody.isActive
		}

		return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((product, error) => {
			if(error){
				return false;
			}
			else{
				return true;
			}
		})
	}
	else{
		return(`You have no admin access`)
	}

}

//////////////////////////////////////////////////
//Archive a product
module.exports.updateProduct = async (reqParams, adminData) => {

	if(adminData.isAdmin){
		return Product.findByIdAndUpdate(reqParams.productId, {isActive: false}).then((product, error) => {
			if(error){
				return false;
			}
			else{
				return true;
			}
		})
	}
	else{
		return(`You have no admin access`)
	}
}
//////////////////////////////////////////////////