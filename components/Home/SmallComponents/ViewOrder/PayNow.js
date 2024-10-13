import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PayNow({
  setViewOrderState,
  setPaymentDetailsState,
  subTotal,
  discount,
  setFinalTotal,
  finalTotal,
}) {
  useEffect(() => {
    setFinalTotal(subTotal - discount);
  }, [subTotal, discount, setFinalTotal]);

  return (
    <View style={styles.container}>
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Sub Total</Text>
        <Text style={styles.amountText}>₱{subTotal.toFixed(2)}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Discount</Text>
        <Text style={styles.amountText}>₱{discount}</Text>
      </View>

      <View style={styles.brokenBorder}></View>

      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Total</Text>
        <Text style={styles.totalAmount}>₱{finalTotal.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.payNowButton}
        onPress={() => {
          setViewOrderState(false);
          setPaymentDetailsState(true);
        }}
      >
        <Text style={styles.payNowText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 35,
    borderTopWidth: 1,
    borderColor: "#E4E4E4",
    padding: 25,
  },

  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  amountLabel: {
    fontSize: 16,
    color: "#828487",
    fontWeight: "400",
  },
  amountText: {
    fontSize: 16,
    color: "#19191C",
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 16,
    color: "#B66619",
    fontWeight: "600",
  },

  brokenBorder: {
    borderWidth: 1,
    borderColor: "#E4E4E4",
    borderStyle: "dashed",
    marginBottom: 15,
  },

  payNowButton: {
    backgroundColor: "#B66619",
    paddingVertical: 15,
    borderRadius: 60,
    alignItems: "center",
    flex: 1,
  },
  payNowText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
