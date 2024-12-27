"use client";
import Nav from "react-bootstrap/Nav";
import { usePathname } from "next/navigation";

export default function SideNav() {
  return (
    <Nav className="flex-column" variant="underline">
      <Nav.Link
        type=""
        href="/dashboard"
        active={usePathname() === "/dashboard"}
      >
        Dashboard
      </Nav.Link>
      <Nav.Link href="/patients" active={usePathname() === "/patients"}>
        Patients
      </Nav.Link>
    </Nav>
  );
}
