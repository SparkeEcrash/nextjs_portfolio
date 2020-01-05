import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import axios from 'axios';

import SuperComponent from '../components/SuperComponent';

class Index extends SuperComponent {

	//this is rendered by the server and needs to get checked by re running npm
	static async getInitialProps() {
		// axios.get('https://jsonplaceholder.typicode.com/todos/1').then(
			// (response) => console.log(response.data)).catch(err => console.error(err));
		
		let userData = {};

		try {
			const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
			userData = response.data;
		} catch(err) {
			console.error(err);
		}

		return {initialData: [1,2,3,4], userData};
	}

	constructor(props) {
		super(props);
		this.updateTitle = this.updateTitle.bind(this);
		this.state = {
			title: 'I am Index Page'
		}

		console.log('constructor');
	}

	componentDidMount() {
		console.log('componentDidMount');
	}

	componentDidUpdate() {
		console.log('componentDidUpdate');

	}

	componentWillUnmount() {
		console.log('componentWillUnmount')
	}

	updateTitle() {
		this.setState({title: 'I am Updated Index Page'})
	}

	render() {
		const { title } = this.state;
		const { userData, initialData } = this.props;

		return (
			<BaseLayout>
				<h1>I am Index Page from Class Component</h1>
				<h2> {title} </h2>
				<h2> {userData.title} </h2>
				<button onClick={this.updateTitle}> Change Title </button>
			</BaseLayout>
			// React.createElement(
			// 	"h1",
			// 	{ className: "title" },
			// 	"I am Index Page from Class Component created by React.createElement"
			// )
		)
	}
}

export default Index;
