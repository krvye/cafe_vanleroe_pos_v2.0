import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

export function retrieveItemAddOns() {
  const [itemAddOns, setItemAddOns] = useState([]);

  useEffect(() => {
    const ITEM_ADDONS = collection(db, "POS_ITEM_ADDONS");

    const subscribeItemAddOns = onSnapshot(ITEM_ADDONS, (snapshot) => {
      const itemAddOnsData = [];
      snapshot.forEach((doc) => {
        itemAddOnsData.push({ doc_id: doc.id, ...doc.data() });
      });
      setItemAddOns(itemAddOnsData);
    });

    return () => subscribeItemAddOns();
  }, []);

  return itemAddOns;
}
