import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import RestApi from "../../services/RestApi";
import { Tools } from "../../services/Tools";

const SipProfileForm = () => {
  const params = useParams();
  const [parameters, setParameters] = useState([]);
  const [state, setState] = useState({
    id: null,
    name: "",
    enable: true,
    parameters: {
      username: "pline",
      "user-agent-string": "pline"
    },
    description: "",
  });
  const navigate = useNavigate();

  const load = () => {
    let id = params.id;
    if (id !== undefined) {
      const url = "/sip-profiles/" + id;
      RestApi.getRequest(url)
        .then((result) => {
          result.data.parameters = JSON.parse(result.data.parameters);
          setState(result.data);
        })
        .catch(() => {
          toast.error("Getting Data failed");
        })
        .finally(drawControllers);
    } else {
      let tmp = { ...state };
      tmp.enable = true;
      setState(tmp);
      drawControllers();
    }
  };

  const drawControllers = () => {
    RestApi.getRequest("/spps/get-all")
      .then((result) => {
        let data = [];
        for (let i = 0; i < result.data.length; i += 2) {
          let elm = [];
          elm.push(result.data[i]);
          if (i + 1 < result.data.length) {
            elm.push(result.data[i + 1]);
          } else {
            elm.push(null);
          }
          data.push(elm);
        }
        setParameters(data);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          error.response.data.forEach((value) => {
            toast.info(value.message);
          });
        }
      });
  };

  const saveData = (e) => {
    e.preventDefault();
    let req = null;
    if (params.id === undefined) {
      req = RestApi.postRequest("/sip-profiles", state);
    } else {
      req = RestApi.patchRequest("/sip-profiles/" + params.id, state);
    }

    req
      .then((data) => {
        if (data.length > 0) {
          data.forEach((value) => {
            toast.error(value.message);
          });
        }
        toast.success("Saved completed successfully");
        navigate("/sip-profiles/index");
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
    <section>
      <Form onSubmit={saveData}>
        <Row>
          <h5>SIP Profiles</h5>
          <hr />
          <Col md={12}>
            <Form.Group className="mb-3" controlId="enable">
              <Form.Label>{Tools.stringToLabel("enable")}</Form.Label>
              <Form.Check
                type="checkbox"
                required={true}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.enable = e.target.checked;
                  setState(tmp);
                }}
                defaultChecked={state.enable}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>{Tools.stringToLabel("name")}</Form.Label>
              <Form.Control
                type="text"
                required={true}
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
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>{Tools.stringToLabel("description")}</Form.Label>
              <Form.Control
                type="textarea"
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

        <h5>Profile Parameters</h5>
        <hr />
        {parameters.map((value, key) => {
          return (
            <Row key={"k0-" + key}>
              <Col md={6}>
                <Form.Group className="mb-3" controlId={`id-${value[0].id}`}>
                  <Form.Label>{Tools.stringToLabel(value[0].name)}</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={
                      Object.keys(state.parameters).includes(value[0].name)
                        ? state.parameters[value[0].name]
                        : value[0].value
                    }
                    onChange={(e) => {
                      let tmp = { ...state };
                      tmp.parameters[value[0].name] = e.target.value;
                      setState(tmp);
                    }}
                  />
                  <Form.Text className="text-muted">
                    <span style={{ color: "blue" }}>{value[0].desc}</span>
                  </Form.Text>
                </Form.Group>
              </Col>
              {value[1] != null && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId={`id-${value[1].id}`}>
                    <Form.Label>
                      {Tools.stringToLabel(value[1].name)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={
                        Object.keys(state.parameters).includes(value[1].name)
                          ? state.parameters[value[1].name]
                          : value[1].value
                      }
                      onChange={(e) => {
                        let tmp = { ...state };
                        tmp.parameters[value[1].name] = e.target.value;
                        setState(tmp);
                      }}
                    />
                    <Form.Text className="text-muted">
                      <span style={{ color: "blue" }}>{value[1].desc}</span>
                    </Form.Text>
                  </Form.Group>
                </Col>
              )}
            </Row>
          );
        })}
        <hr />
        <Row>
          <Col md={12}>
            <Button variant="primary" type="submit">
              Save
            </Button>{" "}
            <Button
              variant="danger"
              onClick={() => {
                navigate("/sip-profiles/index");
              }}
            >
              Cancel
            </Button>{" "}
          </Col>
        </Row>
        <br />
      </Form>
    </section>
  );
};

export default SipProfileForm;
