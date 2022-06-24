import React from "react";
import { Alert, Col, Row } from "react-bootstrap";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Alert key={0} variant={"primary"}>
            <h5>Welcome P-Line NGN PBX</h5>
          </Alert>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
