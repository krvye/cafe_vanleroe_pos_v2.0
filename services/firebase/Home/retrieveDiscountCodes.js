import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

export function retrieveDiscountCodes() {
  const [discountCodes, setDiscountCodes] = useState([]);

  useEffect(() => {
    const DISCOUNT_CODES_COLLECTION = collection(db, "POS_DISCOUNT_CODES");

    const subscribeDiscountCodes = onSnapshot(
      DISCOUNT_CODES_COLLECTION,
      (snapshot) => {
        const discountCodesData = [];
        snapshot.forEach((doc) => {
          discountCodesData.push({ doc_id: doc.id, ...doc.data() });
        });
        setDiscountCodes(discountCodesData);
      }
    );

    return () => subscribeDiscountCodes();
  }, []);

  return discountCodes;
}
