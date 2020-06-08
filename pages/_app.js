import React from 'react';
import App, { Container } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Fonts from '../helpers/Fonts';

import auth0 from '../services/auth0';

// Stylings
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/main.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

// const App = ({Component, pageProps}) => {
//   return <Component {...pageProps} appProps="Hello From App"/>
// }

class MyApp extends App {
	// https://nextjs.org/docs/old

	//getInitialProps gets invoked only once at now that this is here at the very top... this is where it will trigger to get the props
	//getInitialProps functions are activated both in the server and browser side
	static async getInitialProps({Component, router, ctx}) {
		let pageProps = {};
		//check which environement you are running getInitialProps (server or client)
		const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);
		//check auth0.js to see where clientAuth() and serverAuth() is being invoked from
		//ctx.req has all the cookies stored in the browsers within ctx.req.headers.cookie which is used to look up at the expiresAt time in serverAuth()

		//this invokes the getInitialProps functions that are at the component level
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		const isSiteOwner = user && user[process.env.NAMESPACE + '/role'] === 'siteOwner'

		//if 'user' object was returned from clientAuth or serverAuth then authentication was successful
		const auth = { user, isAuthenticated: !!user, isSiteOwner };

		return { pageProps, auth };
	}

	componentDidMount() {
		Fonts();
	}

	render() {
		const { Component, pageProps, auth } = this.props;
		return (
			<React.Fragment>
				<ToastContainer />
				<Component {...pageProps} auth={auth} />
			</React.Fragment>
		)
	}
}

export default MyApp;