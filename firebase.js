// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFm6h7SNgtd6-yrsB198wrP0PLcbYHI6c",
  authDomain: "sampleproject-f1b12.firebaseapp.com",
  databaseURL: "https://sampleproject-f1b12-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sampleproject-f1b12",
  storageBucket: "sampleproject-f1b12.appspot.com",
  messagingSenderId: "118752850697",
  appId: "1:118752850697:web:89f987b6c6e0a357a519d8",
  measurementId: "G-3Y72W7S9SG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);