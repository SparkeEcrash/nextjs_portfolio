import React, { useState } from "react";
import Link from "next/link";
import ActiveLink from '../ActiveLink';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
	NavLink,
	Dropdown,
	DropdownItem,
	DropdownToggle,
	DropdownMenu
} from "reactstrap";
import auth0 from "../../services/auth0";

const BsNavLink = (props) => {
	const { route, title } = props;
	const className = props.className || "";

  return (
		<ActiveLink activeClassName="active" route={route}>
			<a className={`nav-link port-navbar-link ${className}`}>{title}</a>
		</ActiveLink>
  );
};

const Login = () => {
  return (
    <span onClick={auth0.login} className="nav-link port-navbar-link clickable">
      {" "}
      Login{" "}
    </span>
  );
};

const Logout = () => {
  return (
    <span
      onClick={auth0.logout}
      className="nav-link port-navbar-link clickable"
    >
      {" "}
      Logout{" "}
    </span>
  );
};

const Header = (props) => {
  const { isAuthenticated, user, className } = props;

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdown, setIsDropdown] = useState(false);

  const toggleMobileMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	}

	const toggleDropdown = () => {
		setIsDropdown(!isDropdown);
	}

	const menuOpenClass = isMenuOpen ? 'menu-open' : 'menu-close';

	const renderBlogMenu = () => {
		const { isSiteOwner } = props;

		if(isSiteOwner) {
			return (
				<Dropdown className="port-navbar-link port-dropdown-menu" nav isOpen={isDropdown} toggle={() => {toggleDropdown()}}>
					<DropdownToggle className="port-dropdown-toggle" nav caret>
						Blog
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem><BsNavLink className="port-dropdown-item" route="/blogs" title="Blogs" /></DropdownItem>
						<DropdownItem><BsNavLink className="port-dropdown-item" route="/blogs/new" title="Create a Blog" /></DropdownItem>
						<DropdownItem><BsNavLink className="port-dropdown-item" route="/blogs/dashboard" title="Blogs Dashboard" /></DropdownItem>
					</DropdownMenu>
				</Dropdown>
			)
		}
		return (
			<NavItem className="port-navbar-item">
				<BsNavLink route="/blogs" title="Blog" />
			</NavItem>
		)
	}

  return (
    <div>
      <Navbar
        className={`port-navbar port-nav-base absolute ${className} ${menuOpenClass}`}
        color="transparent"
        dark
        expand="md"
      >
        <NavbarBrand className="port-navbar-brand" href="/">
          James Park
        </NavbarBrand>
        <NavbarToggler onClick={() => {toggleMobileMenu()}} />
        <Collapse isOpen={isMenuOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="port-navbar-item">
              <BsNavLink route="/" title="Home" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink route="/about" title="About" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink route="/portfolios" title="Portfolio" />
            </NavItem>
						{renderBlogMenu()}
            <NavItem className="port-navbar-item">
              <BsNavLink route="/cv" title="Cv" />
            </NavItem>
            {!isAuthenticated && (
              <NavItem className="port-navbar-item">
                <Login />
              </NavItem>
            )}
            {isAuthenticated && (
              <NavItem className="port-navbar-item">
                <Logout />
              </NavItem>
            )}
            {isAuthenticated && (
              <NavItem className="port-navbar-item">
                <span className="nav-link port-navbar-link">{user.name}</span>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
