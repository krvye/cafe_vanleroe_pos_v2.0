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

export const UpdateDrinks = async (
  selectedItem,
  updateImageUrl, 
  updateProductName,
  updateCategory,
  updateAmountSmall,
  updateAmountMedium,
  updateAmountLarge,
  updateFpAmountSmall,
  updateFpAmountMedium,
  updateFpAmountLarge,
  updateGrabAmountSmall,
  updateGrabAmountMedium,
  updateGrabAmountLarge
) => {
  const db = getFirestore(app);
  console.log(`Product Name: ${updateProductName} \n 
                Amount Small: ${updateAmountSmall} \n
                Amount Medium: ${updateAmountMedium} \n
                Amount Large: ${updateAmountLarge}`);
                console.log("updated category: ", updateCategory);

  if (!updateCategory) {
    Alert.alert("Choose a category!");
    console.log("Choose a category!");
  } else {
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
              categoryCode: updateCategory,
              amountSmall: updateAmountSmall, 
              amountMedium: updateAmountMedium, 
              amountLarge: updateAmountLarge, 
              fpAmountSmall: updateFpAmountSmall, 
              fpAmountMedium: updateFpAmountMedium, 
              fpAmountLarge: updateFpAmountLarge, 
              grabAmountSmall: updateGrabAmountSmall, 
              grabAmountMedium: updateGrabAmountMedium,
              grabAmountLarge: updateGrabAmountLarge
          })
        })

        console.log("Updated successfully!");
    } catch (error) {
      console.log("Error updating drinks: ", error);
    }
  }
};
