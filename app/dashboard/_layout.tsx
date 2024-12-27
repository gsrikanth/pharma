import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideNav from "../components/SideNav";
import { ReactNode } from "react";
interface Props {
  readonly children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <Container>
      {/* Columns are always 50% wide, on mobile and desktop */}
      <Row>
        <Col xs={3}>
          <SideNav />
        </Col>
        <Col xs={9}>{children}</Col>
      </Row>
    </Container>
  );
}
