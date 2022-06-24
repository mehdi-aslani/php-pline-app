import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FormContact = () => {
  const params = useParams();
  const [state, setState] = useState();
  const navigate = useNavigate();

  const saveData = (e) => {
    e.preventDefault();

    let url = "/contacts";
    if (state.id == null) {
      url += "/create";
    } else {
      url += "/update";
    }

    window.global
      .post(url, state)
      .then((result) => {
        if (result.errors !== undefined || result.error) {
          result.errors.forEach((v) => {
            toast.error(v);
          });

          setState({
            id: state.id,
            name: state.name,
            family: state.family,
            mobile: state.mobile,
            hotkey: state.hotkey,
            description: state.description,
            enable: state.enable,
            error: result.description,
          });
        } else {
          toast.success("اطلاعات با موفقیت ثبت شد");
          navigate("/contact/index");
        }
      })
      .catch((error) => {
        toast.error(
          "ارتباط با سرور دچار مشکل شده است لطفا با راهبر سیستم تماس بگیرید" +
            "\n" +
            error
        );
      });
  };

  const getData = (id) => {
    if (id === undefined) {
      setState({
        id: null,
        name: "",
        family: "",
        mobile: "",
        hotkey: "",
        description: "",
        enable: true,
      });
    } else {
      window.global
        .get("/contacts/get/" + id)
        .then((data) => {
          data.error = [];
          setState(data);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  useEffect(() => {
    getData(params.id);
  }, [params.id]);

  return (
    <section>
      <Row>
        <Col>
          <h5>ایجاد مخاطب جدید</h5>
        </Col>
      </Row>
      <hr />
      <Form onSubmit={saveData}>
        <Form.Group className="mb-3">
          <Form.Label>نام </Form.Label>
          <Form.Control
            type="text"
            name="name"
            defaultValue={state?.name}
            onChange={(e) => {
              state.name = e.target.value;
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>نام خانوادگی</Form.Label>
          <Form.Control
            name="family"
            type="text"
            defaultValue={state?.family}
            onChange={(e) => {
              state.family = e.target.value;
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>شماره همراه</Form.Label>
          <Form.Control
            name="mobile"
            type="text"
            placeholder="لطفا شماره موبایل را بدون صفر اول وارد کنید"
            maxLength={10}
            defaultValue={state?.mobile}
            onChange={(e) => {
              state.mobile = e.target.value;
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>کد مخاطب</Form.Label>
          <Form.Control
            name="hotkey"
            type="text"
            placeholder=""
            maxLength={10}
            defaultValue={state?.hotkey}
            onChange={(e) => {
              state.hotkey = e.target.value;
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ملاحظات</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={state?.description}
            onChange={(e) => {
              state.description = e.target.value;
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            name="description"
            type="checkbox"
            label="مخاطب فعال باشد"
            defaultChecked={state?.enable}
            onChange={(e) => {
              state.enable = e.target.checked;
            }}
            onClick={(e) => {
              state.enable = e.target.checked;
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          ثبت اطلاعات
        </Button>{" "}
        <Button
          onClick={() => {
            navigate("/contact/index");
          }}
          variant="danger"
          type="button"
        >
          بازگشت
        </Button>
      </Form>
    </section>
  );
};

export default FormContact;
