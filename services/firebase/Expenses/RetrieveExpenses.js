import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";

export const ExpensesInformation = () => {
    const [ expensesData, setExpensesData ] = useState([]); 

    useEffect(() => {
        const db = getFirestore(app); 
        const EXPENSES_ITEM_COLLECTION = collection(db, "EXPENSE_ITEM"); 

        const subscribeExpenses = onSnapshot(
            EXPENSES_ITEM_COLLECTION, 
            (snapshot) => {
                const expensesItemData =[]; 
                snapshot.forEach((doc) => {
                    expensesItemData.push({ doc_id: doc.id, ...doc.data()}); 
                });

                const filteredExpensesItem = expensesItemData.filter((item) => {
                    const currDate = new Date().toISOString().split("T")[0];
                    return item.dateChecked === currDate; 
                })
                setExpensesData(filteredExpensesItem);
                console.log("Expenses Data: ", filteredExpensesItem); 
            }
        );
        return () => subscribeExpenses(); 
    }, []);
    return expensesData; 
}