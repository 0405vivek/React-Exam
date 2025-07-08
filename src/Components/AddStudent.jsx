import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addNewStudentAsync } from "../Services/Actions/studentAction";
import { UploadImage } from "../Services/Cloudinary";

const AddStudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authReducer);

  const [student, setStudent] = useState({
      name: "",
      surname: "",
      education: "",
      address: "",
      dob: "",
      admissionDate: "",
      image: "",
      mobile: "",
      gender: "",
      gmail: "", 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileUpload = async (e) => {
    try {
      const imageUrl = await UploadImage(e.target.files[0]);
      setStudent({ ...student, image: imageUrl });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!student.name.trim()) newErrors.name = "Name is required";
    if (!student.surname.trim()) newErrors.surname = "Surname is required";
    if (!student.education.trim()) newErrors.education = "Education is required";
    if (!student.address.trim()) newErrors.address = "Address is required";
    if (!student.dob) newErrors.dob = "Date of Birth is required";
    if (!student.admissionDate) newErrors.admissionDate = "Admission date is required";
    if (!student.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!student.gender.trim()) newErrors.gender = "Gender is required";
    if (!student.gmail.trim()) {
      newErrors.gmail = "Gmail ID is required";
    } else if (!/^[\w.-]+@gmail\.com$/i.test(student.gmail.trim())) {
      newErrors.gmail = "Enter a valid Gmail ID";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to add a student.");
      navigate("/login");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((msg) => toast.error(msg));
      return;
    }

    const newStudent = {
      ...student,
      id: Math.floor(Math.random() * 100000).toString(),
    };

    dispatch(addNewStudentAsync(newStudent));
    toast.success("Student added successfully!");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <Container className="my-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="mb-4">Add New Student</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={6}>
            <FloatingLabel label="First Name">
              <Form.Control
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Last Name">
              <Form.Control
                type="text"
                name="surname"
                value={student.surname}
                onChange={handleChange}
                isInvalid={!!errors.surname}
              />
              <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Education">
              <Form.Control
                type="text"
                name="education"
                value={student.education}
                onChange={handleChange}
                isInvalid={!!errors.education}
              />
              <Form.Control.Feedback type="invalid">{errors.education}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Address">
              <Form.Control
                type="text"
                name="address"
                value={student.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Mobile Number">
              <Form.Control
                type="tel"
                name="mobile"
                value={student.mobile}
                onChange={handleChange}
                isInvalid={!!errors.mobile}
              />
              <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Gender">
              <Form.Select
                name="gender"
                value={student.gender}
                onChange={handleChange}
                isInvalid={!!errors.gender}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Date of Birth">
              <Form.Control
                type="date"
                name="dob"
                value={student.dob}
                onChange={handleChange}
                isInvalid={!!errors.dob}
              />
              <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Admission Date">
              <Form.Control
                type="date"
                name="admissionDate"
                value={student.admissionDate}
                onChange={handleChange}
                isInvalid={!!errors.admissionDate}
              />
              <Form.Control.Feedback type="invalid">{errors.admissionDate}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Gmail ID">
              <Form.Control
                type="email"
                name="gmail"
                value={student.gmail}
                onChange={handleChange}
                isInvalid={!!errors.gmail}
                placeholder="Enter Gmail ID"
              />
              <Form.Control.Feedback type="invalid">{errors.gmail}</Form.Control.Feedback>
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
            {student.image && (
              <img
                src={student.image}
                alt="Preview"
                className="mt-3 rounded"
                style={{ maxWidth: "200px" }}
              />
            )}
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-4">
          Add Student
        </Button>
      </Form>
    </Container>
  );
};

export default AddStudentForm;
