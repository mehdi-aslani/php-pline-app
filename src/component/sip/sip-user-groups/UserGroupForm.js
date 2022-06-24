import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { getRequest, postRequest } from "../../services/PlineTools";

const UserGroupForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({});
  useEffect(() => {
    getRequest("/sip-user-groups")
      .then((result) => {
        setState(result);
      })
      .catch(() => {
        toast.error("Getting Data failed");
      });
  }, []);

  const saveData = (e) => {
    e.preventDefault();
    postRequest("/save-sip-user-groups", state).then((result) => {
      if (result.error) {
        result.errorsDesc.forEach((value) => {
          toast.error(value);
        });
      } else {
        toast.success("Saved completed successfully");
        navigate("/home");
      }
    });
  };
  return (
    <Container>
      <h3>SIP User Groups</h3>
      <hr />
      <Form onSubmit={saveData}>
        <Row>
          <Col md={6}>
            {" "}
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.name = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.name}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            {" "}
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                maxLength={1024}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.description = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.description}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button variant="primary" type="submit">
              Save
            </Button>{" "}
            <Button
              variant="danger"
              onClick={() => {
                navigate("/home");
              }}
            >
              Cancel
            </Button>{" "}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UserGroupForm;
