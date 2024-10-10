import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

export function retrievePaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const PAYMENT_METHODS = collection(db, "POS_PAYMENT_METHODS");

    const subscribePaymentMethods = onSnapshot(PAYMENT_METHODS, (snapshot) => {
      const paymentMethodsData = [];
      snapshot.forEach((doc) => {
        paymentMethodsData.push({ doc_id: doc.id, ...doc.data() });
      });
      setPaymentMethods(paymentMethodsData);
    });

    return () => subscribePaymentMethods();
  }, []);

  return paymentMethods;
}
