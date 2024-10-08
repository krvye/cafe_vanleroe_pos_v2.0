import { getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";
import app from "../firebaseConfig";

export const UpdateOrderStatus = () => {
  // Order Status
  const handleDoneOrderStatus = async (documentId) => {
    console.log("Order No. to update as DONE: ", documentId);
    try {
      const db = getFirestore(app);
      const DAILY_SALES_COLLECTION = doc(db, "DAILY_SALES", documentId);
      await updateDoc(DAILY_SALES_COLLECTION, {
        orderStatus: "DONE",
      });
    } catch (error) {
      console.log("Error updating order status: ", error);
    }
  };

  // Void All Orders
  const handleVoidOrderStatus = async (documentId) => {
    console.log("Order No. to update as VOID: ", documentId);
    try {
      const db = getFirestore(app);
      const DAILY_SALES_COLLECTION = doc(db, "DAILY_SALES", documentId);

      await updateDoc(DAILY_SALES_COLLECTION, {
        orderStatus: "VOID",
      });
    } catch (error) {
      console.log("Error updating order status: ", error);
    }
  };


  return { handleDoneOrderStatus, handleVoidOrderStatus };
};
