"use client";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppModal from "../ui/AppModal";
import { Row, Col, FloatingLabel, Image } from "react-bootstrap";
import {
  patientSchema,
  genderOptions,
  statusOptions,
  readUploadedFileAsText,
} from "@/lib/schemas/patientSchema";
import { useEffect, useState } from "react";

function PatientForm(props: any) {
  const deleteMode = props.mode === "delete";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientSchema, { async: true }),
    defaultValues: props.patient || {},
    disabled: deleteMode,
  });
  const [photo, setPhoto] = useState<string | null>(null);
  useEffect(() => {
    reset(props.patient || {}, { keepDefaultValues: true });
  }, [props.patient]);
  const onSubmit = (data: any) => {
    props.handleSubmit(data);
    setPhoto(null);
    reset();
  };
  const onDelete = () => {
    props.handleDelete();
    setPhoto(null);
    reset();
  };
  const onCancel = () => {
    props.handleClose();
    setPhoto(null);
    reset();
  };
  return (
    <AppModal
      show={props.show}
      title={
        props.mode === "add"
          ? "Add patient"
          : deleteMode
          ? "Delete patient"
          : "Edit patient"
      }
      deleteMode={deleteMode}
      image={props.patient?.photo}
      handleSubmit={handleSubmit(onSubmit)}
      handleClose={onCancel}
      handleDelete={onDelete}
    >
      <Form noValidate>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <FloatingLabel controlId="floatingInputName" label="Name *">
              <Form.Control
                type="text"
                {...register("name")}
                isInvalid={!!errors.name}
                required
                placeholder="Name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message && String(errors.name.message)}
              </Form.Control.Feedback>{" "}
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridGender">
            <FloatingLabel controlId="floatingInputGender" label="Gender *">
              <Form.Select
                aria-label="Gender"
                {...register("gender")}
                isInvalid={!!errors.gender}
                required
              >
                <option value="">Select</option>
                {genderOptions.map((gender, index) => (
                  <option value={gender} key={gender}>
                    {gender}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.gender?.message && String(errors.gender.message)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAge">
            <FloatingLabel controlId="floatingInputAge" label="Age *">
              <Form.Control
                type="number"
                {...register("age")}
                isInvalid={!!errors.age}
                required
                placeholder="Age"
              />
              <Form.Control.Feedback type="invalid">
                {errors.age?.message && String(errors.age.message)}
              </Form.Control.Feedback>{" "}
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} controlId="formGriDOB">
            <FloatingLabel controlId="floatingInpuDOB" label="Date of birth">
              <Form.Control
                type="date"
                {...register("dob")}
                isInvalid={!!errors.dob}
                placeholder="Date of birth"
              />
              <Form.Control.Feedback type="invalid">
                {errors.dob?.message && String(errors.dob.message)}
              </Form.Control.Feedback>{" "}
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPhone">
            <FloatingLabel controlId="floatingInputPhone" label="Phone *">
              <Form.Control
                type="text"
                placeholder="Phone"
                required
                {...register("phone")}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone?.message && String(errors.phone.message)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <FloatingLabel controlId="floatingInputEmail" label="Email">
              <Form.Control
                type="email"
                placeholder="Email"
                required
                {...register("email")}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message && String(errors.email.message)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAddress">
            <FloatingLabel controlId="floatingInputAddress" label="Address *">
              <Form.Control
                type="text"
                as={"textarea"}
                rows={4}
                {...register("address")}
                isInvalid={!!errors.address}
                required
                placeholder="Address"
              />
              <Form.Control.Feedback type="invalid">
                {errors.address?.message && String(errors.address.message)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridSymptoms">
            <FloatingLabel controlId="floatingInputSymptoms" label="Symptoms *">
              <Form.Control
                type="text"
                as={"textarea"}
                rows={3}
                {...register("symptoms")}
                isInvalid={!!errors.symptoms}
                required
                placeholder="Symptoms"
              />
              <Form.Control.Feedback type="invalid">
                {errors.symptoms?.message && String(errors.symptoms.message)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDoctor">
            <FloatingLabel controlId="floatingInputDoctor" label="Doctor *">
              <Form.Control
                type="text"
                {...register("doctor")}
                isInvalid={!!errors.doctor}
                required
                placeholder="Doctor"
              />
              <Form.Control.Feedback type="invalid">
                {errors.doctor?.message && String(errors.doctor.message)}
              </Form.Control.Feedback>{" "}
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridStatus">
            <FloatingLabel controlId="floatingInputStatus" label="Status *">
              <Form.Select
                aria-label="Status"
                required
                {...register("status")}
                isInvalid={!!errors.status}
              >
                <option value="">Select</option>
                {statusOptions.map((status, index) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.status?.message && String(errors.status.message)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGriDOA">
            <FloatingLabel
              controlId="floatingInpuDOA"
              label="Date of admission *"
            >
              <Form.Control
                type="date"
                {...register("doa")}
                isInvalid={!!errors.doa}
                required
                value={new Date().toISOString().split("T")[0]}
                placeholder="Date of admission"
              />
              <Form.Control.Feedback type="invalid">
                {errors.doa?.message && String(errors.doa.message)}
              </Form.Control.Feedback>{" "}
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridDOD">
            <FloatingLabel
              controlId="floatingInpuDOD"
              label="Date of discharge"
            >
              <Form.Control
                type="date"
                {...register("dod")}
                isInvalid={!!errors.dod}
                placeholder="Date of discharge"
              />
              <Form.Control.Feedback type="invalid">
                {errors.dod?.message && String(errors.dod.message)}
              </Form.Control.Feedback>{" "}
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} sm={4} controlId="formGridBG">
            <FloatingLabel controlId="floatingInputBG" label="Blood Group">
              <Form.Control
                type="text"
                {...register("bg")}
                isInvalid={!!errors.bg}
                placeholder="Blood Group"
              />
              <Form.Control.Feedback type="invalid">
                {errors.bg?.message && String(errors.bg.message)}
              </Form.Control.Feedback>{" "}
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} sm={4} controlId="formGridBP">
            <FloatingLabel controlId="floatingInputBP" label="Blood Pressure">
              <Form.Control
                type="text"
                {...register("bp")}
                isInvalid={!!errors.bp}
                required
                placeholder="Blood Pressure"
              />
              <Form.Control.Feedback type="invalid">
                {errors.bp?.message && String(errors.bp.message)}
              </Form.Control.Feedback>{" "}
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} sm={4} controlId="formGridSugar">
            <FloatingLabel controlId="floatingInputSugar" label="Sugar">
              <Form.Control
                type="text"
                placeholder="Sugar"
                {...register("sugar")}
                isInvalid={!!errors.sugar}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sugar?.message && String(errors.sugar.message)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} lg={6} controlId="formGridO2">
            <FloatingLabel controlId="floatingInputImage" label="Photo">
              <Form.Control
                type="file"
                accept="image/*"
                placeholder="Photo"
                {...register("photo")}
                isInvalid={!!errors.photo}
                onChange={async (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const photoContent = await readUploadedFileAsText(file);
                    setPhoto(photoContent as string);
                  } else {
                    setPhoto(null);
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.photo?.message && String(errors.photo.message)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} lg={6} controlId="formGridImage" align="center">
            {(photo || props.patient?.photo) && (
              <Image
                rounded
                src={photo || props.patient?.photo}
                thumbnail
                width={"50%"}
                alt="Preview"
              />
            )}
          </Form.Group>
        </Row>
      </Form>
    </AppModal>
  );
}
export default PatientForm;
