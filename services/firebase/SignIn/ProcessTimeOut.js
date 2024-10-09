import app from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  addDoc,
} from "firebase/firestore";
import { Alert } from "react-native";
import moment from "moment-timezone";

export default async function processTimeOut