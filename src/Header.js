import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./Header.css";
import LogoutButton from './components/LogoutButton'
import { Nav } from "react-bootstrap";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        
        <Nav.Link>
        <Link to="/">Home</Link>
        </Nav.Link>

        <Nav.Link>
        <Link to="/profile">Profile</Link>
        </Nav.Link>

        <Nav.Link>
        <LogoutButton/>
        </Nav.Link>
        
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
      </Navbar>
    );
  }
}

export default Header;
