import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import StudentList from "./StudentCard/StudentList";
import { Container, Form, Row, Col } from "react-bootstrap";

const Home = () => {
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <ToastContainer />
      <Container className="my-3">
        <Row className="g-2">
          <Col md={4}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="name">Name (A-Z)</option>
              <option value="education">Education (A-Z)</option>
            </Form.Select>
          </Col>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Search by name, surname or education"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>
      </Container>
      <StudentList sortBy={sortBy} searchTerm={searchTerm} />
    </>
  );
};

export default Home;
