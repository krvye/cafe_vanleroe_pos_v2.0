import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function processDailySales({ dailySalesData }) {
  const DAILY_SALES_COLLECTION = collection(db, "DAILY_SALES");

  await addDoc(DAILY_SALES_COLLECTION, dailySalesData);
}
