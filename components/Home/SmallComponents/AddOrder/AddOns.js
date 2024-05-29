import { useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function AddOns() {
  const [quantity, setQuantity] = useState(0);

  return (
    <View>
      <Text style={styles.headerText}>Add-ons</Text>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
            }}
            style={styles.productImage}
          />
          <View>
            <Text style={styles.productName}>Dark Mocha</Text>
            <Text style={styles.productPrice}>P120</Text>
          </View>
        </View>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            onPress={() => {
              setQuantity(quantity - 1);
            }}
          >
            <AntDesign name="minuscircle" size={30} color="gray" />
          </TouchableOpacity>
          <Text style={styles.counterText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              setQuantity(quantity + 1);
            }}
          >
            <AntDesign name="pluscircle" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    borderRadius: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerText: {
    fontSize: 16,
    color: "#19191C",
    fontWeight: "600",
  },
  itemContainer: { flexDirection: "row", gap: 10 },
  productImage: {
    width: 45,
    height: 45,
    borderRadius: 15,
  },
  productName: {
    fontSize: 14,
    color: "#19191C",
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 14,
    color: "#19191C",
    fontWeight: "400",
  },

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
