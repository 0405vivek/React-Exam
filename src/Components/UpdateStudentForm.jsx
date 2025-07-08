
import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getStudentAsync, updateStudentAsync } from "../Services/Actions/studentAction";
import { UploadImage } from "../Services/Cloudinary";
import { BsPencilSquare } from "react-icons/bs";

const UpdateStudentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { student, isUpdated, isLoading } = useSelector((state) => state.studentReducer);

  const [form, setForm] = useState({
    id: "",
    name: "",
    surname: "",
    education: "",
    address: "",
    dob: "",
    admissionDate: "",
    image: "",
    mobile: "",
    gender: "",
    gmail: "", // ✅ Added Gmail field
  });

  useEffect(() => {
    dispatch(getStudentAsync(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (student) {
      setForm({
        id: student.id || "",
        name: student.name || "",
        surname: student.surname || "",
        education: student.education || "",
        address: student.address || "",
        dob: student.dob || "",
        admissionDate: student.admissionDate || "",
        image: student.image || "",
        mobile: student.mobile || "",
        gender: student.gender || "",
        gmail: student.gmail || "", // ✅ Pre-fill Gmail
      });
    }
  }, [student]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Student updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  }, [isUpdated]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    try {
      const imageUrl = await UploadImage(e.target.files[0]);
      setForm({ ...form, image: imageUrl });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.gmail.trim() || !/^[\w.-]+@gmail\.com$/i.test(form.gmail)) {
      toast.error("Please enter a valid Gmail ID");
      return;
    }

    dispatch(updateStudentAsync(form));
  };

  return (
    <Container className="my-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="mb-4">
        <BsPencilSquare className="me-2" />
        Update Student
      </h2>
      {isLoading || !form.name ? (
        <p>Loading student data...</p>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <FloatingLabel label="First Name">
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Last Name">
                <Form.Control
                  type="text"
                  name="surname"
                  value={form.surname}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Education">
                <Form.Control
                  type="text"
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Address">
                <Form.Control
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Mobile Number">
                <Form.Control
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Gender">
                <Form.Select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Date of Birth">
                <Form.Control
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Admission Date">
                <Form.Control
                  type="date"
                  name="admissionDate"
                  value={form.admissionDate}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Gmail ID">
                <Form.Control
                  type="email"
                  name="gmail"
                  value={form.gmail}
                  onChange={handleChange}
                  required
                  placeholder="Enter Gmail ID"
                />
              </FloatingLabel>
            </Col>

            <Col md={12}>
              <FloatingLabel label="Upload Student Photo">
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileUpload}
                />
              </FloatingLabel>
              {form.image && (
                <img
                  src={form.image}
                  alt="Student Preview"
                  className="mt-3 rounded"
                  style={{ maxWidth: "200px" }}
                />
              )}
            </Col>
          </Row>

          <Button type="submit" variant="primary" className="mt-4">
            Update Student
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default UpdateStudentForm;
