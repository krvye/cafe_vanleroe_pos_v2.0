import { useEffect, useState } from "react"; 
import { getFirestore, collection, onSnapshot } from "firebase/firestore"; 
import app from "../firebaseConfig"; 

export const SalesInformation = () => {
    const [ salesData, setSalesData ] = useState([]); 

    useEffect(() => {
        const db = getFirestore(app); 
        const DAILY_SALES_COLLECTION = collection(db, "DAILY_SALES"); 

        const subscribeDailySales = onSnapshot(DAILY_SALES_COLLECTION, (snapshot) => {
            const dailySalesData = []; 
            snapshot.forEach((doc) => {
                dailySalesData.push({ doc_id: doc.id, ...doc.data()});
            });;
            setSalesData(dailySalesData); 
            console.log("Daily Sales: ", dailySalesData); 
        }); 

        return () => subscribeDailySales();
    }, []);

    return salesData; 
};