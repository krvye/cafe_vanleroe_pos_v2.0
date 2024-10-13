import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";

export const InvBranchesDetails = () => {
    const [branches, setBranches] = useState([]); 

    useEffect(() => {
        const db = getFirestore(app); 
        const BRANCHES_COLLECTION = collection(db, "BRANCH_DETAILS"); 

        const subscribeBranches = onSnapshot(
            BRANCHES_COLLECTION, 
            (snapshot) => {
                const branchesData = []; 
                snapshot.forEach((doc) => {
                    branchesData.push({doc_id: doc.id, ...doc.data()});
                }); 
                setBranches(branchesData); 
                console.log("BRANCHES: ", branchesData); 
            }
        ); 
        return () => subscribeBranches(); 
    }, []);
    return branches; 
}