import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../../Server/Firebasedb";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_IN_FAIL = "SIGN_IN_FAIL";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_OUT = "SIGN_OUT";
export const AUTH_ERROR = "AUTH_ERROR";

const signInSuccess = (user) => {
  const userData = {
    email: user.email,
    uid: user.id || user.uid,
    role: user.role || "user",
    displayName: user.displayName || "User",
    photoURL:
      user.photoURL ||
      "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
  };
  localStorage.setItem("authUser", JSON.stringify(userData));
  return {
    type: SIGN_IN_SUCCESS,
    payload: userData,
  };
};

const signUpSuccess = () => ({ type: SIGN_UP_SUCCESS });

const signOutSuccess = () => {
  localStorage.removeItem("authUser");
  return {
    type: SIGN_OUT_SUCCESS,
  };
};

const authError = (error) => ({
  type: AUTH_ERROR,
  payload: error,
});

export const signINAsync = ({ email, password }) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};

    const fullUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || userData.displayName || "User",
      role: userData.role || "user",
      photoURL:
        firebaseUser.photoURL ||
        userData.photoURL ||
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612",
    };

    dispatch(signInSuccess(fullUser));
  } catch (error) {
    console.error("Login Error:", error.message);
    dispatch(authError(error.message));
  }
};

export const signUpAsync = (data) => async (dispatch) => {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, data.email, data.password);
    if (userCred.user) {
      const user = {
        email: userCred.user.email,
        id: userCred.user.uid,
        role: "user",
        displayName: data.fullName || "User",
        photoURL:
          userCred.user.photoURL ||
          "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
      };
      await setDoc(doc(db, "users", user.id), user);
      dispatch(signUpSuccess());
    }
  } catch (error) {
    dispatch(authError(error.message));
  }
};

export const googleSignInAsync = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  try {
    const userCred = await signInWithPopup(auth, provider);
    const uid = userCred.user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    let user;
    if (docSnap.exists()) {
      user = docSnap.data();
    } else {
      user = {
        id: uid,
        email: userCred.user.email,
        role: "user",
        displayName: userCred.user.displayName,
        photoURL: userCred.user.photoURL,
      };
      await setDoc(docRef, user);
    }

    dispatch(signInSuccess(user));
  } catch (err) {
    dispatch(authError(err.message));
  }
};

export const signOutAsync = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(signOutSuccess());
  } catch (err) {
    dispatch(authError(err.message));
  }
};

export const checkAuthState = () => (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fullUser = docSnap.data();
          dispatch(signInSuccess(fullUser));
        }
      } catch (error) {
        dispatch(authError(error.message));
      }
    } else {
      dispatch(signOutSuccess());
    }
  });
};
