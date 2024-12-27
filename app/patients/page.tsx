import type { Metadata } from "next";
import { Container } from "react-bootstrap";
import PatientsList from "./patientsList";

export default function Page() {
  return (
    <Container>
      <h4>Patients</h4>
      <PatientsList />
    </Container>
  );
}

export const metadata: Metadata = {
  title: "Patients",
};
