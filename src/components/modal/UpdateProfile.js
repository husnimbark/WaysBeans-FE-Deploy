import { useState, useContext , useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useMutation , useQuery} from "react-query";
import { Container, Row, Col, Button , Modal, Form} from "react-bootstrap";

import { API } from "../../config/api";

function UpdateProfile({ show, handleClose, profile}) {
  const { id } = useParams();
  const [state] = useContext(UserContext);

  let navigate = useNavigate();

  const [data, setData] = useState();
  const [preview, setPreview] = useState(null);
  const [nameUrl, setNameUrl] = useState();
  const [addProfile, setAddProfile] = useState({
    name: "",
    adress: "",
    image: "",
  });




  const handleChange = (e) => {
    setAddProfile({
      ...addProfile,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setNameUrl(e.target.name[0]);
    }
  };

  const handleUpdateProfile = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (addProfile.image) {
        formData.set("image", addProfile?.image[0], addProfile?.image[0]?.name);
      }
      formData.set("name", addProfile.name);
      formData.set("adress", addProfile.adress);

      await API.patch("/user/" + id, formData, config);

      alert("berhasil UPDATE profile");
    } catch (error) {
      console.log(error);
    }
  });


  return (
    <Modal size="md" show={show} centered onHide={handleClose}>
      <Modal.Body >
      <Container fluid className="my-5">
        <Row>
          <Col sm={7} className="px-5">
            <h2 className="mb-5 fw-semibold text-main" >
              Update Profile
            </h2>
            <Form
              onSubmit={(e) => handleUpdateProfile.mutate(e)}
              className="text-center"
            >
              <Form.Control
                type="text"
                placeholder="Name"
                value={state.user.name}
                name="name"
                onChange={handleChange}
                className="px-3 py-2 mt-3 bg-second"
                style={{ border: "2px solid #613D2B" }}
              />
              <Form.Control
                type="text"
                placeholder="Adress"
                value={state.user.adress}
                name="adress"
                onChange={handleChange}
                className="px-3 py-2 mt-3 bg-second"
                style={{ border: "2px solid #613D2B" }}
              />
   
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
                className="px-3 py-2 mt-3 bg-second"
                style={{ border: "2px solid #613D2B" }}
              />
              <Button className="button-main text-light w-100 mt-4" variant="light" type="submit">
              
                Update
              </Button>
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
      </Modal.Body>
    </Modal>
  );
}

export default UpdateProfile;
