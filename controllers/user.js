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
/***********Duplicate email  **************/
/******************************************/
module.exports.checkEmailExists = (reqBody) => {
	
	return User.find({email: reqBody.email}).then(result => {

		if(result.length > 0){
			return true;
		}
		else{
			return false;
		}
	})
}


/******************************************/
/*********User Registration with **********/
/******************************************/
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
/**************User details****************/
/******************************************/
module.exports.getProfile = (data) => {

	return User.findById(data.userId).then(result => {

		// Changes the value of the user's password to an empty string when returned to the frontend
		// Not doing so will expose the user's password which will also not be needed in other parts of our application
		// Unlike in the "register" method, we do not need to call the mongoose "save" method on the model because we will not be changing the password of the user in the database but only the information that we will be sending back to the frontend application
		
		result.password = "";

		// Returns the user information with the password as an empty string
		return result;
	});
};

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
		return User.find({}, {password: 0}).then(result => {
			result.password = " ";
			console.log(result);
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

