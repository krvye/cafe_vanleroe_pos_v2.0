import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";
import { useBranches } from "../../../context/BranchContext";

export const InvInformation = () => {
    const { selectedBranch } = useBranches(); 
    const branchCode = selectedBranch ? selectedBranch.branchCode : null;

    const [ invData, setInvData ] = useState([]); 
    const [ totalInv, setTotalInv ] = useState(0); 

    useEffect(() => {
        const db = getFirestore(app); 
        const INVENTORY_ITEMS_COLLECTION = collection(db, "POS_INVENTORY_ITEMS"); 

        const subscribeInventory = onSnapshot(
            INVENTORY_ITEMS_COLLECTION, 
            (snapshot) => {
                const invItemData =[]; 
                snapshot.forEach((doc) => {
                    invItemData.push({ doc_id: doc.id, ...doc.data()}); 
                });

                const filteredInvItem = invItemData.filter((item) => {
                    const currDate = new Date().toISOString().split("T")[0];
                    return (item.dateChecked === currDate &&
                        item.branchCode === branchCode
                    ); 
                })
                setInvData(filteredInvItem);
                console.log("Inventory Data: ", filteredInvItem); 

                // Total expenses 
                const totalInv = filteredInvItem.reduce(
                    (acc, curr) => acc + curr.receiptTotal, 0
                ); 
                setTotalInv(totalInv);
            }
        );
        return () => subscribeInventory(); 
    }, []);
    return {invData, totalInv}; 
}