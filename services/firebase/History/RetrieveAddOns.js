import { useEffect, useState } from "react"; 
import { getFirestore, collection, onSnapshot } from "firebase/firestore"; 
import app from "../firebaseConfig"; 

export const posAddOns = () => {
    const [addOns, setAddOns] = useState([]); 

    useEffect(() => {
        const db = getFirestore(app); 
        const POS_ADDONS_COLLECTION = collection(db, "POS_ITEM_ADDONS");

        const subscribeAddOns = onSnapshot(POS_ADDONS_COLLECTION, (snapshot) => {
            const addOnsData = []; 
            snapshot.forEach((doc) => {
                addOnsData.push({doc_id: doc.id, ...doc.data()});
            }); 
            setAddOns(addOnsData); 
            console.log("ADD ONS: ", addOnsData); 
        }); 
        return () => subscribeAddOns(); 
    }, []);
    return addOns; 
}