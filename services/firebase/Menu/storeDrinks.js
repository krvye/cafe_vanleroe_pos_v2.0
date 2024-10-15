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

export const StoreDrinks = async (
  incrementedProductId,
  productName,
  amountSmall,
  amountMedium,
  amountLarge,
  fpAmountSmall,
  fpAmountMedium,
  fpAmountLarge,
  grabAmountSmall,
  grabAmountMedium,
  grabAmountLarge,
  selectedCategory
) => {
  console.log("Hello World!");
    const db = getFirestore(app); 

    if (!productName ||
        !amountSmall ||
        !amountMedium ||
        !amountLarge ||
        !fpAmountSmall || 
        !fpAmountMedium || 
        !fpAmountLarge || 
        !grabAmountSmall || 
        !grabAmountMedium || 
        !grabAmountLarge || 
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
                    amountSmall: parseFloat(amountSmall),
                    amountMedium: parseFloat(amountMedium), 
                    amountLarge: parseFloat(amountLarge), 
                    fpAmountSmall: parseFloat(fpAmountSmall), 
                    fpAmountMedium: parseFloat(fpAmountMedium), 
                    fpAmountLarge: parseFloat(fpAmountLarge), 
                    grabAmountSmall: parseFloat(grabAmountSmall), 
                    grabAmountMedium: parseFloat(grabAmountMedium), 
                    grabAmountLarge: parseFloat(grabAmountLarge), 
                    categoryCode: selectedCategory
                })
            }); 
    
            if (menuDocSnapshot.empty) {
                await addDoc(POS_MENU_COLLECTION, {
                    image: "https://firebasestorage.googleapis.com/v0/b/cafe-vanleroe-system-test.appspot.com/o/MENU_ITEMS%2Foriginal_logo.jpg?alt=media&token=9bf623f9-4c87-4136-87b5-c6cccfda8a54",
                    productId: incrementedProductId, 
                    productName: productName,
                    itemAmount: 0, 
                    fpItemAmount: 0, 
                    grabItemAmount: 0,
                    amountSmall: parseFloat(amountSmall),
                    amountMedium: parseFloat(amountMedium), 
                    amountLarge: parseFloat(amountLarge), 
                    fpAmountSmall: parseFloat(fpAmountSmall), 
                    fpAmountMedium: parseFloat(fpAmountMedium), 
                    fpAmountLarge: parseFloat(fpAmountLarge), 
                    grabAmountSmall: parseFloat(grabAmountSmall), 
                    grabAmountMedium: parseFloat(grabAmountMedium), 
                    grabAmountLarge: parseFloat(grabAmountLarge), 
                    categoryCode: selectedCategory
                })
            }

            console.log("Item added successfully!");
        } catch (error) {
            console.log("Error updating or adding data: ", error);
        }
    }
};
