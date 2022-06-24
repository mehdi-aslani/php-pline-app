import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getRequest,
  postRequest,
  stringToLabel,
} from "../../services/PlineTools";
import Select from "react-select";

const YesNo = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

let sipProfiles = [];

/************************************************** */

const SipTrunkForm = () => {
  const [state, setState] = useState({
    cidr: "",
    description: "",
    effectiveCallerIdName: "",
    effectiveCallerIdNumber: "",
    enable: true,
    fromDomain: "",
    fromUser: "",
    maxCalls: 30,
    name: "",
    password: "",
    prefixCallerIdNumber: "",
    proxy: "",
    realm: "",
    register: false,
    tblSipProfile: null,
    username: "",
  });
  const navigate = useNavigate();
  const params = useParams();

  const load = () => {
    let id = params.id;
    if (id === undefined) {
      id = "";
    }
    const url = "/sip-trunks/get?id=" + id;
    getRequest(url)
      .then((result) => {
        sipProfiles = [];
        result.sipProfiles.forEach((v) => {
          sipProfiles.push({ value: v.id, label: v.name });
        });
        setState(result.data);
      })
      .catch(() => {
        toast.error("Getting Data failed");
      });
  };

  const saveData = (e) => {
    e.preventDefault();
    let action = "create";
    if (params.id !== undefined) {
      action = "update";
    }
    postRequest("/sip-trunks/" + action, state).then((result) => {
      if (result.error) {
        result.errorsDesc.forEach((value) => {
          toast.error(value);
        });
      } else {
        toast.success("Saved completed successfully");
        navigate("/sip-trunks/index");
      }
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container>
      <h3>SIP Trunk</h3>
      <hr />
      <Form onSubmit={saveData} style={{ marginBottom: "80px" }}>
        <Row>
          <Col md={6}>
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
            <Form.Group className="mb-3" controlId="cidr">
              <Form.Label>Cidr</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.cidr = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.cidr}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.username = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.username}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.password = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.password}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* ******************************* */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="realm">
              <Form.Label>Realm</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.realm = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.realm}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="proxy">
              <Form.Label>Proxy</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.proxy = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.proxy}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}></Col>
          <Col md={6}></Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="fromDomain">
              <Form.Label>From Domain</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.fromDomain = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.fromDomain}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="fromUser">
              <Form.Label>From User</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.fromUser = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.fromUser}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="effectiveCallerIdNumber">
              <Form.Label>Effective Caller Id Number</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.effectiveCallerIdNumber = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.effectiveCallerIdNumber}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="effectiveCallerIdName">
              <Form.Label>Effective Caller Id Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.effectiveCallerIdName = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.effectiveCallerIdName}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="prefixCallerIdNumber">
              <Form.Label>Prefix Caller IdNumber</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.prefixCallerIdNumber = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.prefixCallerIdNumber}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="maxCalls">
              <Form.Label>Max Calls</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.maxCalls = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.maxCalls}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="register">
              <Form.Label>{stringToLabel("register")}</Form.Label>
              <Select
                isMulti={false}
                required
                options={YesNo}
                defaultValue={state.register === true ? YesNo[0] : YesNo[1]}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.register = e.value;
                  setState(tmp);
                }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="tblSipProfile">
              <Form.Label>{stringToLabel("SIP Profile")}</Form.Label>
              <Select
                required
                isMulti={false}
                options={sipProfiles}
                defaultValue={() => {
                  return sipProfiles[0];
                }}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.tblSipProfile = { id: e.value };
                  setState(tmp);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
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
          <Col md={6}>
            <Form.Group className="mb-3" controlId="enable">
              <Form.Label>{stringToLabel("enable")}</Form.Label>
              <Select
                required
                isMulti={false}
                options={YesNo}
                defaultValue={() => {
                  return state.enable ? YesNo[0] : YesNo[1];
                }}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.enable = e.value;
                  setState(tmp);
                }}
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
                navigate("/sip-trunks/index");
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SipTrunkForm;
