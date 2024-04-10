// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bloghive-703c3.firebaseapp.com",
  projectId: "bloghive-703c3",
  storageBucket: "bloghive-703c3.appspot.com",
  messagingSenderId: "366248314882",
  appId: "1:366248314882:web:7fcb5392161a81258cbf1b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
