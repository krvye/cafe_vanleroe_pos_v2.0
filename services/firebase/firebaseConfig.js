import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2Dn2gkmeRrIcxYwUJHXM_gL0m_FCufYM",
  authDomain: "cafe-vanleroe-system-test.firebaseapp.com",
  projectId: "cafe-vanleroe-system-test",
  storageBucket: "cafe-vanleroe-system-test.appspot.com",
  messagingSenderId: "827239060830",
  appId: "1:827239060830:web:6be801f03615eed0f2abcf",
  measurementId: "G-PEFZXED05H",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
