// import React from 'react';
// import Link from 'next/link';
// import {Link as NextLink} from '../../routes';

// class Header extends React.Component {
// 	render() {
// 		return (
// 			<>
// 				<Link href="/">
// 					<a> Home </a>
// 				</Link>
// 				<Link href="/about">
// 					<a> About </a>
// 				</Link>
// 				<Link href="/portfolios">
// 					<a> Portfolios </a>
// 				</Link>
// 				<Link href="/blog">
// 					<a> Blog </a>
// 				</Link>
// 				<Link href="/cv">
// 					<a> CV </a>
// 				</Link>
// 				<NextLink route='test' params={{id: '2'}}><a> Test 2 </a></NextLink>
// 				<NextLink route='/test/5'><a> Test 5 </a></NextLink>
// 				<style jsx>
// 					{
// 						`
// 						a {
// 							font-size: 20px;
// 						};
// 						`
// 					}
// 				</style>
// 			</>
// 		)
// 	}
// }

// export default Header;

const BsNavLink = props => {
	const { route, title } = props;

	return (
		<Link href={route}>
			<a className="nav-link port-navbar-link">{title}</a>
		</Link>
	)
}

import React, { useState } from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const Example = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="port-navbar port-default absolute" color="transparent" dark expand="md">
        <NavbarBrand className="port-navbar-brand" href="/">James Park</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="port-navbar-item">
							<BsNavLink route="/" title="Home"/>
            </NavItem>
						<NavItem className="port-navbar-item">
							<BsNavLink route="/about" title="About"/>
            </NavItem>
            <NavItem className="port-navbar-item">
							<BsNavLink route="/portfolios" title="Portfolio"/>
            </NavItem>
            <NavItem className="port-navbar-item">
							<BsNavLink route="/blogs" title="Blog"/>
            </NavItem>
            <NavItem className="port-navbar-item">
							<BsNavLink route="/cv" title="Cv"/>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Example;
