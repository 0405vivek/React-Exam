import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync } from "../Services/Actions/authAction";
import { MdAddShoppingCart } from "react-icons/md";

const NavbarComp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  const handleLogout = () => {
    dispatch(signOutAsync());
  };

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Student Manganet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            {/* Show Add Student only for Admin */}
            {user?.role === "admin" && (
              <Nav.Link as={Link} to="/add-Student">Add Student</Nav.Link>
            )}
            </Nav>

          <Nav>
            {user ? (
              <NavDropdown title={user.displayName || user.email} id="user-dropdown">
                <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button as={Link} to="/login" variant="outline-dark">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
