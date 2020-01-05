import React from 'react';
import BaseLayout from '../../components/layouts/BaseLayout';
import {withRouter} from 'next/router';

class Portfolio extends React.Component {
	render() {
		console.log(this.props.router.query);
		console.log('sdlfsjdflsjdkf');

		return (
			<BaseLayout>
				<h1>I am Portfolio Page</h1> 
				<h1>{this.props.router.query.id}</h1> 
			</BaseLayout>
		)
	}
}

export default withRouter(Portfolio);