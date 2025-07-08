import { Routes, Route } from 'react-router-dom';
import NavbarComp from './Components/Header';
import Home from './Components/Home';
import AddStudentForm from './Components/AddStudent';
import UpdateStudentForm from './Components/UpdateStudentForm';
import AuthForm from './Components/Login/AuthForm';
import ProtectedRoute from './Components/ProtectedRoute'; 
import StudentView from './Components/StudentCard/StudentView';
import ViewStudentPage from './Components/StudentCard/ViewStudentPage';

function App() {
  return (
    <>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/view-student/:id" element={<StudentView />} />

       
        <Route
          path="/add-student"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddStudentForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-student/:id"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UpdateStudentForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
