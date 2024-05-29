import { StyleSheet, Text, TextInput, View } from "react-native";

export default function CustomerDetails() {
  return (
    <View>
      <Text style={styles.headerText}>Customer Information</Text>
      <TextInput placeholder="Customer name" style={styles.customerInput} />
      <TextInput placeholder="Order number" style={styles.customerInput} />
      <TextInput placeholder="Add Note" style={styles.customerInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#19191C",
  },
  customerInput: {
    borderWidth: 1,
    borderColor: "#E4E4E4",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 60,
    marginTop: 15,
  },
});
