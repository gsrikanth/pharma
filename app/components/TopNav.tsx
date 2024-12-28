"use client";

import { usePathname } from "next/navigation";

import { Container, Nav, Navbar } from "react-bootstrap";

export const TopNav = () => {
  const pathname = usePathname();

  return (
    <Navbar sticky="top" data-bs-theme="dark" variant="dark" bg="dark">
      <Container fluid>
        <Navbar.Brand>
          {/* <img
            alt=""
            src="/img/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          /> */}
          Pharmacy
        </Navbar.Brand>
        <Nav variant="pill" activeKey={pathname}>
          <Nav.Item>
            <Nav.Link href="/patients">Patients</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};
