import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

export function retrieveConsumeMethods() {
  const [consumeMethods, setConsumeMethods] = useState([]);

  useEffect(() => {
    const CONSUME_METHODS_COLLECTION = collection(db, "POS_CONSUME_METHODS");

    const subscribeConsumeMethods = onSnapshot(
      CONSUME_METHODS_COLLECTION,
      (snapshot) => {
        const consumeMethodsData = [];
        snapshot.forEach((doc) => {
          consumeMethodsData.push({ doc_id: doc.id, ...doc.data() });
        });
        setConsumeMethods(consumeMethodsData);
      }
    );

    return () => subscribeConsumeMethods();
  }, []);

  return consumeMethods;
}
