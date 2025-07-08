
// Firebase services

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPWHqjHZzSNnFQ4vug3obdL5AXImbnCWY",
  authDomain: "react-eaxm.firebaseapp.com",
  projectId: "react-eaxm",
  storageBucket: "react-eaxm.firebasestorage.app",
  messagingSenderId: "577999551436",
  appId: "1:577999551436:web:0959a3cac448d07452bb69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();