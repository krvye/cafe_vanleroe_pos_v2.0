import { getFirestore, updateDoc, doc } from "firebase/firestore";
import app from "../firebaseConfig";

export const UpdateOrderStatus = () => {
    const handleDoneOrderStatus = async (documentId) => {
        console.log("Order No. to update as DONE: ", documentId);
        try {
            const db = getFirestore(app); 
            const DAILY_SALES_COLLECTION = doc(db, "DAILY_SALES", documentId); 
            await updateDoc(DAILY_SALES_COLLECTION, 
                {
                    orderStatus: "DONE"
                }
            );
        } catch(error) {
            console.log("Error updating order status: ", error); 
        }
    }

    const handleVoidOrderStatus = async (documentId) => {
        console.log("Order No. to update as VOID: ", documentId);
        try {
            const db = getFirestore(app); 
            const DAILY_SALES_COLLECTION = doc(db, "DAILY_SALES", documentId); 

            await updateDoc(DAILY_SALES_COLLECTION, 
                {
                    orderStatus: "VOID"
                }
            );
        } catch(error) {
            console.log("Error updating order status: ", error); 
        }
    }

    return { handleDoneOrderStatus, handleVoidOrderStatus };
}