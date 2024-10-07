// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2Dn2gkmeRrIcxYwUJHXM_gL0m_FCufYM",
  authDomain: "cafe-vanleroe-system-test.firebaseapp.com",
  projectId: "cafe-vanleroe-system-test",
  storageBucket: "cafe-vanleroe-system-test.appspot.com",
  messagingSenderId: "827239060830",
  appId: "1:827239060830:web:6be801f03615eed0f2abcf",
  measurementId: "G-PEFZXED05H",
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { app, db };
