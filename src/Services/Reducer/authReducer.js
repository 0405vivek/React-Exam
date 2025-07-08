import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_IN_FAIL,
} from "../Actions/authAction";

const storeduser = JSON.parse(localStorage.getItem("authUser"));

const initialState = {
  user: storeduser || null,
  error: null,
  isAuthenticated: !!storeduser,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        isAuthenticated: true,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null,
        error: null,
        isAuthenticated: false,
      };
    case SIGN_IN_FAIL:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
