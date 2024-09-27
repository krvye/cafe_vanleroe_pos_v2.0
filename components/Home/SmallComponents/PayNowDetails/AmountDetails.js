import { StyleSheet, Text, View } from "react-native";

export default function AmountDetails() {
  return (
    <View style={styles.container}>
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Total Amount</Text>
        <Text style={styles.amountText}>P593</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Payment Method - Cash</Text>
        <Text style={styles.amountDeducted}>-P100</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Payment Method - GCash</Text>
        <Text style={styles.amountDeducted}>-P493</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Change</Text>
        <Text style={styles.amountText}>P0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25 },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#F8F9FD",
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#19191C",
  },
  amountText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#B66619",
  },
  amountDeducted: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FF0000",
  },
});
