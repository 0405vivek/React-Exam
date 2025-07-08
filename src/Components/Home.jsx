import { ToastContainer } from "react-toastify";
import StudentList from "./StudentCard/StudentList";



const Home = () => {
  return (
     <>
     <ToastContainer/>
       <StudentList/>
     </>

  );
}

export default Home;