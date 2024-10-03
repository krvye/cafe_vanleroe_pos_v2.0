import { useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";

export const StoreExpenses = () => {
  // Set Data
  const [expenseType, setExpenseType] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const handleAddExpenseItem = async () => {
    if (
        !expenseType || 
        !receiptNumber || 
        !itemName || 
        !itemQty || 
        !itemPrice || 
        !totalPrice 
    )
  }
};
