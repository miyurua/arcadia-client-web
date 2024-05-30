// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "arcadia-bfdb6.firebaseapp.com",
  projectId: "arcadia-bfdb6",
  storageBucket: "arcadia-bfdb6.appspot.com",
  messagingSenderId: "824918869336",
  appId: "1:824918869336:web:e64e30cbcbececc525512d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);