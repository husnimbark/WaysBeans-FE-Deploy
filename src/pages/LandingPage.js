import React, { useState , useContext, useEffect} from "react";
import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { Row, Col, Container, Card } from "react-bootstrap";
import Jumbotron from "../assets/jumbotron.png";
import Bucks from "../assets/Bucks/bucks-1.png";
import Login from "../components/modal/Login";
import Register from "../components/modal/Register";
import { dataProduct } from "../dummy/DataDummy";

import { UserContext } from "../context/UserContext";
import { API } from "../config/api";


export default function LandingPages() {
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

  const [products, SetProducts] = useState([]);
  const [state] = useContext(UserContext);

  const findProducts = async () => {
    try {
      let response = await API.get("/products");
      SetProducts(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    findProducts();
  }, []);


  return (
    <>
      <Navbar />

      <Container className="mt-5 pt-4" >
        <img
          className="mt-5 container-lg"
          src={Jumbotron}
          alt="Jumbotron"
          style={{ cursor: "pointer" }}
        ></img>
      </Container>

      <Container className="my-5">
    
        <Row className="gap-1 ms-2">
          {products.map((item, index) => (
            <Col className="mb-3 " key={index}>
              <Card
                className="rounded-3 bgCard text-decoration-none"
                style={{ width: "14rem", cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={item.image}
                  onClick={() => {
                    setShowLogin(true);
                  }}
                />
                <Card.Body className="bg-main">
                  <Card.Title className="text-main text-decoration-none">
                    {item.name}
                  </Card.Title>
                  <Card.Text className="text-second fs-sm text-decoration-none">
                    Rp. {item.price}
                  </Card.Text>
                  <Card.Text className="text-second fs-sm text-end text-decoration-none">
                    Stock: {item.stock}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

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
