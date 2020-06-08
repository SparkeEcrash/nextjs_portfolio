

import React, { Children } from 'react';
import { Link } from '../routes';
import { withRouter } from 'next/router';

const ActiveLink = ({children, router, ...props}) => {
	//whatever props were passed to ActiveLink... a new props variable is being created that is an object of the spread of the props of that was passed down

	//Children.only makes sure there is only one child dom element inside
	const child = Children.only(children);
	let className = child.props.className || "";
	//the props here is accessing the newly created props array from the spread mentioned above

	if(router.asPath === props.route && props.activeClassName) {
		className = `${className} ${props.activeClassName}`
	}

	//this is to get rid of error message in console about unknown prop being found
	delete props.activeClassName;

	//the ...props here is destructuring the spread of the props that was passed down essentially transferring the props from the parent to the child component as is
	return <Link {...props}>{React.cloneElement(child, {className})}</Link>;
}

export default withRouter(ActiveLink);