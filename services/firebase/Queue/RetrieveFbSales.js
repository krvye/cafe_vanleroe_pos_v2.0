import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";

export const InProgressFbOrder = () => {
  const [inprogressFbOrder, setInprogressFbOrder] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const INPROGRESS_COLLECTION = collection(db, "DAILY_SALES");

    const subscribeFbOrder = onSnapshot(INPROGRESS_COLLECTION, (snapshot) => {
      const inprogressFb = [];
      snapshot.forEach((doc) => {
        inprogressFb.push({ doc_id: doc.id, ...doc.data() });
      });

      // Filter based on status MAKE and orderMode
      const filteredInprogressFb = inprogressFb.filter((order) => {
        const currDate = new Date().toISOString().split("T")[0];
        return (
          order.orderStatus === "MAKE" &&
          order.orderDate === currDate &&
          order.orderMode === "FB"
        );
      });
      setInprogressFbOrder(filteredInprogressFb);
      console.log("IN PROGRESS FB ORDER: ", filteredInprogressFb);  
    });
    return () => subscribeFbOrder(); 
  }, []);
  return inprogressFbOrder; 
};
