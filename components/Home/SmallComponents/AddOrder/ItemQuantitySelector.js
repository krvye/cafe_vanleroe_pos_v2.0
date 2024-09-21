import { useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ItemQuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
          }}
          style={styles.productImage}
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.productName}>Dark Mocha</Text>
          <View>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.productPrice}>P120</Text>
          </View>
        </View>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          onPress={() => {
            if (quantity > 0) {
              setQuantity(quantity - 1);
            }
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FD",
    padding: 20,
    borderRadius: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  itemContainer: { flexDirection: "row", gap: 10 },
  productImage: {
    width: 75,
    height: 75,
    borderRadius: 15,
  },
  itemTextContainer: { justifyContent: "space-between" },
  productName: {
    fontSize: 16,
    color: "#19191C",
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 16,
    color: "#FF5C00",
    fontWeight: "600",
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
