import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function HeaderNavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="/">Oddshajen</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav.Link href="#home">Gemte kampe</Nav.Link>
        <Nav.Link href="#link">Profile</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
