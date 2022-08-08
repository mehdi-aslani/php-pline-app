import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import RestApi from "../../services/RestApi";
import { Tools } from "../../services/Tools";

const SipTrunkForm = () => {
  const [state, setState] = useState({
    id: null,
    name: "",
    username: "",
    realm: "",
    from_user: "",
    from_domain: "",
    password: "",
    extension: "",
    proxy: "",
    outbound_proxy: "",
    register: false,
    register_proxy: "",
    expire_seconds: "",
    register_transport: "",
    retry_second: "",
    caller_id_in_from: false,
    contact_params: "",
    ping: "",
    profile_id: "",
    enable: true,
    desc: "",
  });
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const params = useParams();

  const load = () => {
    RestApi.getRequest("/sip-users/get-sip-user-options")
      .then((result) => {

        setOptions(result.data.profileOptions);
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
          const url = "/sip-trunks/" + id;
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
      req = RestApi.postRequest("/sip-trunks", state);
    } else {
      req = RestApi.patchRequest("/sip-trunks/" + params.id, state);
    }

    req
      .then((data) => {
        if (data.length > 0) {
          data.forEach((value) => {
            toast.error(value.message);
          });
        }
        toast.success("Saved completed successfully");
        navigate("/sip-trunks/index");
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
      <h3>SIP Trunk</h3>
      <hr />
      <Form onSubmit={saveData} style={{ marginBottom: "80px" }}>
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
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>{Tools.stringToLabel("name")}</Form.Label>
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
            <Form.Group className="mb-3" controlId="realm">
              <Form.Label>{Tools.stringToLabel("realm")}</Form.Label>
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
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>{Tools.stringToLabel("contact_params")}</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.contact_params = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.contact_params}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="ping">
              <Form.Label>{Tools.stringToLabel("ping")}</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.ping = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.ping}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>{Tools.stringToLabel("username")}</Form.Label>
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
            <Form.Group className="mb-3" controlId="from_user">
              <Form.Label>{Tools.stringToLabel("from User")}</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.from_user = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.from_user}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="from_domain">
              <Form.Label>{Tools.stringToLabel("from Domain")}</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.from_domian = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.from_domain}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="extension">
              <Form.Label>{Tools.stringToLabel("extension")}</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.extension = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.extension}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="proxy">
              <Form.Label>{Tools.stringToLabel("proxy")}</Form.Label>
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
          <Col md={6}>
            <Form.Group className="mb-3" controlId="outbound_proxy">
              <Form.Label>{Tools.stringToLabel("outbound Proxy")}</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.outbound_proxy = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.outbound_proxy}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            {" "}
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
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="register_proxy">
              <Form.Label>{Tools.stringToLabel("register Proxy")}</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.register_proxy = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.register_proxy}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="expire_seconds">
              <Form.Label>{Tools.stringToLabel("expire Secondes")}</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.expire_seconds = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.expire_seconds}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="register_transport">
              <Form.Label>
                {Tools.stringToLabel("register Transport")}
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.register_transport = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.register_transport}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="retry_second">
              <Form.Label>{Tools.stringToLabel("retry Seconds")}</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.retry_second = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.retry_second}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="register">
              <Form.Label>{Tools.stringToLabel("register")}</Form.Label>
              <Form.Check
                type="checkbox"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.register = e.target.checked;
                  setState(tmp);
                }}
                defaultChecked={state.register}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="caller_id_in_from">
              <Form.Label>
                {Tools.stringToLabel("caller Id In From")}
              </Form.Label>
              <Form.Check
                type="checkbox"
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.caller_id_in_from = e.target.checked;
                  setState(tmp);
                }}
                defaultChecked={state.enable}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="desc">
              <Form.Label>{Tools.stringToLabel("description")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.desc = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.register_proxy}
              />
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
