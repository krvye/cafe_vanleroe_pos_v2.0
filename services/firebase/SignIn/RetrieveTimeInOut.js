import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";

export const timeInOut = () => {
    const [timeInOutInfo, setTimeInOutInfo] = useState([]); 

    useEffect(() => {
        const db = getFirestore(app); 
        const TIME_IN_OUT_COLLECTION = collection(db, "TIME_IN_OUT"); 
        

        const subscribeTimeInOut = onSnapshot(
            TIME_IN_OUT_COLLECTION, 
            (snapshot) => {
                const timeInOutData = []; 
                snapshot.forEach((doc) => {
                    timeInOutData.push({doc_id: doc.id, ...doc.data()}); 
                }); 
                setTimeInOutInfo(timeInOutData); 
                console.log("TIME IN OUT: ", timeInOutData); 
            }
        ); 
        return () => subscribeTimeInOut(); 
    }, []); 
    return timeInOutInfo;
}