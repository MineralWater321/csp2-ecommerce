const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");

/*//User Registration
module.exports.registerUser = (reqBody) => {
	let newUser = new User({
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10)
	})

	return newUser.save().then((user, error) => {
		if(error){
			return false;
		}
		else{
			return true;
		}
	})
};
*/

//User Registration	with duplicate email detection
module.exports.registerUser = (reqBody) => {
	
	return User.find({email: reqBody.email}).then(result => {
		if(result.length > 0){
			return ('Email already exists');
		}
		else{
			let newUser = new User({
				email: reqBody.email,
				password: bcrypt.hashSync(reqBody.password, 10)
			})
			return newUser.save().then((user, error) => {
				if(error){
					return false;
				}
				else{
					return true;
				}
			})
		} 
	})	
};