import { Modal, ScrollView, StyleSheet, View } from "react-native";

import Header from "./SmallComponents/PayNowDetails/Header";
import AmountDetails from "./SmallComponents/PayNowDetails/AmountDetails";
import PaymentMethod from "./SmallComponents/PayNowDetails/PaymentMethod";
import InputAmount from "./SmallComponents/PayNowDetails/InputAmount";

export default function PaymentDetails({
  paymentDetailsState,
  setPaymentDetailsState,
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <Modal visible={paymentDetailsState} transparent={true}>
      <View style={styles.background}>
        <ScrollView style={styles.container}>
          <Header setModalState={setPaymentDetailsState} />

          <AmountDetails />

          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          <InputAmount />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, alignItems: "flex-end" },
  container: {
    backgroundColor: "white",
    width: "35%",
  },
});
