import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function processDailySales(
  branchCode,
  consumeMethod,
  discount,
  customDiscountCode,
  elapsedTime,
  orderChange,
  orderDate,
  orderItems,
  orderMode,
  orderNo,
  orderNote,
  orderTakenBy,
  paymentMethods,
  retekessNumber,
  totalAmount
) {
  dailySalesData = {
    branchCode: branchCode,
    consumeMethod: consumeMethod,
    discountAmount: discount,
    discountCode: customDiscountCode,
    elapsedTime: elapsedTime,
    orderChange: orderChange,
    orderDate: orderDate,
    orderItems: orderItems,
    orderMode: orderMode,
    orderNo: orderNo,
    orderNote: orderNote,
    orderStatus: "MAKE",
    orderTakenBy: orderTakenBy,
    paymentMethods: paymentMethods,
    retekessNumber: retekessNumber,
    totalAmount: totalAmount,
  };

  const DAILY_SALES_COLLECTION = collection(db, "DAILY_SALES");

  await addDoc(DAILY_SALES_COLLECTION, dailySalesData);
}
