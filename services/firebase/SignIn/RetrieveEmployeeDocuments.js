import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";

export const employeeDocuments = () => {
    const [empDocInfo, setEmpDocInfo] = useState([]); 

    useEffect(() => {
        const db = getFirestore(app); 
        const EMPLOYEE_DOCUMENTS_COLLECTION = collection(db, "EMPLOYEE_DOCUMENTS"); 
    
        const subscribeEmpDocu = onSnapshot(
            EMPLOYEE_DOCUMENTS_COLLECTION, 
            (snapshot) => {
                const empDocuData = []; 
                snapshot.forEach((doc) => {
                    empDocuData.push({doc_id: doc.id, ...doc.data()}); 
                });

                const empPRFData = empDocuData.filter((emp) => {
                    return emp.documentType === "PRF"; 
                }); 

                setEmpDocInfo(empPRFData); 
                console.log("EMPLOYEE DOCUMENTS: ", empPRFData); 
            }
        ); 
        return () => subscribeEmpDocu(); 
    }, []); 
    return empDocInfo;
}