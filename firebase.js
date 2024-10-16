// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
const imgDB = getStorage(app);
const firestore = getFirestore(app);

export { app, imgDB, firestore };
