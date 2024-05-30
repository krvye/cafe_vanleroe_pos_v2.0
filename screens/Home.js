import { useState } from "react";
import { StyleSheet, View } from "react-native";

import AddOrder from "@components/Home/AddOrder";
import Sidebar from "@components/Home/Sidebar";
import MenuItems from "@components/Home/MenuItems";
import ViewOrderModal from "@components/Home/ViewOrderModal";
import PaymentDetails from "@components/Home/PaymentDetails";

export default function HomeScreen() {
  const [modalState, setModalState] = useState(false);
  const [viewOrderState, setViewOrderState] = useState(false);

  return (
    <View style={styles.container}>
      <Sidebar />
      <MenuItems
        setModalState={setModalState}
        setViewOrderState={setViewOrderState}
      />
      <AddOrder modalState={modalState} setModalState={setModalState} />
      <ViewOrderModal
        viewOrderState={viewOrderState}
        setViewOrderState={setViewOrderState}
      />
      <PaymentDetails />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
