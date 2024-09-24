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
  const [paymentDetailsState, setPaymentDetailsState] = useState(false);
  const [foodService, setFoodService] = useState("Dine In");
  const [itemSize, setItemSize] = useState("Small");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  console.log(foodService);

  return (
    <View style={styles.container}>
      <Sidebar />
      <MenuItems
        setModalState={setModalState}
        setViewOrderState={setViewOrderState}
        setFoodService={setFoodService}
      />
      <AddOrder
        modalState={modalState}
        setModalState={setModalState}
        setItemSize={setItemSize}
      />
      <ViewOrderModal
        viewOrderState={viewOrderState}
        setViewOrderState={setViewOrderState}
        setPaymentDetailsState={setPaymentDetailsState}
        setDiscount={setDiscount}
        foodService={foodService}
      />
      <PaymentDetails
        paymentDetailsState={paymentDetailsState}
        setPaymentDetailsState={setPaymentDetailsState}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
