import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import RestApi from "../../services/RestApi";
import { Tools } from "../../services/Tools";

const SipUserForm = () => {
  const [state, setState] = useState({
    id: null,
    uid: "",
    parallel: "",
    password: "",
    profile_id: "",
    group_id: "",
    effectiveCallerIdNumber: "",
    effectiveCallerIdName: "",
    outboundCallerIdNumber: "",
    outboundCallerIdName: "",
    acl: "",
    enable: true,
  });

  const navigate = useNavigate();

  const [options, setOptions] = useState({
    profileOptions: [],
    sipGroupOptions: []
  });

  const params = useParams();

  const load = () => {
    RestApi.getRequest("/sip-users/get-sip-user-options")
      .then((result) => {
        console.log(result.data);
        setOptions(result.data);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          error.response.data.forEach((value) => {
            toast.info(value.message);
          });
        }
      })
      .finally(() => {
        let id = params.id;
        if (id !== undefined) {
          const url = "/sip-users/" + id;
          RestApi.getRequest(url)
            .then((result) => {
              setState(result.data);
            })
            .catch(() => {
              toast.error("Getting Data failed");
            });
        }
      });
  };

  const saveData = (e) => {
    e.preventDefault();
    let req = null;
    if (params.id === undefined) {
      req = RestApi.postRequest("/sip-users", state);
    } else {
      req = RestApi.patchRequest("/sip-users/" + params.id, state);
    }
    req
      .then((data) => {
        if (data.length > 0) {
          data.forEach((value) => {
            toast.error(value.message);
          });
        }
        toast.success("Saved completed successfully");
        navigate("/sip-users/index");
      })
      .catch((error) => {
        if (error.response.status === 422) {
          error.response.data.forEach((value) => {
            toast.info(value.message);
          });
        }
      });
  };

  useEffect(() => {
    load();
  }, []);
  return (
    <Container>
      <h3>SIP User</h3>
      <hr />
      <Form onSubmit={saveData}>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="enable">
              <Form.Label>{Tools.stringToLabel("enable")}</Form.Label>
              <Form.Check
                type="checkbox"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.enable = e.target.checked;
                  setState(tmp);
                }}
                defaultChecked={state.enable}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="uid">
              <Form.Label>{Tools.stringToLabel("User Id")}</Form.Label>
              <Form.Control
                type="text"
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
            <Form.Group className="mb-3" controlId="parallel">
              <Form.Label>{Tools.stringToLabel("parallel")}</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.parallel = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.parallel}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="acl">
              <Form.Label>{Tools.stringToLabel("acl")}</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.acl = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.acl}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>{Tools.stringToLabel("password")}</Form.Label>
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
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="effectiveCallerIdNumber">
              <Form.Label>{Tools.stringToLabel("effective Caller Id Number")}</Form.Label>
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
              <Form.Label>{Tools.stringToLabel("effective Caller Id Name")}</Form.Label>
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
            <Form.Group className="mb-3" controlId="outboundCallerIdNumber">
              <Form.Label>{Tools.stringToLabel("outbound Caller Id Number")}</Form.Label>
              <Form.Control
                type="text"

                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.outboundCallerIdNumber = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.outboundCallerIdNumber}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="outboundCallerIdName">
              <Form.Label>{Tools.stringToLabel("outbound Caller Id Name")}</Form.Label>
              <Form.Control
                type="text"

                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.outboundCallerIdName = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.outboundCallerIdName}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="sipProfiles">
              <Form.Label>{Tools.stringToLabel("SIP Profiles")}</Form.Label>

              <select
                className={"form-select"}
                value={state.profile_id}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.profile_id = e.target.value;
                  setState(tmp);
                }}
              >
                <option value={0}>Select ...</option>
                {options.profileOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="sipUserGroups">
              <Form.Label>{Tools.stringToLabel("SIP User Groups")}</Form.Label>
              <select
                className={"form-select"}
                value={state.group_id}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.group_id = e.target.value;
                  setState(tmp);
                }}
              >
                <option value={0}>Select ...</option>
                {options.sipGroupOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Col>
        </Row>
        <hr />
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
