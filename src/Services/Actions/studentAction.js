import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../Server/Firebasedb';
import { toast } from 'react-toastify';

export const ADD_STUDENT_SUC = "ADD_STUDENT_SUC";
export const ADD_STUDENT_REJ = "ADD_STUDENT_REJ";
export const GET_ALL_STUDENTS = "GET_ALL_STUDENTS";
export const GET_STUDENT = "GET_STUDENT";
export const UPDATE_STUDENT_SUC = "UPDATE_STUDENT_SUC";
export const LOADING = "LOADING";
export const DELETE_STUDENT = "DELETE_STUDENT";

export const addNewStudentSuc = () => ({ type: ADD_STUDENT_SUC });
export const addNewStudentRej = (error) => ({ type: ADD_STUDENT_REJ, payload: error });
export const getAllStudents = (students) => ({ type: GET_ALL_STUDENTS, payload: students });
export const loading = () => ({ type: LOADING });
export const getStudent = (data) => ({ type: GET_STUDENT, payload: data });
export const updateStudent = () => ({ type: UPDATE_STUDENT_SUC });
export const deleteStudent = (id) => ({ type: DELETE_STUDENT, payload: id });

export const getAllStudentsAsync = () => async (dispatch) => {
  dispatch(loading());
  try {
    const querySnapshot = await getDocs(collection(db, "students"));
    const students = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    dispatch(getAllStudents(students));
  } catch (err) {
    dispatch(addNewStudentRej(err.message));
  }
};

export const addNewStudentAsync = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    await setDoc(doc(db, "students", data.id), data);
    dispatch(addNewStudentSuc());
    dispatch(getAllStudentsAsync());
  } catch (err) {
    dispatch(addNewStudentRej(err.message));
  }
};

export const deleteStudentAsync = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "students", id));
    dispatch({ type: DELETE_STUDENT, payload: id });
    toast.success("Student deleted successfully!");
  } catch (error) {
    console.error("Delete Error:", error.message);
    toast.error("Failed to delete student.");
  }
};

export const getStudentAsync = (id) => async (dispatch) => {
  try {
    const docRef = doc(db, "students", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const studentData = docSnap.data();
      dispatch(getStudent({ id, ...studentData }));
    } else {
      dispatch(addNewStudentRej("No such document found"));
    }
  } catch (err) {
    dispatch(addNewStudentRej(err.message));
  }
};

export const updateStudentAsync = (data) => async (dispatch) => {
  try {
    await setDoc(doc(db, "students", data.id), data);
    dispatch(updateStudent());
    dispatch(getAllStudentsAsync());
  } catch (err) {
    dispatch(addNewStudentRej(err.message));
  }
};
