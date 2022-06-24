import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { getRequest, postRequest } from "../../services/PlineTools";

const SipUserForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({});
  useEffect(() => {
    getRequest("/sip-users")
      .then((result) => {
        setState(result);
      })
      .catch(() => {
        toast.error("Getting Data failed");
      });
  }, []);

  const saveData = (e) => {
    e.preventDefault();
    postRequest("/save-sip-users", state).then((result) => {
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
      <h3>Sip User</h3>
      <hr />
      <Form onSubmit={saveData}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="enable">
              <Form.Check
                type="checkbox"
                label="Enable"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.enable = e.target.checked;
                  setState(tmp);
                }}
                onClick={(e) => {
                  let tmp = { ...state };
                  tmp.enable = e.target.checked;
                  setState(tmp);
                }}
                defaultChecked={state.enable}
              />
            </Form.Group>
          </Col>
          <Col md={6}></Col>
        </Row>
        <Row>
          <Col md={6}>
            {" "}
            <Form.Group className="mb-3" controlId="uid">
              <Form.Label>Uid</Form.Label>
              <Form.Control
                type="uid"
                required
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.uid = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.uid}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            {" "}
            <Form.Group className="mb-3" controlId="parallel">
              <Form.Label>Parallel</Form.Label>
              <Form.Control
                type="parallel"
                required
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.parallel = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.uid}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="acl">
              <Form.Label>Acl</Form.Label>
              <Form.Control
                type="acl"
                required
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.acl = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.uid}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.password = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.uid}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="effectiveCallerIdNumber">
              <Form.Label>Effective CallerId Number</Form.Label>
              <Form.Control
                type="effectiveCallerIdNumber"
                required
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.effectiveCallerIdNumber = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.uid}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="effectiveCallerIdName">
              <Form.Label>Effective CallerId Name</Form.Label>
              <Form.Control
                type="effectiveCallerIdName"
                required
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.effectiveCallerIdName = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.uid}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {" "}
            <Form.Group className="mb-3" controlId="outboundCallerIdNumber">
              <Form.Label>Outbound CallerId Number</Form.Label>
              <Form.Control
                type="outboundCallerIdNumber"
                required
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.outboundCallerIdNumber = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.uid}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            {" "}
            <Form.Group className="mb-3" controlId="outboundCallerIdName">
              <Form.Label>Outbound CallerId Name</Form.Label>
              <Form.Control
                type="outboundCallerIdName"
                required
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.outboundCallerIdName = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.uid}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {" "}
            <Form.Group className="mb-3" controlId="Profile">
              <Form.Label>Profile</Form.Label>
              <Form.Control
                type="Profile"
                required
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.Profile = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.uid}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            {" "}
            <Form.Group className="mb-3" controlId="sipUserGroup">
              <Form.Label>SIP User group</Form.Label>
              <Form.Control
                type="sipUserGroup"
                required
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.sipUserGroup = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.uid}
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

export default SipUserForm;
