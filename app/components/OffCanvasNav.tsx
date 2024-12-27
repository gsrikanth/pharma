"use client";
import Nav from "react-bootstrap/Nav";
import { usePathname } from "next/navigation";
import { Navbar, Offcanvas } from "react-bootstrap";
import SideNav from "./SideNav";

export default function OffCanvasNav() {
  return (
    <Navbar.Offcanvas
      id={`offcanvasNavbar-expand-sideNav`}
      aria-labelledby={`offcanvasNavbar-expand-sideNav`}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id={`offcanvasNavbar-expand-sideNav`}>
          PharmLabs
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SideNav />
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  );
}
