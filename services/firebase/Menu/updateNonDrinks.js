import { app } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { Alert } from "react-native";

export const UpdateNonDrinks = async (
  selectedItem,
  updateImageUrl,
  updateProductName,
  updateCategory, 
  updateItemAmount, 
  updateFpItemAmount,
  updateGrabItemAmount
) => {
  const db = getFirestore(app);
  console.log(`Product Name: ${updateProductName}`);

  if (!updateCategory) {
    Alert.alert("Choose a category!");
    console.log("Choose a category!");
  }
  try {
    const POS_MENU_COLLECTION = collection(db, "POS_MENU_ITEMS");

    const menuDocQuery = query(
      POS_MENU_COLLECTION,
      where("productId", "==", selectedItem.productId)
    );
    const menuDocSnapshot = await getDocs(menuDocQuery);
    
    menuDocSnapshot.forEach(async (doc) => {
      updateDoc(doc.ref, {
        image: updateImageUrl,
        productName: updateProductName, 
        itemAmount: updateItemAmount, 
        fpItemAmount: updateFpItemAmount, 
        grabItemAmount: updateGrabItemAmount
      })
    })
    console.log("Updated successfully!");
  } catch (error) {
    console.log("Error updating or adding non drinks: ", error);
  }
};
