import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import withAuth from '../components/hoc/withAuth';

import { getSecretData } from '../actions';

class Secret extends Component {

	//getInitialProps functions are activated both in the server and browser side
	static async getInitialProps({req}) {
		//req comes from ctx.req from _app.js and is access only when run by server side
		// const anotherSecretData = process.browser ? await getSecretData() : await getSecretDataServer(req);
		const anotherSecretData = await getSecretData(req);

		return { anotherSecretData };
	}

	state = {
		secretData: []
	}

	async componentDidMount() {
		const secretData = await getSecretData();
		
		this.setState({
			secretData
		});
	}

	displaySecretData() {
		const { secretData } = this.state;

		if( secretData && secretData.length > 0) {
			return secretData.map((data, index) => {
				return (
					<div key={index}>
						<p> {data.title} </p>
						<p> {data.description} </p>
					</div>
				)
			})
		}

		return null;
	}

  render() {
		const { superSecretValue } = this.props;
		console.log(this.state);

		return (
			<BaseLayout {...this.props.auth}>
				<BasePage>
					<h1>I am a Secret Page</h1>
					<p>Secret Content Here</p>
					<h2>{superSecretValue}</h2>
					{ this.displaySecretData() }
				</BasePage>
			</BaseLayout>
		)
  }
}

export default withAuth()(Secret);
