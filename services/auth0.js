import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { getCookieFromReq } from '../helpers/utils';

const CLIENT_ID = process.env.CLIENT_ID;

class Auth {

	constructor() {
		this.auth0 = new auth0.WebAuth({
			domain: 'dev-mdn7fmml.auth0.com',
			clientID: CLIENT_ID,
			redirectUri: `${process.env.BASE_URL}/callback`,
			responseType: 'token id_token',
			scope: 'openid profile'
		});

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
	}

	handleAuthentication() {
		return new Promise((resolve, reject) => {
			this.auth0.parseHash((err, authResult) => {
				if (authResult && authResult.accessToken && authResult.idToken) {
					this.setSession(authResult);
					resolve();
				} else if (err) {
					reject();
					console.log(err);
				}
			});
		})
	}

	setSession(authResult) {
		// Set the time that the Access Token will expire at
		const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
		
		//FOR LOCAL STORAGE
		//localStorage.setItem('access_token', authResult.accessToken);
		//localStorage.setItem('id_token', authResult.idToken);
		//localStorage.setItem('expires_at', expiresAt);

		Cookies.set('jwt', authResult.idToken);
	}

	logout() {
		Cookies.remove('jwt');

		this.auth0.logout({
			returnTo: process.env.BASE_URL,
			clientID: CLIENT_ID
		})
	}

	login() {
		this.auth0.authorize();
	}

	async getJWKS() {
		const res = await axios.get('https://dev-mdn7fmml.auth0.com/.well-known/jwks.json');
		const jwks = res.data;
		return jwks;
	}

	isAuthenticated() {
		// Check whether the current time is past the
		// Access Token's expiry time
		const expiresAt = Cookies.getJSON('expiresAt');
		return new Date().getTime() < expiresAt;
	}

	async verifyToken(token) {
		if (token) {
			//lecture 81
			const decodedToken = jwt.decode(token, { complete: true });
			if (!decodedToken) { return undefined; }
			const jwks = await this.getJWKS();
			const jwk = jwks.keys[0];

			// BUILD CERTIFICATE
			let cert = jwk.x5c[0];
			cert = cert.match(/.{1,64}/g).join('\n');
			cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
			//

			if(jwk.kid === decodedToken.header.kid) {
				try {
					const verifiedToken = jwt.verify(token, cert);
					const expiresAt = verifiedToken.exp * 1000;

					return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
				} catch(err) {
					return undefined;
				}
			}

			const expiresAt = decodedToken.exp * 1000;

			return (decodedToken && new Date().getTime() < expiresAt) ? decodedToken : undefined;
		}
		return undefined
	}

	async clientAuth() {
		const token = Cookies.getJSON('jwt');
		const verifiedToken = await this.verifyToken(token);

		return verifiedToken;
	}

	async serverAuth(req) {
		if (req.headers.cookie) {

			const token = getCookieFromReq(req, 'jwt');
			const verifiedToken = await this.verifyToken(token);

			return verifiedToken;
		}
		return undefined;
	}
}

const auth0Client = new Auth()

export default auth0Client;