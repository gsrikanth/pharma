import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  interface ImageUploadProps {}

  interface ImageUploadState {
    selectedImage: File | null;
    previewUrl: string;
  }

  useEffect(() => {
    console.log(previewUrl);
  }, [previewUrl]);

  const getBase64 = (
    file: Blob,
    callback: (arg0: string | ArrayBuffer | null) => any
  ) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      return;
    }
    setSelectedImage(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : "");

    getBase64(file, function (base64Data) {
      console.log("Base64 Data:", base64Data);
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Col>
        <Col>
          {previewUrl && <Image src={previewUrl} thumbnail alt="Preview" />}
        </Col>
      </Row>
    </Container>
  );
}

export default ImageUpload;
