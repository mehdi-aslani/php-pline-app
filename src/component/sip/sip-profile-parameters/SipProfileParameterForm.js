import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import RestApi from "../../services/RestApi";
import { Tools } from "../../services/Tools";

const SipProfileParameters = () => {
  const [state, setState] = useState({
    name: "",
    value: "",
    desc: "",
    id: null,
  });
  const navigate = useNavigate();
  const params = useParams();

  const load = () => {
    let id = params.id;
    if (id !== undefined) {
      const url = "/spps/" + id;
      RestApi.getRequest(url)
        .then((result) => {
          setState(result.data);
        })
        .catch(() => {
          toast.error("Getting Data failed");
        });
    }
  };

  const saveData = (e) => {
    e.preventDefault();
    let req = null;
    if (params.id === undefined) {
      req = RestApi.postRequest("/spps", state);
    } else {
      req = RestApi.patchRequest("/spps/" + params.id, state);
    }

    req
      .then((data) => {
        if (data.length > 0) {
          data.forEach((value) => {
            toast.error(value.message);
          });
        }
        toast.success("Saved completed successfully");
        navigate("/spp/index");
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
      <h3>SIP Profile Parameter</h3>
      <hr />
      <Form onSubmit={saveData}>
        <Row>
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
            <Form.Group className="mb-3" controlId="value">
              <Form.Label>{Tools.stringToLabel("Default Value")}</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.value = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.value}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="desc">
              <Form.Label>{Tools.stringToLabel("description")}</Form.Label>
              <Form.Control
                as="textarea"
                maxLength={1024}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.desc = e.target.value;
                  setState(tmp);
                }}
                defaultValue={state.desc}
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
                navigate("/spp/index");
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

export default SipProfileParameters;
