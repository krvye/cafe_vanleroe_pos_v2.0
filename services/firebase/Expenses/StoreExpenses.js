import { addDoc, collection, getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";

export const StoreExpenses = async ({
  dateChecked,
  branchCode,
  expenseTypeCd,
  receiptNumber,
  itemName,
  itemQTY,
  itemPrice,
  receiptTotal,
}) => {
  if (
    !dateChecked ||
    !branchCode ||
    !expenseTypeCd ||
    !receiptNumber ||
    !itemName ||
    !itemQTY ||
    !itemPrice ||
    !receiptTotal
  ) {
    console.log("Complete all details");
    return;
  }

  const expensesData = {
    dateChecked,
    branchCode,
    expenseTypeCd,
    receiptNumber,
    itemName,
    itemQTY,
    itemPrice,
    receiptTotal,
  };

  console.log("Data to be stored:", expensesData);

  try {
    const db = getFirestore(app);
    const EXPENSE_ITEM_COLLECTION = collection(db, "EXPENSE_ITEM");
    await addDoc(EXPENSE_ITEM_COLLECTION, expensesData);
    console.log("Expense added successfully");
  } catch (error) {
    console.error("Error adding expense:", error);
  }
};
