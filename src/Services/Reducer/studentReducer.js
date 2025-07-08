import {
  ADD_STUDENT_SUC,
  ADD_STUDENT_REJ,
  GET_ALL_STUDENTS,
  GET_STUDENT,
  UPDATE_STUDENT_SUC,
  LOADING,
  DELETE_STUDENT,
} from "../Actions/studentAction";

const initialState = {
  students: [],
  student: null,
  isLoading: false,
  isCreated: false,
  isUpdated: false,
  errorMsg: "",

};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT_SUC:
      return { ...state, isCreated: true };

    case GET_ALL_STUDENTS:
      return {
        ...state,
        students: action.payload,
        isLoading: false,
        isCreated: false,
        isUpdated: false,
      };

    case GET_STUDENT:
      return { ...state, student: action.payload };

    case UPDATE_STUDENT_SUC:
      return { ...state, isUpdated: true, student: null };

    case LOADING:
      return { ...state, isLoading: true };

    case ADD_STUDENT_REJ:
      return { ...state, isLoading: false, errorMsg: action.payload };

    case GET_ALL_STUDENTS:
      return { ...state, students: action.payload };

    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter((stu) => stu.id !== action.payload),
      };

    default:
      return state;
  }
};

   

export default studentReducer;
