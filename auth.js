const jwt = require("jsonwebtoken");

const secret = "EcommerceAPI";

//Token creation

module.exports.createAccessToken = (user) => {
	//The data will be received from the resignation form
	//When the user logs in, a token will be created with the user's information
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	//Generates a JSON web token using the jwt's sign method
	return jwt.sign(data, secret, {});
}

//Token Verification

module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization

	if(typeof token !== "undefined"){
		console.log(token);
		//Bearer token
		token = token.slice(7, token.length);

		//Validate the token using the "verify" method decrypting the token using the secret code
		return jwt.verify(token, secret, (err, data) => {

			//if JWT is not valid
			if(err){
				return res.send( {auth: "failed"} );
			}
			else{
				//Allows the application to proceed with the next middleware function/callback function in the route
				next();
			}
		})
	}
	//Token does not exist
	else{
		return res.send({auth: "failed"});
	}
}

//Token decryption
module.exports.decode = (token) => {
	if(typeof token !== "undefined"){
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {
			if(err){
				return null;
			}
			else{
				return jwt.decode(token, {complete:true}).payload;
			}
		})
	}
	else{
		return null;
	}
}