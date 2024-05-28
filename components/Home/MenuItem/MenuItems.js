import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Items from "./Items";
import PaymentButtons from "./PaymentButtons";

export default function MenuItems() {
  return (
    <View style={styles.container}>
      <PaymentButtons />
      <Items />
      <View>
        <Pressable>
          <Text>Cancel Order</Text>
        </Pressable>
        <Pressable>
          <Text>View Order</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: "white",
    padding: 20,
  },
});
