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
  filterPatients,
} from "../../lib/features/patients/patientSlice";
import { PatientType } from "@/lib/schemas/patientSchema";
import {
  ButtonGroup,
  ButtonToolbar,
  Container,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { LocalForageContext } from "../StoreProvider";

function PatientsList() {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("add");
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<PatientType | null>(null);
  const localForage = useContext(LocalForageContext);
  useEffect(() => {
    if (localForage) {
      localForage.getItem("patients").then((data) => {
        setLoading(false);
        if (data) {
          const patientsData: PatientType[] = data as PatientType[];
          dispatch(loadPatients(patientsData));
        }
      });
    } else {
      setLoading(false);
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
  const filteredPatients = useSelector(
    (state: { patients: { filteredData: any } }) => state.patients.filteredData
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
        className="clearfix mb-1"
      >
        <Container fluid className="clearfix m-0 p-0">
          <InputGroup size="sm" className="float-start">
            <Form.Control
              type="text"
              size="sm"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="btnGroupAddon"
              onChange={(e) => {
                dispatch(filterPatients(e.target.value));
              }}
            />
          </InputGroup>
          <ButtonGroup aria-label="Add buttons" size="sm" className="float-end">
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
        </Container>
      </ButtonToolbar>
      <Table striped bordered hover responsive>
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
              <td colSpan={10}>
                {loading ? <Spinner size="sm"></Spinner> : "No patients!"}
              </td>
            </tr>
          </tbody>
        )}
        <tbody>
          {filteredPatients.map((patient: PatientType, index: number) => (
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
