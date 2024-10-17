import { useState } from "react";
import { StyleSheet, View } from "react-native";

import AddOrder from "@components/Home/AddOrder";
import Sidebar from "@components/Home/Sidebar";
import MenuItems from "@components/Home/MenuItems";
import ViewOrderModal from "@components/Home/ViewOrderModal";
import PaymentDetails from "@components/Home/PaymentDetails";

export default function HomeScreen({ route }) {
  const { employeeId } = route.params;
  console.log("Employee: ", employeeId);

  const [modalState, setModalState] = useState(false);
  const [viewOrderState, setViewOrderState] = useState(false);
  const [paymentDetailsState, setPaymentDetailsState] = useState(false);
  const [foodService, setFoodService] = useState("");
  const [discount, setDiscount] = useState(0);
  const [customDiscountCode, setCustomDiscountCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedCategoryCode, setSelectedCategoryCode] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [retekessNumber, setRetekessNumber] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [timeElapsed, setTimeElapsed] = useState("");
  const [onsiteMode, setOnsiteMode] = useState("");
  const [resetOrder, setResetOrder] = useState(false);

  console.log("Food Service", foodService);

  return (
    <View style={styles.container}>
      <Sidebar setSelectedCategoryCode={setSelectedCategoryCode} />
      <MenuItems
        setModalState={setModalState}
        setViewOrderState={setViewOrderState}
        setFoodService={setFoodService}
        selectedCategoryCode={selectedCategoryCode}
        setSelectedItem={setSelectedItem}
        setCustomerName={setCustomerName}
        setOrderNote={setOrderNote}
        setOrderNumber={setOrderNumber}
        setRetekessNumber={setRetekessNumber}
        setTimeElapsed={setTimeElapsed}
        setOrderDetails={setOrderDetails}
        setCustomDiscountCode={setCustomDiscountCode}
        setDiscount={setDiscount}
        setFinalTotal={setFinalTotal}
        setSubTotal={setSubTotal}
        setPaymentMethod={setPaymentMethod}
        setPaymentDetails={setPaymentDetails}
        foodService={foodService}
        setOnsiteMode={setOnsiteMode}
        orderDetails={orderDetails}
        resetOrder={resetOrder}
      />
      <AddOrder
        modalState={modalState}
        setModalState={setModalState}
        selectedItem={selectedItem}
        foodService={foodService}
        setItemPrice={setItemPrice}
        itemPrice={itemPrice}
        setTotalPrice={setTotalPrice}
        totalPrice={totalPrice}
        setSubTotal={setSubTotal}
        setOrderDetails={setOrderDetails}
      />
      <ViewOrderModal
        viewOrderState={viewOrderState}
        setViewOrderState={setViewOrderState}
        setPaymentDetailsState={setPaymentDetailsState}
        setDiscount={setDiscount}
        foodService={foodService}
        setSubTotal={setSubTotal}
        subTotal={subTotal}
        discount={discount}
        setFinalTotal={setFinalTotal}
        finalTotal={finalTotal}
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
        customDiscountCode={customDiscountCode}
        setCustomDiscountCode={setCustomDiscountCode}
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
        setOnsiteMode={setOnsiteMode}
      />
      <PaymentDetails
        paymentDetailsState={paymentDetailsState}
        setPaymentDetailsState={setPaymentDetailsState}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        finalTotal={finalTotal}
        setPaymentDetails={setPaymentDetails}
        paymentDetails={paymentDetails}
        foodService={foodService}
        discount={discount}
        customDiscountCode={customDiscountCode}
        retekessNumber={retekessNumber}
        orderNumber={orderNumber}
        orderNote={orderNote}
        customerName={customerName}
        timeElapsed={timeElapsed}
        orderDetails={orderDetails}
        employeeId={employeeId}
        subTotal={subTotal}
        onsiteMode={onsiteMode}
        setResetOrder={setResetOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
