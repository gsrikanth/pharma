"use client";
import { Button, Modal, Image } from "react-bootstrap";

function AppModal(props: any) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.image && (
            <Image
              rounded
              width={"25em"}
              height={"25em"}
              src={props.image as string | undefined}
            />
          )}
          <label className="ms-1">{props.title}</label>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        {props.deleteMode ? (
          <Button variant="danger" onClick={props.handleDelete}>
            Delete
          </Button>
        ) : (
          <Button variant="primary" onClick={props.handleSubmit}>
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default AppModal;
