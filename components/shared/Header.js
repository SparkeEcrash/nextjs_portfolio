import React from 'react';
import Link from 'next/link';
import {Link as NextLink} from '../../routes';

import '../../styles/main.scss';

class Header extends React.Component {
	render() {
		return (
			<>
				<Link href="/">
					<a> Home </a>
				</Link>
				<Link href="/about">
					<a> About </a>
				</Link>
				<Link href="/portfolios">
					<a> Portfolios </a>
				</Link>
				<Link href="/blog">
					<a> Blog </a>
				</Link>
				<Link href="/cv">
					<a> CV </a>
				</Link>
				<NextLink route='test' params={{id: '2'}}><a> Test 2 </a></NextLink>
				<NextLink route='/test/5'><a> Test 5 </a></NextLink>
				<style jsx>
					{
						`
						a {
							font-size: 20px;
						};
						`
					}
				</style>
			</>
		)
	}
}

export default Header;


