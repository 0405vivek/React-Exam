
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentAsync, getAllStudentsAsync } from "../../Services/Actions/studentAction";
import StudentCard from "./StudentCard";
import { Container, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, isLoading } = useSelector((state) => state.studentReducer);

  useEffect(() => {
    dispatch(getAllStudentsAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteStudentAsync(id));
    toast.success("Student deleted successfully!");
  };


  return (
    <Container className="my-4">
      <h2 className="mb-4">Student List</h2>
      {isLoading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <Row>
          {students
            .filter(student => student && student.id)
            .map(student => (
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
