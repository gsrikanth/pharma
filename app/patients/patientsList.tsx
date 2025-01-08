"use client";
import Button from "react-bootstrap/esm/Button";
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
import { Image } from "react-bootstrap";
import { LocalForageContext } from "../StoreProvider";
import moment from "moment";

import DataTable from "datatables.net-react";
import BSDT from "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

DataTable.use(BSDT);

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
  const handleDelete = () => {
    if (patient) {
      dispatch(deletePatient(patient, localForage));
      handleClose();
    }
  };
  const patients = useSelector(
    (state: { patients: { data: any } }) => state.patients.data
  );
  const filteredPatients = useSelector(
    (state: { patients: { filteredData: any } }) => state.patients.filteredData
  );
  const dispatch = useDispatch();
  const columns = [
    {
      data: null,
      render: (data: any, type: any, row: any, meta: any) => meta.row + 1,
    },
    { data: "photo", orderable: false },
    { data: "name" },
    { data: "age" },
    { data: "gender" },
    { data: "phone" },
    { data: "symptoms" },
    { data: "doctor" },
    { data: "doa", render: (data: any) => moment(data).format("DD/MM/YYYY") },
    { data: "status" },
    { data: "actions", orderable: false },
  ];

  const slots = {
    1: (data: any, row: any) => {
      return data ? (
        <Image
          rounded
          width={"30em"}
          height={"30em"}
          src={data as string | undefined}
        />
      ) : (
        ""
      );
    },
    10: (data: any, row: any) => {
      return (
        <>
          <Button
            variant="secondary"
            size="sm"
            className="me-1"
            onClick={() => {
              setPatient(row);
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
              setPatient(row);
              setMode("delete");
              setShow(true);
            }}
          >
            <i className="bi bi-trash"></i>
          </Button>
        </>
      );
    },
  };
  return (
    <section>
      <DataTable
        className="table table-striped table-bordered table-hover"
        columns={columns}
        slots={slots}
        options={{
          paging: false,
          info: false,
          autoWidth: false,
          layout: {
            topStart: "search",
            topEnd: {
              buttons: [
                {
                  text: "Add patient",
                  className: "btn-primary",
                  action: function (dt) {
                    setPatient(null);
                    setMode("add");
                    setShow(true);
                  },
                },
                "print",
                "csv",
              ],
            },
          },
        }}
        data={filteredPatients}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
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
      </DataTable>
      <PatientForm
        show={show}
        mode={mode}
        patient={patient}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export default PatientsList;
