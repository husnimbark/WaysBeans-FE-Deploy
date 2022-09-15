import React , {useContext, useState, useEffect} from "react";
import { Link , useNavigate} from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import Rp from "rupiah-format";
import { UserContext } from "../context/UserContext";
import NavbarAdmin from "../components/navbar/NavbarAdmin";

import { API } from "../config/api";
import { useQuery } from "react-query";
import UpdateProduct from "./UpdateProduct";

export default function ListProduct() {
  const navigate = useNavigate()
  
  let { data: products, refetch } = useQuery("produuuct", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
  let handleDelete = async (id) => {
    let person = prompt("Input 'DELETE' for Delete Product", "DELETE");
    if (person == "DELETE") {
      await API.delete(`product/${id}`);
    }
    refetch();
  };

  const updateProduct = (id) => {
    navigate("/update-product/" + id);
  };

  

  return (
    <>
      <NavbarAdmin />
      <Container className="mt-5 pt-5">
        <h2 className="text-main my-5">List Product</h2>
        <Table
          bordered
          className="text-center"
          
        >
          <thead className="bg-second">
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {products?.map((item, index) => (
              <tr className={item.length === 0 ? "fd" : ""}>
                <td>{index + 1}</td>
                <td>
                  <img src={item.image} alt="bab" style={{ width: 100 }} />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td className="d-grid gap-3">
                
                    <Button className="button-main text-light fw-semibold" type="submit" variant="light" onClick={() => updateProduct(item.id)}>
                      {" "}
                      Update
                    </Button>
                
                
                  <Button
                    className="btn btn-danger px-3 fw-semibold"
                    type="submit"
                    onClick={() => handleDelete(item.id)}
                  >
                    
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
