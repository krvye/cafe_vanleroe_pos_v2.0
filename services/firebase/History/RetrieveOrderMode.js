import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore"; 
import app from "../firebaseConfig"; 

export const OrderMode = () => {
    const [ orderMode, setOrderMode ] = useState([]);

    useEffect (() => {
        const db = getFirestore(app);
        const ORDER_MODE_COLLECTION = collection(db, "POS_ORDER_MODES"); 

        const subscribeOrderMode = onSnapshot(ORDER_MODE_COLLECTION, (snapshot) => {
            const orderModeData = []; 
            snapshot.forEach((doc) => {
                orderModeData.push({doc_id: doc.id, ...doc.data()})
            });;
            setOrderMode(orderModeData); 
            console.log("Order Mode: ", orderModeData); 
        }); 

        return () => subscribeOrderMode(); 
    }, []); 

    return orderMode; 
}