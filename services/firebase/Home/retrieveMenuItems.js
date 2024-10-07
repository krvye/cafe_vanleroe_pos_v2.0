import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

export function retrieveMenuItems() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const MENU_ITEMS = collection(db, "POS_MENU_ITEMS");

    const subscribeMenuItems = onSnapshot(MENU_ITEMS, (snapshot) => {
      const menuItemsData = [];
      snapshot.forEach((doc) => {
        menuItemsData.push({ doc_id: doc.id, ...doc.data() });
      });
      setMenuItems(menuItemsData);
    });

    return () => subscribeMenuItems();
  }, []);

  return menuItems;
}
