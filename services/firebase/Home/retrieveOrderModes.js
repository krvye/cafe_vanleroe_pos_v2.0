import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

export function retrieveOrderModes() {
  const [orderModes, setOrderModes] = useState([]);

  useEffect(() => {
    const ORDER_MODES = collection(db, "POS_ORDER_MODES");

    const subscribeOrderModes = onSnapshot(ORDER_MODES, (snapshot) => {
      const orderModesData = [];
      snapshot.forEach((doc) => {
        orderModesData.push({ doc_id: doc.id, ...doc.data() });
      });
      setOrderModes(orderModesData);
    });

    return () => subscribeOrderModes();
  }, []);

  return orderModes;
}
