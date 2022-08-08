import React from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ImportContacts() {
  const navigate = useNavigate();

  const upload = (e) => {
    e.preventDefault();
    const file = document.getElementById("file");
    window.global.upload("/contacts/upload", file.files[0]).then((result) => {
      console.log("====================================");
      console.log(result);
      console.log("====================================");
      if (result.error === true) {
        result.errors.forEach((v) => {
          toast.error(v);
        });
      } else {
        toast.success("پردازش فایل به اتمام رسید");
        navigate("/contact/index");
      }
    });
  };

  return (
    <div>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Alert variant={"info"}>
            <h5>فایل در قالب فایل CSV و به صورت زیر تهیه شود:</h5>
            <ul>
              <li>ستون اول نام مخاطب</li>
              <li>ستون دوم نام خانوادگی مخاطب</li>
              <li>ستون سوم شماره موبایل بدون صفر اول مخاطب</li>
              <li>ستون چهارم کد مخاطب</li>
              <li>ستون پنچم ملاحظات (این ستون اجباری نمی باشد)</li>
            </ul>
          </Alert>
          <hr />
          <Form onSubmit={upload} encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>فایل خود را با فرمت CSV انتخاب کنید </Form.Label>
              <Form.Control type="file" id="file" />
            </Form.Group>
            <Button type={"submit"}>ارسال فایل</Button>{" "}
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
        </Col>
      </Row>
    </div>
  );
}

export default ImportContacts;
