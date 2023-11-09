import { Container, Col, Row } from "react-bootstrap";
import C_Register from "../components/C_Register";

function P_Register() {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <C_Register />
        </Col>
      </Row>
    </Container>
  );
}

export default P_Register;
