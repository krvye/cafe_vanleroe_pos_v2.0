import { useState } from "react";
import { StyleSheet, View } from "react-native";

import AddOrder from "@components/Home/AddOrder";
import ItemSelected from "@components/Home/ItemSelected";
import PayNowSelected from "@components/Home/PayNowSelected";
import PlaceOrderSelected from "@components/Home/PlaceOrderSelected";
import Sidebar from "@components/Home/Sidebar";
import MenuItems from "@components/Home/MenuItems";

export default function HomeScreen() {
  const [modalState, setModalState] = useState(false);

  return (
    <View style={styles.container}>
      <Sidebar />
      <MenuItems setModalState={setModalState} />
      <AddOrder modalState={modalState} setModalState={setModalState} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
