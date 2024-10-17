import { app } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  updateDoc,
  addDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { Alert } from "react-native";

export const StoreNonDrinks = async (
  imageUrl,
  incrementedProductId,
  productName,
  itemAmount,
  fpItemAmount,
  grabItemAmount,
  selectedCategory
) => {
  console.log("Hello world!");
  console.log("Category here: ", selectedCategory);
  const db = getFirestore(app);
  if (
    !imageUrl || 
    !productName ||
    !itemAmount ||
    !fpItemAmount ||
    !grabItemAmount ||
    !selectedCategory
  ) {
    Alert.alert("Complete all fields!");
    console.log("Complete all fields!");
  } else {
    const POS_MENU_COLLECTION = collection(db, "POS_MENU_ITEMS");

    try {
      const menuDocQuery = query(
        POS_MENU_COLLECTION,
        where("productName", "==", productName)
      );

      const menuDocSnapshot = await getDocs(menuDocQuery);
      menuDocSnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          itemAmount: parseFloat(itemAmount),
          fpItemAmount: parseFloat(fpItemAmount),
          grabItemAmount: parseFloat(grabItemAmount),
          categoryCode: parseFloat(selectedCategory),
        });
      });


      if (menuDocSnapshot.empty) {
        await addDoc(POS_MENU_COLLECTION, {
          image: imageUrl, 
          productId: incrementedProductId,
          productName: productName,
          categoryCode: selectedCategory,
          itemAmount: parseFloat(itemAmount),
          fpItemAmount: parseFloat(fpItemAmount),
          grabItemAmount: parseFloat(grabItemAmount),
          amountSmall: 0,
          amountMedium: 0,
          amountLarge: 0,
          fpAmountSmall: 0,
          fpAmountMedium: 0,
          fpAmountLarge: 0,
          grabAmountSmall: 0,
          grabAmountMedium: 0,
          grabAmountLarge: 0,
        });
        console.log("Added data successfully!");
      }
    } catch (error) {
      console.log("Error updating or adding data: ", error);
    }
  }
};
