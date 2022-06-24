import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../services/PlineTools";

const YesNo = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

const SipProfileForm = () => {
  const params = useParams();
  const [state, setState] = useState({
    id: null,
    name: "",
    enable: true,
    desc: "",
  });
  const navigate = useNavigate();

  const load = () => {
    let id = params.id;
    if (id !== undefined) {
      const url = "/sip-profiles/" + id;
      getRequest(url)
        .then((result) => {
          setState(result.data);
        })
        .catch(() => {
          toast.error("Getting Data failed");
        });
    } else {
      let tmp = { ...state };
      tmp.enable = 1;
      setState(tmp);
    }
  };

  const saveData = (e) => {
    e.preventDefault();
    let req = null;
    if (params.id === undefined) {
      req = postRequest("/sip-profiles", state);
    } else {
      req = patchRequest("/sip-profiles/" + params.id, state);
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
      <Row>
        <Col>
          <h5>SIP Profiles</h5>
        </Col>
      </Row>
      <hr />
      <Form onSubmit={saveData}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={state.name}
            onChange={(e) => {
              let tmp = { ...state };
              tmp.name = e.target.value;
              setState(tmp);
            }}
          />
        </Form.Group>
        <Col>
          <Row md={3}>
            <Form.Group className="mb-3" controlId="enable">
              <Form.Label>Enable</Form.Label>
              <Select
                isMulti={false}
                required
                options={YesNo}
                defaultValue={state.enable === true ? YesNo[0] : YesNo[1]}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.enable = e.value;
                  setState(tmp);
                }}
              />
            </Form.Group>
          </Row>
        </Col>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as={"textarea"}
            rows={3}
            maxLength={1024}
            defaultValue={state.description}
            onChange={(e) => {
              let tmp = { ...state };
              tmp.description = e.target.value;
              setState(tmp);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>{" "}
        <Button
          onClick={() => {
            navigate("/sip-profiles/index");
          }}
          variant="danger"
          type="button"
        >
          Cancel
        </Button>
      </Form>
    </section>
  );
};

export default SipProfileForm;
