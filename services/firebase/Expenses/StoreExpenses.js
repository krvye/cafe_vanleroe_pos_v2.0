import { addDoc, collection } from "firebase/firestore";
import app from "../firebaseConfig";

export const StoreExpenses = () => {

  return async ({
    date,
    branchCode,
    expenseType,
    receiptNumber,
    itemName,
    itemQty,
    itemPrice,
    totalPrice,
  }) => {
    if (!date || !branchCode || !expenseType || !receiptNumber || !itemName || !itemQty || !itemPrice || !totalPrice) {
      console.log("Complete all details");
      return;
    }

    const expensesData = {
      date,
      branchCode,
      expenseTypeCd: expenseType,
      receiptNumber,
      itemName,
      itemQty,
      itemPrice,
      totalPrice,
    };

    const EXPENSE_ITEM_COLLECTION = collection(firestore, "EXPENSE_ITEM");

    await addDoc(EXPENSE_ITEM_COLLECTION, expensesData);

    console.log("Expense added successfully");
  };
};
