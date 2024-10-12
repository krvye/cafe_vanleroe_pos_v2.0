import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";
import { useBranches } from "../../../context/BranchContext";

export const ExpensesInformation = () => {
    const { selectedBranch } = useBranches(); 
    const branchCode = selectedBranch ? selectedBranch.branchCode : null;

    const [ expensesData, setExpensesData ] = useState([]); 
    const [ totalExpenses, setTotalExpenses ] = useState(0); 

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
                    return (item.dateChecked === currDate &&
                        item.branchCode === branchCode
                    ); 
                })
                setExpensesData(filteredExpensesItem);
                console.log("Expenses Data: ", filteredExpensesItem); 

                // Total expenses 
                const totExpenses = filteredExpensesItem.reduce(
                    (acc, curr) => acc + curr.receiptTotal, 0
                ); 
                setTotalExpenses(totExpenses);
            }
        );
        return () => subscribeExpenses(); 
    }, []);
    return {expensesData, totalExpenses}; 
}