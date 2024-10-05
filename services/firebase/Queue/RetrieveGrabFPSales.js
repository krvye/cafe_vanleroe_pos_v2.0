import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";

export const InProgressGrabFpOrder = () => {
  const [inprogressGrabFpOrder, setInprogressGrabFpOrder] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const INPROGRESS_COLLECTION = collection(db, "DAILY_SALES");

    const subscribeGrabFbOrder = onSnapshot(
      INPROGRESS_COLLECTION,
      (snapshot) => {
        const inprogressGrabFp = [];
        snapshot.forEach((doc) => {
          inprogressGrabFp.push({ doc_id: doc.id, ...doc.data() });
        });

        // Filter based on order status MAKE and orderMode grab/foodpanda
        const filteredInprogressOrder = inprogressGrabFp.filter((order) => {
          const currDate = new Date().toISOString().split("T")[0];
          return (
            order.orderStatus === "MAKE" &&
            order.orderDate === currDate &&
            (order.orderMode === "FP" || order.orderMode === "GRAB")
          );
        });
        setInprogressGrabFpOrder(filteredInprogressOrder);
        console.log("IN PROGRESS GRAB OR FP ORDER: ", filteredInprogressOrder);
      }
    );
    return () => subscribeGrabFbOrder();
  }, []);
  return inprogressGrabFpOrder;
};
