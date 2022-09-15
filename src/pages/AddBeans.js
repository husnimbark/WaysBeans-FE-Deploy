import React , {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import NavbarAdmin from "../components/navbar/NavbarAdmin";

import { useMutation } from "react-query";
import { useNavigate} from "react-router-dom";
import { API } from "../config/api";

export default function AddBeans() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [nameUrl, setNameUrl] = useState();
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
    image: "",
    desc: "",
    stock: "",
  });

  const { name, price, image, desc, stock } = addProduct;

  const handleChange = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setNameUrl(e.target.name[0]);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      
      const formData = new FormData();
      formData.set("image", addProduct.image[0], addProduct.image[0].name);
      formData.set("name", addProduct.name);
      formData.set("price", addProduct.price);
      formData.set("stock", addProduct.stock);
      formData.set("desc", addProduct.desc);

      console.log(formData);
      
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      
      await API.post("/product", formData, config);
      
      alert("berhasil menambahkan product");
      await delay(500);
      
      navigate("/list-product");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <NavbarAdmin className="mb-5" />
      <Container  className=" mt-5 pt-5 ">
        <Row>
          <Col sm={7} className="px-5">
              <h2 className="my-4 text-main" >Add Product</h2>
            <Form onSubmit={(e) => handleSubmit.mutate(e)} className="text-center">
              <Form.Control
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  name="name"
                  onChange={handleChange}
                  className="px-3 py-2 mt-3 bg-second"
                  style={{border: "2px solid #613D2B"}}
                  />
              <Form.Control
                  type="text"
                  placeholder="Stock"
                  value={stock}
                  name="stock"
                  onChange={handleChange}
                  className="px-3 py-2 mt-3 bg-second"
                  style={{border: "2px solid #613D2B"}}
                />
              <Form.Control
                  type="text"
                  placeholder="Price"
                  value={price}
                  name="price"
                  onChange={handleChange}
                  className="px-3 py-2 mt-3 bg-second"
                  style={{border: "2px solid #613D2B"}}
                />
              <textarea
                  placeholder="Description Product"
                  value={desc}
                  name="desc"
                  onChange={handleChange}
                  className="px-3 py-2 mt-3 bg-second rounded"
                  style={{border: "2px solid #613D2B", width: "100%", height: 200, overflow: "auto"}}
                  
                  />
              <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="px-3 py-2 mt-3 bg-second"
                  style={{border: "2px solid #613D2B"}}
                />
              <Button variant="light" className="button-main mt-4 text-light w-100" type="submit"> Add</Button>
            </Form>
          </Col>
          <Col sm={5} className="text-center my-auto">
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "300px",
                    maxHeight: "400px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
