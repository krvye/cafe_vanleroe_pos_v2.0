import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

export function retrieveItemCategory() {
  const [itemCategory, setItemCategory] = useState([]);

  useEffect(() => {
    const ITEM_CATEGORY = collection(db, "POS_ITEM_CATEGORY");

    const subscribeItemCategory = onSnapshot(ITEM_CATEGORY, (snapshot) => {
      const itemCategoryData = [];
      snapshot.forEach((doc) => {
        itemCategoryData.push({ doc_id: doc.id, ...doc.data() });
      });
      setItemCategory(itemCategoryData);
    });

    return () => subscribeItemCategory();
  }, []);

  return itemCategory;
}
