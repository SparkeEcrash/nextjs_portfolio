const jwt = require('express-jwt');
const jwksClient= require('jwks-rsa');

const config = require('../config');
const NAMESPACE = config.NAMESPACE;

// exports.checkJWT = function(req, res, next) {
// 	const isValidToken = true;

// 	if (isValidToken) {

// 		next();
// 	} else {
// 		return res.status(401).send({title: "Not Authorized", detail: "PLease login in order to get a data"});
// 	}
// }

// MIDDLEWARE
exports.checkJWT = jwt({
	secret: jwksClient.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 50,
		jwksUri: 'https://dev-mdn7fmml.auth0.com/.well-known/jwks.json'
	}),
	audience: 'JAyqq9yEXPkFhB684tcCpvIIKJ3BRDWW',
	issuer: 'https://dev-mdn7fmml.auth0.com/',
	algorithms: ['RS256']
})

//this function is very similar to verifyToken(token) function in 'auth0.js' file 

exports.checkRole = role => (req, res, next) => {
		const user = req.user;
		if(user && user[NAMESPACE + '/role'] && user[NAMESPACE + '/role'] === role) {
			next();
		} else {
			return res.status(401).send({title: 'Not Authorized', detail: 'You are not authorized to access this data'})
		}
	}
