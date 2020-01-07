import React from 'react';
import App, { Container } from 'next/app';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';
/*the order matters because main.scss overrides bootstrap*/


export default class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return { pageProps }
	}

	render() {
		const { Component, pageProps } = this.props

		return (
			<Container>
				<Component {...pageProps}/>
			</Container>
		)
	}
}