import { useEffect, useState } from "react"; 
import { getFirestore, collection, onSnapshot } from "firebase/firestore"; 
import app from "../firebaseConfig"; 

export const ModeOfPayment = () => {
    const [ modeOfPayment, setModeOfPayment ] = useState([]); 

    useEffect(() => {
        const db = getFirestore(app); 
        const MODE_OF_PAYMENT_COLLECTION = collection(db, "POS_PAYMENT_METHODS"); 

        const subscribeModeOfPayment = onSnapshot(MODE_OF_PAYMENT_COLLECTION, (snapshot) => {
            const modeOfPaymentData = []; 
            snapshot.forEach((doc) => {
                modeOfPaymentData.push({ doc_id: doc.id, ...doc.data()});
            });;
            setModeOfPayment(modeOfPaymentData); 
            console.log("Mode of Payment: ", modeOfPaymentData); 
        });

        return () => subscribeModeOfPayment(); 
    }, []); 
    return modeOfPayment;
}