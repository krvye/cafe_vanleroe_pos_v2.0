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
  customDiscountCode,
  setCustomDiscountCode,
  setRetekessNumber,
  setOrderNumber,
  setOrderNote,
  setCustomerName,
  setTimeElapsed,
  customerName,
  retekessNumber,
  timeElapsed,
  orderNumber,
  orderNote,
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
            setRetekessNumber={setRetekessNumber}
            setOrderNumber={setOrderNumber}
            setOrderNote={setOrderNote}
            setCustomerName={setCustomerName}
            setTimeElapsed={setTimeElapsed}
            customerName={customerName}
            retekessNumber={retekessNumber}
            timeElapsed={timeElapsed}
            orderNumber={orderNumber}
            orderNote={orderNote}
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
            customDiscountCode={customDiscountCode}
            setCustomDiscountCode={setCustomDiscountCode}
          />

          <PayNow
            setViewOrderState={setViewOrderState}
            setPaymentDetailsState={setPaymentDetailsState}
            subTotal={subTotal}
            discount={discount}
            setFinalTotal={setFinalTotal}
            finalTotal={finalTotal}
            foodService={foodService}
            customerName={customerName}
            retekessNumber={retekessNumber}
            timeElapsed={timeElapsed}
            orderNumber={orderNumber}
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
