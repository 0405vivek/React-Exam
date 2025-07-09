import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentAsync, getAllStudentsAsync } from "../../Services/Actions/studentAction";
import StudentCard from "./StudentCard";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const StudentList = ({ sortBy, searchTerm }) => {
  const dispatch = useDispatch();
  const { students, isLoading } = useSelector((state) => state.studentReducer);

  useEffect(() => {
    dispatch(getAllStudentsAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteStudentAsync(id));
    toast.success("Student deleted successfully!");
  };

  const filteredStudents = students
    .filter((student) => student && student.id)
    .filter((student) => {
      const term = searchTerm.toLowerCase();
      return (
        student.name.toLowerCase().includes(term) ||
        student.surname.toLowerCase().includes(term) ||
        student.education.toLowerCase().includes(term)
      );
    });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "education") {
      return a.education.localeCompare(b.education);
    }
    return 0;
  });

  return (
    <Container className="my-4">
      <h2 className="mb-4">Student List</h2>
      {isLoading ? (
        <p>Loading students...</p>
      ) : sortedStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <Row>
          {sortedStudents.map((student) => (
            <Col key={student.id} xs={12} sm={6} md={3} className="d-flex">
              <StudentCard student={student} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default StudentList;
