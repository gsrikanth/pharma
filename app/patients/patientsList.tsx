"use client";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import PatientForm from "./patientForm";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addPatient,
  editPatient,
  deletePatient,
  loadPatients,
} from "../../lib/features/patients/patientSlice";
import { PatientType } from "@/lib/schemas/patientSchema";
import { ButtonGroup, ButtonToolbar, Container } from "react-bootstrap";
import { LocalForageContext } from "../StoreProvider";

function PatientsList() {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("add");
  const [patient, setPatient] = useState<PatientType | null>(null);
  const localForage = useContext(LocalForageContext);
  useEffect(() => {
    if (localForage) {
      localForage.getItem("patients").then((data) => {
        if (data) {
          const patientsData: PatientType[] = data as PatientType[];
          dispatch(loadPatients(patientsData));
        }
      });
    }
  }, []);
  const handleClose = () => {
    setPatient(null);
    setShow(false);
  };
  const handleSubmit = (data: PatientType) => {
    dispatch(
      patient ? editPatient(data, localForage) : addPatient(data, localForage)
    );
    handleClose();
  };
  const patients = useSelector(
    (state: { patients: { data: any } }) => state.patients.data
  );
  const dispatch = useDispatch();
  return (
    <section>
      <PatientForm
        show={show}
        mode={mode}
        patient={patient}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <ButtonToolbar
        aria-label="Toolbar with action button groups"
        className="justify-content-end p-1"
      >
        <ButtonGroup aria-label="Action buttons" size="sm">
          <Button
            variant="primary"
            onClick={() => {
              setPatient(null);
              setMode("add");
              setShow(true);
            }}
          >
            <i className="bi bi-person-add"></i> New Patient
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Symptoms</th>
            <th>Doctor</th>
            <th>Date of Admission</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {patients.length === 0 && (
          <tbody>
            <tr>
              <td colSpan={10}>No patients!</td>
            </tr>
          </tbody>
        )}
        <tbody>
          {patients.map((patient: PatientType, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.phone}</td>
              <td>{patient.symptoms}</td>
              <td>{patient.doctor}</td>
              <td>{patient.doa.toLocaleDateString()}</td>
              <td>{patient.status}</td>
              <td>
                <Button
                  variant="secondary"
                  size="sm"
                  className="me-1"
                  onClick={() => {
                    setPatient(patient);
                    setMode("edit");
                    setShow(true);
                  }}
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>
                <Button
                  variant="danger"
                  className="me-1"
                  size="sm"
                  onClick={() => {
                    dispatch(deletePatient(patient, localForage));
                  }}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}

export default PatientsList;
