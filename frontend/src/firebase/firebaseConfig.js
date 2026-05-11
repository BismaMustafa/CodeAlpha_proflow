// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbZocskn69xwrfrbY5L_WUc11sbjkQbdE",
  authDomain: "project-management-tool-acfaf.firebaseapp.com",
  projectId: "project-management-tool-acfaf",
  storageBucket: "project-management-tool-acfaf.firebasestorage.app",
  messagingSenderId: "511939450261",
  appId: "1:511939450261:web:4405359c313109e6edd29c",
  measurementId: "G-DT08YHYKHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// ✅ exports
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);