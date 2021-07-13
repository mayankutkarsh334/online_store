import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            made by <strong>Mayank Utkarsh</strong>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
