import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function OrderDetails() {
  return (
    <View>
      <Text>Order Details</Text>
      <View>
        <Image />
        <View>
          <Text>Dark Mocha</Text>
          <Text>Size: M</Text>
          <Text>Add Ons: N/A</Text>
          <Text>Order Notes: N/A</Text>
          <Text>P 120</Text>
        </View>
        <View style={styles.counterContainer}>
          <TouchableOpacity
          // onPress={() => {
          //   setQuantity(quantity - 1);
          // }}
          >
            <AntDesign name="minuscircle" size={30} color="gray" />
          </TouchableOpacity>
          <Text style={styles.counterText}>1</Text>
          <TouchableOpacity
          // onPress={() => {
          //   setQuantity(quantity + 1);
          // }}
          >
            <AntDesign name="pluscircle" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  counterText: {
    fontSize: 14,
    color: "#19191C",
    fontWeight: "600",
  },
});
