import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentCard = ({ student, onDelete }) => {
  const user = useSelector((state) => state.authReducer.user);

  if (!student) return null;

  return (
    <Card className="shadow-sm h-100 border-0 rounded-4 overflow-hidden">
      {/* Image Section */}
      <div
        style={{
          height: "220px",
          backgroundColor: "#f9f9f9",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card.Img
          variant="top"
          src={student.image || "https://via.placeholder.com/300x200?text=No+Image"}
          alt="Student"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=Image+Error";
          }}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      {/* Info Section */}
      <Card.Body className="text-center">
        <Card.Title className="fw-bold fs-4">
          {student.name} {student.surname}
        </Card.Title>
        <Card.Text className="text-muted small">
          <div><strong>🎓 Education:</strong> {student.education}</div>
          <div><strong>🎂 DOB:</strong> {student.dob}</div>
          <div><strong>📆 Admission:</strong> {student.admissionDate}</div>
          <div><strong>📍 Address:</strong> {student.address}</div>
        </Card.Text>

        {/* Action Buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
          <Link to={`/view-student/${student.id}`}>
            <Button variant="info" size="sm">View</Button>
          </Link>

          {user?.role === "admin" && (
            <>
              <Link to={`/update-student/${student.id}`}>
                <Button variant="warning" size="sm">Update</Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(student.id)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
