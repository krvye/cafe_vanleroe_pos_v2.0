import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";


export const employeeSched = () => {
    const [empSched, setEmpSched] = useState([]); 

    useEffect(() => {
        const db = getFirestore(app); 
        const EMPLOYEE_SCHEDULE_COLLECTION = collection(db, "EMPLOYEE_SCHEDULE"); 

        const subscribeEmpSched = onSnapshot(
            EMPLOYEE_SCHEDULE_COLLECTION, 
            (snapshot) => {
                const empSchedData = []; 
                snapshot.forEach((doc) => {
                    empSchedData.push({doc_id: doc.id, ...doc.data()}); 
                });
                setEmpSched(empSchedData); 
                console.log("EMPLOYEE SCHEDULE: ", empSchedData); 
            }
        ); 
        return () => subscribeEmpSched(); 
    }, []); 
    return empSched;
}