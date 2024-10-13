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
  const [foodService, setFoodService] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedCategoryCode, setSelectedCategoryCode] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState([]);

  return (
    <View style={styles.container}>
      <Sidebar setSelectedCategoryCode={setSelectedCategoryCode} />
      <MenuItems
        setModalState={setModalState}
        setViewOrderState={setViewOrderState}
        setFoodService={setFoodService}
        selectedCategoryCode={selectedCategoryCode}
        setSelectedItem={setSelectedItem}
      />
      <AddOrder
        modalState={modalState}
        setModalState={setModalState}
        setItemSize={setItemSize}
        selectedItem={selectedItem}
        foodService={foodService}
        itemSize={itemSize}
        setItemPrice={setItemPrice}
        itemPrice={itemPrice}
        setTotalPrice={setTotalPrice}
        totalPrice={totalPrice}
        setSubTotal={setSubTotal}
      />
      <ViewOrderModal
        viewOrderState={viewOrderState}
        setViewOrderState={setViewOrderState}
        setPaymentDetailsState={setPaymentDetailsState}
        setDiscount={setDiscount}
        foodService={foodService}
        subTotal={subTotal}
        discount={discount}
        setFinalTotal={setFinalTotal}
        finalTotal={finalTotal}
      />
      <PaymentDetails
        paymentDetailsState={paymentDetailsState}
        setPaymentDetailsState={setPaymentDetailsState}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        finalTotal={finalTotal}
        setPaymentDetails={setPaymentDetails}
        paymentDetails={paymentDetails}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
