import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";

export const ExpensesTypeInformation = () => {
    const [ expensesTypeData, setExpensesTypeData ] = useState([]); 

    useEffect(() => {
        const db = getFirestore(app); 
        const EXPENSES_TYPE_COLLECTION = collection(db, "EXPENSE_TYPE"); 

        const subscribeExpensesType = onSnapshot(
            EXPENSES_TYPE_COLLECTION, 
            (snapshot) => {
                const expensesTypeInfo = []; 
                snapshot.forEach((doc) => {
                    expensesTypeInfo.push({ doc_id: doc.id, ...doc.data()}); 
                }); 
                setExpensesTypeData(expensesTypeInfo); 
                console.log("Expenses Type: ", expensesTypeInfo); 
            }
        );
        return () => subscribeExpensesType(); 
    }, []);
    return expensesTypeData;
}