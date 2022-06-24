import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import "./ChangePassword.css";

function ChangePassword() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["pline-hotkey"]);
  const [state] = useState({
    oldPass: "",
    newPass: "",
    repNewPass: "",
    token: cookies.token,
    username: cookies.username,
  });

  const saveData = (e) => {
    e.preventDefault();
    state.token = cookies.token;
    state.username = cookies.username;
    window.global.post("/users/change-password", state).then((result) => {
      if (result.error) {
        result.errors.forEach((v) => {
          toast.error(v);
        });
      } else {
        setCookie("token", result.token);
        toast.success("Your password was successfully changed");
        navigate("/home");
      }
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="cng-pass">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h3>Change Password</h3>
          <hr />
          <Form onSubmit={saveData}>
            <Form.Group className="mb-3">
              <Form.Label>Old Username</Form.Label>
              <Form.Control
                type="password"
                name="oldPass"
                defaultValue={state?.oldPass}
                onChange={(e) => {
                  state.oldPass = e.target.value;
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Username</Form.Label>
              <Form.Control
                name="newPass"
                type="password"
                defaultValue={state?.newPass}
                onChange={(e) => {
                  state.newPass = e.target.value;
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Repeat New Password </Form.Label>
              <Form.Control
                name="repNewPass"
                type="password"
                defaultValue={state?.repNewPass}
                onChange={(e) => {
                  state.repNewPass = e.target.value;
                }}
              />
            </Form.Group>
            <Form.Group className="mb-5">
              <Button variant="primary" type="submit">
                Change Password
              </Button>{" "}
              <Button
                onClick={() => {
                  navigate("/home");
                }}
                variant="danger"
                type="button"
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ChangePassword;
