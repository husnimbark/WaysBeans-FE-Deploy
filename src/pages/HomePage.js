import React, { useState, useContext, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import NavbarUser from "../components/navbar/NavbarUser";
import Jumbotron from "../assets/jumbotron.png";

import { dataProduct } from "../dummy/DataDummy";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { API } from "../config/api";


export default function HomePage() {

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

  const navigate = useNavigate();

  const navigateAddCart = (id) => {
    navigate("/add-cart/" + id);
  };

  return (
    <>
      <NavbarUser/>

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
            <Col className="mb-3" key={index}>
              <Card
         
                className="rounded-3 bgCard text-decoration-none"
                style={{ width: "14rem", cursor: "pointer" }}
                // onClick={() => {
                //   setShowAddItem(true);
                // }}
                onClick={() => navigateAddCart(item?.id)}
              >
                <Card.Img variant="top" src={item.image} />
                <Card.Body className="bg-main">
                  <Card.Title className="text-main text-decoration-none">
                    {item.name}
                  </Card.Title>
                  <Card.Text className="text-second fs-sm text-decoration-none">
                    Rp. {item.price}
                  </Card.Text>
                  <Card.Text className="text-second fs-7 fs-sm text-end text-decoration-none">
                  Stock: {item.stock}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    
    </>
  );
}
