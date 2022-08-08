import { Button } from "react-bootstrap";
import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Col, Form, Row, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import RestApi from "../../services/RestApi";
import { Tools } from "../../services/Tools";

const SipProfileDetails = () => {
  const profileParam = useParams();
  const [params, setParams] = useState({
    endpoint: [],
    auth: [],
    transport: [],
    contact: [],
    aor: [],
  });
  const [state, setState] = useState({});
  const [key, setKey] = useState("endpoint");
  const navigate = useNavigate();

  useEffect(() => {
    const id = profileParam.id;
    RestApi.getRequest("/sip-profile-details/get?id=" + id).then((data) => {
      setState(data);
      RestApi.getRequest("/sip-profile-details/params").then((result) => {
        if (result.error) {
          result.errorsDesc.forEach((v) => {
            toast.error(v);
          });
        } else {
          setParams(result);
        }
      });
      /////////////
    });
    ///////////////
  }, []);

  const draw = (_type, v, i) => {
    if (state[_type] === undefined) {
      state[_type] = {};
    }

    let select = {};

    if (v[1] === "Custom") {
      let obj = [];
      Object.keys(v[2]).forEach((val) => {
        obj.push({
          value: val,
          label: Tools.stringToLabel(v[2][val]),
        });

        if (state[_type][v[0]] === undefined) {
          if (v[3] === val) {
            select = { value: val, label: Tools.stringToLabel(v[2][val]) };
          }
        } else {
          let data = state[_type][v[0]];
          try {
            data = JSON.parse(data);
          } catch {}

          console.log(data, typeof data);

          if (Array.isArray(data)) {
            select = [];
            data.forEach((e) => {
              e = e.trim();
              select.push({
                value: e,
                label: Tools.stringToLabel(v[2][e]),
              });
            });
          } else {
            select = {
              value: data,
              label: Tools.stringToLabel(data),
            };
          }
        }
      });

      return (
        <Row key={i}>
          <Col>
            <Form.Group className="mb-3" controlId={v[0]}>
              <Form.Label>{Tools.stringToLabel(v[0])}</Form.Label>
              <Select
                isMulti={v[5] === undefined ? false : v[5]}
                options={obj}
                defaultValue={select}
                onChange={(e) => {
                  let tmp = { ...state };
                  if (Array.isArray(e)) {
                    let arr = [];
                    e.forEach((val) => {
                      arr.push(val.value);
                    });
                    tmp[_type][v[0]] = JSON.stringify(arr);
                  } else {
                    tmp[_type][v[0]] = e.value;
                  }
                  setState(tmp);
                }}
              />
              <Form.Text className="text-muted">{v[4]}</Form.Text>
            </Form.Group>
          </Col>
        </Row>
      );
    } else if (v[1] === "Boolean") {
      if (state[_type][v[0]] === undefined) {
        select = v[3];
      } else {
        select = state[_type][v[0]];
      }
      return (
        <Row key={i}>
          <Col>
            <Form.Group className="mb-3" controlId={v[0]}>
              <Form.Check
                type="checkbox"
                label={Tools.stringToLabel(v[0])}
                defaultChecked={select}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp[_type][v[0]] = e.target.value;
                  setState(tmp);
                }}
              />
              <Form.Text className="text-muted">{v[4]}</Form.Text>
            </Form.Group>
          </Col>
        </Row>
      );
    } else if (v[1] === "Integer") {
      if (state[_type][v[0]] === undefined) {
        select = v[3];
      } else {
        select = state[_type][v[0]];
      }
      return (
        <Row key={i}>
          <Col>
            <Form.Group className="mb-3" controlId={v[0]}>
              <Form.Label>{Tools.stringToLabel(v[0])}</Form.Label>
              <Form.Control
                type="number"
                name={v[0]}
                defaultValue={select}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp[_type][v[0]] = e.target.value;
                  setState(tmp);
                }}
              />
              <Form.Text className="text-muted">{v[4]}</Form.Text>
            </Form.Group>
          </Col>
        </Row>
      );
    } else {
      if (state[_type][v[0]] === undefined) {
        select = v[3];
      } else {
        select = state[_type][v[0]];
      }

      return (
        <Row key={i}>
          <Col>
            <Form.Group className="mb-3" controlId={v[0]}>
              <Form.Label>{Tools.stringToLabel(v[0])}</Form.Label>
              <Form.Control
                type="text"
                name={v[0]}
                defaultValue={select}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp[_type][v[0]] = e.target.value;
                  setState(tmp);
                }}
              />
              <Form.Text className="text-muted">{v[4]}</Form.Text>
            </Form.Group>
          </Col>
        </Row>
      );
    }
  };

  const submit = (e) => {
    e.preventDefault();
    state.id = profileParam.id;
    RestApi.postRequest("/sip-profile-details/save", state)
      .then((result) => {
        if (result.error) {
          toast.error(
            "An error occurred while executing your request. Contact the system administrator"
          );
        } else {
          toast.success("Information successfully recorded");
          navigate("/sip-profiles/index");
        }
      })
      .catch((error) => {
        toast.error(
          "An error occurred while executing your request. Contact the system administrator\n" +
            error
        );
      });
  };

  return (
    <div>
      <Form onSubmit={submit}>
        <Tabs
          id="controlled-tab"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="endpoint" title="Endpoint">
            {params.endpoint.map((v, i) => {
              return draw("endpoint", v, i);
            })}
          </Tab>
          <Tab eventKey="auth" title="Auth">
            {params.auth.map((v, i) => {
              return draw("auth", v, i);
            })}
          </Tab>
          <Tab eventKey="transport" title="Transport">
            {params.transport.map((v, i) => {
              return draw("transport", v, i);
            })}
          </Tab>
          <Tab eventKey="contact" title="Contact">
            {params.contact.map((v, i) => {
              return draw("contact", v, i);
            })}
          </Tab>
          <Tab eventKey="aor" title="AOR">
            {params.aor.map((v, i) => {
              return draw("aor", v, i);
            })}
          </Tab>
        </Tabs>
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
          Back
        </Button>
      </Form>
    </div>
  );
};

export default SipProfileDetails;
