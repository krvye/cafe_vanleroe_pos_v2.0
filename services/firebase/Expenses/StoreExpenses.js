import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
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

  const db = getFirestore(app);
  const EXPENSE_ITEM_COLLECTION = collection(db, "EXPENSE_ITEM");

  // Check if there are existing documents
  const docQuery = query(
    EXPENSE_ITEM_COLLECTION,
    where("receiptNumber", "==", receiptNumber),
    where("expenseTypeCd", "==", expenseTypeCd), 
    where("itemName", "==", itemName)
  );

  const docSnapshot = await getDocs(docQuery); 
  docSnapshot.forEach(async (doc) => {
    await updateDoc(doc.ref, {
      itemName: itemName,
      itemQTY: itemQTY,
      itemPrice: itemPrice,
      receiptTotal: receiptTotal,
    });
  });

  if (docSnapshot.empty) {
    await addDoc(EXPENSE_ITEM_COLLECTION, expensesData); 
  }


};
