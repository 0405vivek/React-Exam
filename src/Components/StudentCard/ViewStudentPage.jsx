// ViewStudentPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Server/Firebasedb"; // Make sure this is correct
import { toast, ToastContainer } from "react-toastify";
import StudentView from "../StudentCard/StudentView"; // Rename if needed

const ViewStudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(db, "students", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast.error("Student not found");
          navigate("/");
        }
      } catch (error) {
        toast.error("Failed to fetch student");
      }
    };

    fetchStudent();
  }, [id, navigate]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {student ? <StudentView student={student} /> : <p>Loading student...</p>}
    </>
  );
};

export default ViewStudentPage;
