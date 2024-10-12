import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";
import { useBranches } from "../../../context/BranchContext"; 

export const InProgressDineInOrder = () => {
  const { selectedBranch } = useBranches(); 
  const branchCode = selectedBranch ? selectedBranch.branchCode : null; 


  const [inprogressDineInOrder, setInProgressDineInOrder] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const INPROGRESS_COLLECTION = collection(db, "DAILY_SALES");

    const subscribeInprogressOrder = onSnapshot(
      INPROGRESS_COLLECTION,
      (snapshot) => {
        const inprogressDineInfo = [];
        snapshot.forEach((doc) => {
          inprogressDineInfo.push({ doc_id: doc.id, ...doc.data() });
        });

        // Filter sales based on order status MAKE and consume method DINE IN
        const filteredInprogressOrder = inprogressDineInfo.filter((order) => {
          const currDate = new Date().toISOString().split("T")[0];
          return (
            order.orderStatus === "MAKE" &&
            order.consumeMethod === "DINE" &&
            order.orderDate === currDate && 
            order.branchCode === branchCode
          );
        });

        setInProgressDineInOrder(filteredInprogressOrder);
        console.log("IN PROGRESS DINE IN ORDER: ", filteredInprogressOrder);
      }
    );
    return () => subscribeInprogressOrder();
  }, []);

  return inprogressDineInOrder;
};
