import React, { useContext , useState, useEffect} from "react";
import {
  Container,
  Navbar as NavbarComp,
  Nav,
  NavDropdown,
  Dropdown,
  Button,
  InputGroup
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BucksLogo from "../../assets/logo.png";
import BlankProfile from "../../assets/blank-profile.jpeg";
import CartIcon from "../../assets/Icon/cart.svg";
import UserIcon from "../../assets/Icon/person-check-fill.svg";
import LogoutIcon from "../../assets/Icon/door-closed.svg";

import { UserContext } from "../../context/UserContext";
import { API } from "../../config/api";


function NavbarUser(props) {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);

  useEffect(() => {
    const findProduct = async () => {
      try {
        let response = await API.get("/transaction-status");
        setCart(response.data.data.carts.length);
      } catch (e) {
      
      }
    };
    findProduct();
  }, [setCart]);

  useEffect(() => {
    setCart();
  }, []);

  const Logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const [darkMode, setDarkMode] = React.useState(true);


  return (
    <NavbarComp
      expand="lg"
      fixed="top border-bottom shadow"
      bg="light"
      className="mb-5"
    >
      <Container>
        <NavbarComp.Brand as={Link} to="/homepage">
          <img
            src={BucksLogo}
            className="img-fluid"
            style={{ width: "100px" }}
            alt="brand"
          />
        </NavbarComp.Brand>

        <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
        <NavbarComp.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/cart"
              className={
                props?.title === "Cart" ? `text-navbar-active` : `text-navbar`
              }
            >
              <img
                className=""
                src={CartIcon}
                alt="cart"
                style={{ width: "24px", height: "24px", marginTop:5}}
              />

              <p
              
                style={{
                  borderRadius: 50,
                  width: "20px",
                  height: "20px",
                  backgroundColor: "red",
                  fontSize: 14,
                  position:"relative",
                  bottom:2,
                  left:15,
                  marginTop:-32
                }}
                className=" text-light text-center fw-bold"
              >
              
              {cart}
              </p>
            </Nav.Link>

          
      

            <NavDropdown
              align="end"
              className="rounded"
              eventkey={1}
              title={
                <div className="ms-auto f-2 border-main border-2 button-main ps-2 rounded-pill text-light fw-bold py-1">
                  
                  {state.user.name}
                  <img
                    className="rounded-circle border border-3 ms-2 me-2"
                    style={{ width: "25px", height: "25px" }}
                    src={BlankProfile}
                    alt="UserPic"
                  />
                </div>
              }
            >
              <Nav.Link
                as={Link}
                to="/profile"
                className={
                  props?.title === "Profile"
                    ? `text-navbar-active`
                    : `text-navbar`
                }
              >
                <img
                  src={UserIcon}
                  style={{ width: "25px", height: "25px" }}
                  className="me-3 ms-2"
                />
                Profile
              </Nav.Link>

              <Dropdown.Divider />
              <Nav.Link onClick={Logout} className="text-navbar" >
                <img
                  src={LogoutIcon}
                  style={{ width: "25px", height: "25px" }}
                  className="me-3 pe-1 ms-2"
                />
                Logout
              </Nav.Link>
            </NavDropdown>
          </Nav>
        </NavbarComp.Collapse>
      </Container>
    </NavbarComp>
  );
}

export default NavbarUser;
