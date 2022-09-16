// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-TLr2gK-afNUzCmqy7zUWGLkKtOJrMrs",
  authDomain: "todoapp-27eae.firebaseapp.com",
  projectId: "todoapp-27eae",
  storageBucket: "todoapp-27eae.appspot.com",
  messagingSenderId: "858730805044",
  appId: "1:858730805044:web:8ec4deb449a76d31a41761",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
