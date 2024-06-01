import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Order payment</Text>
        <AntDesign name="close" size={24} color="black" />
      </View>
      <Text style={styles.orderNoText}>Order #102</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#E4E4E4",
    borderBottomWidth: 1,
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#19191C",
  },
  orderNoText: {
    color: "#828487",
    fontSize: 14,
    fontWeight: "400",
  },
});
