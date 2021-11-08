const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");


/******************************************/
/**********User Registration***************/
/******************************************/
/*module.exports.registerUser = (reqBody) => {
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
};*/



/******************************************/
/*********User Registration with **********/
/*******duplicate email detection**********/
/******************************************/
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

/******************************************/
/***********User authentication************/
/******************************************/
module.exports.loginUser = (reqBody) => {
	return User.findOne({email: reqBody.email}).then(result => {
		if(result == null){
			return false;
		}
		else{
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
			if(isPasswordCorrect){
				return { access: auth.createAccessToken(result) }
			}
			else{
				return false;
			}
		}
	})
}

/******************************************/
/***********Setting user to admin**********/
/******************************************/
module.exports.setAsAdmin = async (reqParams, adminData) => {
	//find out if requester is admin
	if(adminData.isAdmin){
		return User.findByIdAndUpdate(reqParams.userId, {isAdmin: true}).then((user, error) => {
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


/******************************************/
/************ Retrieve all users **********/
/******************************************/
module.exports.getAllUsers = async (adminData) => {
	if(adminData.isAdmin){
		return User.find({}).then(result => {
			result.password = "";
			return result;
		})
	}
	else{
		return (`You have no Admin access`);
	}
}

/*********************************************/
/**** Alternative method to set user *********/
/** as admin using email instead of user id **/
/*********************************************/
/*module.exports.setAdmin = async (reqBody, adminData) => {
	//find out if requester is admin
	if(adminData.isAdmin){
		return User.findOneAndUpdate({email: reqBody.email}, {isAdmin: true}).then((user, error) => {
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
}*/

