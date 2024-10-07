import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";

export const OrderStatus = () => {
    const [orderStatus, setOrderStatus] = useState([]); 

    useEffect(() => {
        const db = getFirestore(app); 
        const ORDER_STATUS_COLLECTION = collection(db, "POS_ORDER_STATUS"); 

        const subscribeOrderStatus = onSnapshot(
            ORDER_STATUS_COLLECTION,
            (snapshot) => {
                const orderStatusData = []; 
                snapshot.forEach((doc) => {
                    orderStatusData.push({doc_id: doc.id, ...doc.data()}); 
                });
                setOrderStatus(orderStatusData); 
                console.log("ORDER STATUS: ", orderStatusData); 
            }
        );
        return () => subscribeOrderStatus(); 
    }, []); 
    return orderStatus; 
}