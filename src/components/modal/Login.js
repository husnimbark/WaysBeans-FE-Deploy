import { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useMutation } from 'react-query';

import { API } from "../../config/api";

function Login({ show, handleLogin, handleClose, switchRegister }) {

  const navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create function for handle insert data process with useMutation here ...
  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/login', body, config);
      // const { status, name, email, token } = response.data.data
      if (response?.status === 200) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data
        })

        if (response.data.data.status === "admin") {
          navigate('/transaction')
        } else {
          navigate('/homepage')
        }
      }

    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Body className="">
        <div className="justify-content-center">
          <div className="card-auth p-4">
            <div
              className="d-flex justify-content-end fs-3 fa-2x"
              aria-hidden="true"
              onClick={handleClose}
            >
              <button className="bg-white border-0 fw-bold">
                <Icon.XLg />
              </button>
            </div>
            <div className="mb-3 f-1 fs-2 fw-bold text-main">Login</div>

            {message && message}

            <Form onSubmit={(e) => handleSubmitLogin.mutate(e)}>
              <div>
                <input
                  autoFocus
                  type="email"
                  placeholder="Email"
                  id="emailInput"
                  value={email}
                  onChange={handleChange}
                  name="email"
                  className="form-control bg-second py-2 mt-4 f-2 border-main "
                />
              </div>
              <div>
                <input
                  autoFocus
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  id="passwordInput"
                  name="password"
                  className="form-control bg-second py-2 mt-4 f-2 border-main"
                />
              </div>

              <div className="d-grid gap-2 mt-5 pb-3">
                <Button
                  variant="light"
                  className="button-main f-2 fw-bold text-light"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </Form>

            <div>
              <p className="f-2">
                Don't have an account ?
                <button
                  className="bg-white border-0 fw-bold"
                  onClick={switchRegister}
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
