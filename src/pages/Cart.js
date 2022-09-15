import { React, useEffect } from "react";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
// import ListOrder from '../components/listOrder'
import {Container, Row, Col, Button} from "react-bootstrap";

import Rp from "rupiah-format"
import Delete from "../assets/trash.svg";
import NavbarUser from "../components/navbar/NavbarUser";

export default function Cart() {
  const handleClickplus = async (qty, id, price) => {
    // Counter state is incremented
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const newQty = qty + 1;
    const newTotal = price * newQty;
    const req = JSON.stringify({
      qty: newQty,
      sub_amount: newTotal,
    });
    await API.patch(`/cart/${id}`, req, config);
    refetch();
  };

  const handleClickmin = async (id, qty, price, sub_amount) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(sub_amount);
    console.log(price);
    // Counter state is decremented
    if (qty === 1) {
      return;
    }
    const newQty = qty - 1;
    const newTotal = sub_amount - price * newQty;
    console.log(newTotal);
    const req = JSON.stringify({
      qty: newQty,
      sub_amount: newTotal * newQty,
    });
    await API.patch(`/cart/${id}`, req, config);
    refetch();
  };

  let navigate = useNavigate();
  // Get data transaction by ID
  let { data: transaction, refetch } = useQuery("transCache", async () => {
    const response = await API.get("/transaction-status");
    return response.data.data;
  });

  let handleDelete = async (id) => {
    await API.delete(`cart/${id}`);
    refetch();
  };

  // total Payment
  let Total = transaction?.carts?.reduce((a, b) => {
    return a + b.sub_amount;
  }, 0);
  let TotalQTY = transaction?.carts?.reduce((a, b) => {
    return a + b.qty;
  }, 0);

  // pay Handler
  const form = {
    status: "success",
    total: Total,
  };

  const handleSubmit = useMutation(async (e) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Insert transaction data
    const body = JSON.stringify(form);

    const response = await API.patch("/transactionID", body, config);

    console.log(response);

    const token = response.data.data.token;
    console.log(token);
    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        /* You may add your own implementation here */
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  });

  // // useEffect on Mitrans
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      <NavbarUser />
      <Container className="mt-5 pt-5 px-5" style={{ color: "#613D2B"}}>
        <h2 className="fw-bold mt-5">My Cart</h2>
        <p>Review Your Order</p>
        <Row className="justify-content-between">
          <Col md={8}>
            <hr />
            <Container className="justify-content-between ">
              {transaction?.carts.map((item, index) => (
                <Row style={{ fontSize: 14 }}>
                  <Col md={8} className="d-flex">
                    <div
                      className="rounded"
                      style={{
                        width: 80,
                        height: 80,
                        marginRight: 13,
                        marginBottom: 29,
                      }}
                    >
                      <img
                        src={
                          "http://localhost:4000/uploads/" + item.product?.image
                        }
                        alt="img"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div>
                      <p style={{ fontWeight: 900 }}>{item.product.name}</p>
                      <button
                        className="none"
                        onClick={() =>
                          handleClickmin(
                            item.id,
                            item.qty,
                            item.product.price,
                            item.sub_amount
                          )
                        }
                      >
                        -
                      </button>
                      <p className="d-inline mx-2 none">{item?.qty}</p>
                      <button
                        className="none"
                        onClick={() =>
                          handleClickplus(item.qty, item.id, item.product.price)
                        }
                      >
                        +
                      </button>
                    </div>
                  </Col>
                  <Col
                    md={4}
                    className="justify-content-end"
                    style={{ textAlign: "end" }}
                  >
                    <p>{Rp.convert(item.sub_amount)}</p>
                    <img
                      src={Delete}
                      alt="img"
                      style={{ cursor: "pointer", width: 16, height: 20 }}
                      onClick={() => handleDelete(item.id)}
                    />
                  </Col>
                </Row>
              ))}
            </Container>
            <hr />
          </Col>

          <Col md={4} className="text-center">
            <hr />
            <Row>
              <Col>
                <p className="text-start">Subtotal</p>
                <p className="text-start">QTY</p>
              </Col>
              <Col>
                <p>{Rp.convert(Total)}</p>
                <p>{TotalQTY}</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <p className="text-start">Total</p>
              </Col>
              <Col>
                <p>{Rp.convert(Total)}</p>
              </Col>
            </Row>
            <Button
            variant="light"
              className="button-main text-light w-100 fw-semibold"
              type="submit"
              onClick={(e) => handleSubmit.mutate(e)}
            >
              
              Buy
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
