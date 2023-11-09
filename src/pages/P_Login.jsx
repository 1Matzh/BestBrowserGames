import { Container, Col, Row } from "react-bootstrap";
import C_Login from "../components/C_Login";

function P_Login() {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <C_Login />
        </Col>
      </Row>
    </Container>
  );
}

export default P_Login;
