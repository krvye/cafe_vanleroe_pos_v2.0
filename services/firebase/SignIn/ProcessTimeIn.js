import app from "../firebaseConfig";
import { collection, query, where, addDoc, getDocs, getFirestore } from "firebase/firestore";

export default function processTimeIn(currentUserEmail) {
    console.log("Current User Email: ", currentUserEmail);

    
}