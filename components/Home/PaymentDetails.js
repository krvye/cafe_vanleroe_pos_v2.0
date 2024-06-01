import { Modal, ScrollView, StyleSheet, View } from "react-native";

import Header from "./SmallComponents/PayNowDetails/Header";
import AmountDetails from "./SmallComponents/PayNowDetails/AmountDetails";
import PaymentMethod from "./SmallComponents/PayNowDetails/PaymentMethod";

export default function PaymentDetails() {
  return (
    <Modal visible={true} transparent={true}>
      <View style={styles.background}>
        <ScrollView style={styles.container}>
          <Header />

          <AmountDetails />

          <PaymentMethod />

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
