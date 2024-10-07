import { getFirestore, updateDoc, doc, QueryOrderByConstraint } from "firebase/firestore";
import app from "../firebaseConfig";

export const UpdateOrderStatus = () => {
    const handleDoneOrderStatus = async (orderNo) => {
        console.log("Order No. to update as DONE: ", orderNo);
        try {
            const db = getFirestore(app); 
            const DAILY_SALES_COLLECTION = doc(db, "DAILY_SALES", String(orderNo)); 

            await updateDoc(DAILY_SALES_COLLECTION, 
                {
                    orderStatus: "DONE"
                }
            )
        } catch(error) {
            console.log("Error updating order status: ", error); 
        }
    }

    const handleVoidOrderStatus = async (orderNo) => {
        console.log("Order No. to update as VOID: ", orderNo);
        try {
            const db = getFirestore(app); 
            const DAILY_SALES_COLLECTION = doc(db, "DAILY_SALES", String(orderNo)); 

            await updateDoc(DAILY_SALES_COLLECTION, 
                {
                    orderStatus: "VOID"
                }
            )
        } catch(error) {
            console.log("Error updating order status: ", error); 
        }
    }

    return { handleDoneOrderStatus, handleVoidOrderStatus };
}