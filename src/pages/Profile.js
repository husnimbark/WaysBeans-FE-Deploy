import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import profile from "../assets/blank-profile.jpeg";
import logo from "../assets/logo.png";
import product1 from "../assets/Beans/beans-1.png";
import barcode from "../assets/barcode.png";
import NavbarUser from "../components/navbar/NavbarUser";
import UpdateProfile from "../components/modal/UpdateProfile";

import { API } from "../config/api";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import Rp from "rupiah-format";

export default function Profile() {
  const [state] = useContext(UserContext);

  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  const handleCloseUpdateProfile = () => setShowUpdateProfile(false);

  const { data: transactions } = useQuery("transss", async () => {
    const response = await API.get("/transaction1");
    return response.data.data;
  });

  console.log(transactions);

  return (
    <>
      <NavbarUser />

      <Container className="my-5 pt-5 ">
        <Row className="pt-4 mx-2">
          <Col className="w-50">
            <Row>
              <Col xs={12} md={6} className="">
                <h3 className="text-start text-main fw-bold fs-2 mb-4">
                  My Profile
                </h3>
                <img
                  src={profile}
                  style={{ width: "100%", borderRadius: "8px" }}
                  className=""
                  alt=""
                />
              </Col>
              <Col xs={12} md={6} className="pt-5 mt-4">
                <div>
                  <h4
                    className="text-start fw-semibold fs-5"
                    style={{ color: "#613D2B" }}
                  >
                    Name
                  </h4>
                  <h4 className="text-start fw-normal fs-6">
                    {state.user.name}
                  </h4>
                </div>
                <div>
                  <h4
                    className="text-start fw-semibold fs-5"
                    style={{ color: "#613D2B" }}
                  >
                    Email
                  </h4>
                  <h4 className="text-start fw-normal fs-6">
                    {state.user.email}
                  </h4>
                </div>
                <div>
                  <h4
                    className="text-start fw-semibold fs-5"
                    style={{ color: "#613D2B" }}
                  >
                    Adress
                  </h4>
                  <h4 className="text-start fw-normal fs-6">
                    {state.user.adress}
                  </h4>
                </div>
                <Button
                  className="button-main text-light mt-5 d-grid w-50"
                  variant="light"
                  onClick={() => {
                    setShowUpdateProfile(true);
                  }}
                >
                  Update Profile
                </Button>
              </Col>
            </Row>
          </Col>

          <Col className="w-50 me-2 overflow-auto">
            <div>
              <h4 className="text-dark fw-bold fs-2 mb-4 mt-1">
                My Transaction
              </h4>
            </div>

            <div
              className="overflow-auto px-3"
              style={{ borderRadius: "5px", maxHeight: "500px" }}
            >
              {" "}
              {transactions?.map((items, index) => (
                <Row
                  key={index}
                  className="my-3  bg-main"
                  style={{ borderRadius: "5px" }}
                >
                  {items?.carts?.map((cart, idx) => (
                    <Col key={idx} xs={12} md={8} className="pt-2">
                      <Row>
                        <div className="d-flex my-auto ms-4 mt-2">
                          <img
                            src={
                              "http://localhost:4000/uploads/" +
                              cart?.product?.image
                            }
                            style={{ borderRadius: "8px" }}
                            className="w-25 h-75 my-auto"
                            alt="Product"
                          />
                          <div className="mt-2">
                            <ul>
                              <li
                                style={{ listStyle: "none", fontSize: "8px" }}
                              >
                                <h3 className="text-main fw-bold fs-5">
                                  {cart?.product?.name}
                                </h3>
                              </li>
                              <p className="fw-semibold text-second">
                                ID Order : {cart?.id}
                              </p>
                              <li
                                style={{
                                  listStyle: "none",
                                  fontSize: "14px",
                                }}
                              >
                                <div className="lh-1">
                                  <p className="fw-normal text-second mt-n2">
                                    Price :{" "}
                                    <span>
                                      {Rp.convert(cart?.product.price)}
                                    </span>
                                  </p>
                                  <p className="fw-normal text-second mt-n2">
                                    Qty : <span>{cart?.qty}</span>
                                  </p>
                                  <p className="fw-semibold text-second mt-n2">
                                    Subtotal :{" "}
                                    <span>{Rp.convert(items?.total)}</span>
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Row>
                    </Col>
                  ))}

                  <Col xs={12} md={4} className="my-auto pt-2">
                    <div className="mb-3 text-center">
                      <img src={logo} style={{ width: "50%" }} alt="Logo" />
                    </div>
                    <div className="mb-3 text-center">
                      <img
                        src={barcode}
                        style={{ width: "40%" }}
                        alt="Barcode"
                      />
                    </div>
                    <div className="mb-3 text-center">
                      <Button
                        variant="warning"
                        className="fw-semibold"
                        style={{ fontSize: "10px" }}
                      >
                        {items?.status}
                      </Button>
                    </div>
                  </Col>
                </Row>
              ))}
              ;
            </div>
          </Col>
        </Row>
      </Container>

      <UpdateProfile
        show={showUpdateProfile}
        handleClose={handleCloseUpdateProfile}
      />
    </>
  );
}
