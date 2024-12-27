"use client";

import { usePathname } from "next/navigation";

import { Container, Navbar } from "react-bootstrap";

export const TopNav = () => {
  const pathname = usePathname();

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand>Pharmacy</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sideNav`} />
      </Container>
    </Navbar>
  );
};
