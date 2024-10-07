import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";

export const AddOns = () => {
  const [addOns, setAddOns] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const ADD_ONS_COLLECTION = collection(db, "POS_ITEM_ADDONS");

    const subscribeAddOns = onSnapshot(ADD_ONS_COLLECTION, (snapshot) => {
      const addOnsInfo = [];
      snapshot.forEach((doc) => {
        addOnsInfo.push({ doc_id: doc.id, ...doc.data() });
      });
      setAddOns(addOnsInfo);
      console.log("ADD ONS: ", addOnsInfo);
    });
    return () => subscribeAddOns();
  }, []);
  return addOns;
};
