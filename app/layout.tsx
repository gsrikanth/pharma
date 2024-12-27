import type { ReactNode } from "react";

import { StoreProvider } from "./StoreProvider";
import { TopNav } from "./components/TopNav";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Col, Container, Row, Stack } from "react-bootstrap";
import SideNav from "./components/SideNav";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body style={{ backgroundColor: "#f8f9fa", paddingTop: "60px" }}>
          <TopNav />
          <Container fluid>
            <Row>
              <Col xs={1}>
                <SideNav />
              </Col>
              <Col xs={11}>
                <main>{children}</main>
              </Col>
            </Row>
          </Container>
        </body>
      </html>
    </StoreProvider>
  );
}
