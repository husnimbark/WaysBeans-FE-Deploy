import React, { useState , useEffect} from "react";
import { Container, Button, Row, Col } from "react-bootstrap";

import Rp from "rupiah-format";
import { useParams } from "react-router-dom";

import NavbarUser from "../components/navbar/NavbarUser";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

import Rate from "../components/rate/Rate"


const AddCart = () => {
  let navigate = useNavigate();
  const { id } = useParams();


  const [rating, setRating] = useState(0)
  
  const [product, SetProduct] = useState();
  const findProduct = async () => {
    try {
      let response = await API.get("/product/" + id);
      SetProduct(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    findProduct();
  }, []);

  
  const [transaction, setTransaction] = useState();
  const getTrans = async () => {
    try {
      let response = await API.get("/transaction-status");
      setTransaction(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getTrans();
  }, []);

  console.log(transaction);

  
  const handleAddToCart = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await API.post("/transaction", config);

      const data = {
        product_id: product.id,
        qty: 1,
        sub_amount: product.price,
      };

      const body = JSON.stringify(data);

      await API.post("/cart", body, config);
      navigate("/homepage");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <NavbarUser/>
      <Container className="pt-4">

        <Container className="my-5 pt-5">
    
          <Row>
            <Col>
              <img
                src={product?.image}
                style={{ width: "70%" }}
                className="img-fluid"
                alt="transaction"
              />
            </Col>
            <Col>
              <div>
                <h2 className="text-start text-main fw-bold">
                {product?.name}
                </h2>
              </div>
              <div className="mb-5">
                <p
                  className="text-start text-second fw-semibold"
                  style={{ fontSize: "18px" }}
                >
                  Stock : {product?.stock}
                </p>
              </div>
              <div className="mb-5">
                <h5 className="text-start text-main fw-bold">
                  Description
                </h5>
                <p style={{textAlign:"justify"}}>{product?.desc}</p>
              </div>
        
           
                <h3 className="text-second fw-semibold fs-4 mt-3 mb-5 text-end">
                 {Rp.convert(product?.price)}
                </h3>
          
              <div>
                

         <Rate rating={rating} onRating={(rate) => setRating(rate)}/>

                <Button
                  variant="light"
                  className="btn button-main fw-bold mt-3 text-light"
                  style={{ width: "100%" }}
                  onClick={(e) => handleAddToCart.mutate(e)}
                >
                  Add to Cart
                </Button>

                
              </div>
            </Col>
          </Row>
          
        </Container>

      </Container>
    </>
  );
};

export default AddCart;
