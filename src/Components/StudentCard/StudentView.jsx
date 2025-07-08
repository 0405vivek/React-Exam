import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../Server/Firebasedb';
import { deleteStudentAsync } from '../../Services/Actions/studentAction';

const StudentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [student, setStudent] = useState(null);
  const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(db, 'students', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast.error('Student not found');
          navigate('/');
        }
      } catch (error) {
        toast.error('Failed to fetch student');
        console.error(error);
      }
    };
    fetchStudent();
  }, [id, navigate]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudentAsync(student.id));
      toast.success('Student deleted successfully');
      navigate('/');
    }
  };

  if (!student) return <p className="text-center m-5">Loading student...</p>;

  return (
    <div className="container py-4 bg-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row">
        {/* Left: Student Image */}
        <div className="col-md-6 text-center">
          <img
            src={student.image || 'https://via.placeholder.com/300x200?text=No+Image'}
            alt={`${student.name} ${student.surname}`}
            className="img-fluid border p-3 rounded"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>

        {/* Right: Student Info */}
        <div className="col-md-6">
          <h2>{student.name} {student.surname}</h2>

          <p><strong>Education:</strong> {student.education}</p>
          <p><strong>DOB:</strong> {student.dob}</p>
          <p><strong>Admission Date:</strong> {student.admissionDate}</p>
          <p><strong>Address:</strong> {student.address}</p>
          {student.gender && <p><strong>Gender:</strong> {student.gender}</p>}
          {student.mobile && <p><strong>Mobile:</strong> {student.mobile}</p>}

          {user?.role === 'admin' && (
            <div className="d-flex gap-2 flex-wrap mt-3">
              <Link to={`/update-student/${student.id}`} className="btn btn-warning">
                Update
              </Link>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}

          <Link to="/" className="btn btn-outline-secondary mt-3">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
