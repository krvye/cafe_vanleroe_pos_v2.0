import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";

export const InProgressTakeOutOrder = () => {
  const [inprogressTakeOutOrder, setinprogressTakeOutOrder] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const INPROGRESS_COLLECTION = collection(db, "DAILY_SALES");

    const subscribeInprogressOrder = onSnapshot(
      INPROGRESS_COLLECTION,
      (snapshot) => {
        const inprogressTakeOutInfo = [];
        snapshot.forEach((doc) => {
          inprogressTakeOutInfo.push({ doc_id: doc.id, ...doc.data() });
        });

        // Filter sales based on order status MAKE and consume method TAKEOUT
        const filteredInprogressOrder = inprogressTakeOutInfo.filter(
          (order) => {
            const currDate = new Date().toISOString().split("T")[0];
            return (
              order.orderStatus === "MAKE" &&
              order.consumeMethod === "TAKEOUT" &&
              order.orderMode === "OS" &&
              order.orderDate === currDate
            );
          }
        );

        setinprogressTakeOutOrder(filteredInprogressOrder);
        console.log("IN PROGRESS TAKE OUT ORDER: ", filteredInprogressOrder);
      }
    );
    return () => subscribeInprogressOrder();
  }, []);

  return inprogressTakeOutOrder;
};
