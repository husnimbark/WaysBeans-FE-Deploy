import React, { useState } from "react";
import { Container, Navbar as NavbarComp, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BucksLogo from "../../assets/logo.png";
import Login from "../modal/Login";
import Register from "../modal/Register";
import { UserContext } from "../../context/UserContext";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleCloseRegister = () => setShowRegister(false);

  function switchRegister() {
    handleCloseLogin();

    setShowRegister(true);
  }

  function switchLogin() {
    handleCloseRegister();

    setShowLogin(true);
  }

  return (
    <>
      <NavbarComp expand="lg" fixed="top border-bottom shadow" bg="light" >
        <Container>
          <NavbarComp.Brand as={Link} to="/">
            <img
              src={BucksLogo}
              className="img-fluid"
              style={{ width: "100px" }}
              alt="brand"
            />
          </NavbarComp.Brand>
          <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
          <NavbarComp.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto my-2 ">
              <Button
                onClick={() => {
                  setShowLogin(true);
                }}
                className="btn-light btn-sm border-main text-main me-3 f-2 fw-bold "
              >
                Login
              </Button>
              <Button
              variant="secondary"
                onClick={() => {
                  setShowRegister(true);
                }}
                className="btn-sm button-main border-main text-light f-2 fw-bold"
              >
                Register
              </Button>
            </Nav>
          </NavbarComp.Collapse>
        </Container>
      </NavbarComp>

      <Login
        show={showLogin}
        handleClose={handleCloseLogin}
        switchRegister={switchRegister}
      />

      <Register
        show={showRegister}
        handleClose={handleCloseRegister}
        switchLogin={switchLogin}
      />
    </>
  );
}

export default Navbar;
