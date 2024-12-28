"use client";

import { usePathname } from "next/navigation";

import { Container, Navbar } from "react-bootstrap";

export const TopNav = () => {
  const pathname = usePathname();

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src="/img/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Pharmacy
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Patients</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
