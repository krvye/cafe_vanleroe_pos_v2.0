import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import CustomerDetails from "./SmallComponents/ViewOrder/CustomerDetails";
import OrderDetails from "./SmallComponents/ViewOrder/OrderDetails";
import Discounts from "./SmallComponents/ViewOrder/Discounts";
import PayNow from "./SmallComponents/ViewOrder/PayNow";

import { retrieveDiscountCodes } from "@services/firebase/Home/retrieveDiscountCodes";

export default function ViewOrderModal({
  viewOrderState,
  setViewOrderState,
  setPaymentDetailsState,
  setDiscount,
  foodService,
  setSubTotal,
  subTotal,
  discount,
  setFinalTotal,
  finalTotal,
  orderDetails,
  setOrderDetails,
}) {
  const discountCodes = retrieveDiscountCodes();

  return (
    <Modal visible={viewOrderState} transparent={true}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "padding"}
        >
          <CustomerDetails
            setModalState={setViewOrderState}
            foodService={foodService}
          />

          <View style={styles.borderLine}></View>

          <OrderDetails
            orderDetails={orderDetails}
            setOrderDetails={setOrderDetails}
            setSubTotal={setSubTotal}
          />

          <Discounts
            setDiscount={setDiscount}
            subTotal={subTotal}
            discountCodes={discountCodes}
          />

          <PayNow
            setViewOrderState={setViewOrderState}
            setPaymentDetailsState={setPaymentDetailsState}
            subTotal={subTotal}
            discount={discount}
            setFinalTotal={setFinalTotal}
            finalTotal={finalTotal}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "35%",
    flexDirection: "column",
    padding: 30,
  },
  borderLine: {
    borderWidth: 1,
    borderColor: "#E4E4E4",
    marginVertical: 20,
  },
});
