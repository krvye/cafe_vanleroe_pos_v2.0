import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ItemQuantitySelector({
  selectedItem,
  foodService,
  itemSize,
  setItemPrice,
  quantity,
  setQuantity,
  setUnavailableSize,
}) {
  useEffect(() => {
    // Calculate initial price based on the default quantity and selected properties.
    const basePrice = getProductPrice();
    const initialPrice = basePrice * quantity;
    setUnavailableSize(basePrice === 0);
    setItemPrice(basePrice);
  }, [selectedItem, foodService, itemSize]);

  const getProductPrice = () => {
    if (foodService === "Grab") {
      if (itemSize === "Small") return selectedItem.grabAmountSmall;
      if (itemSize === "Medium") return selectedItem.grabAmountMedium;
      if (itemSize === "Large") return selectedItem.grabAmountLarge;
    } else if (foodService === "Foodpanda") {
      if (itemSize === "Small") return selectedItem.fpAmountSmall;
      if (itemSize === "Medium") return selectedItem.fpAmountMedium;
      if (itemSize === "Large") return selectedItem.fpAmountLarge;
    } else {
      if (itemSize === "Small") return selectedItem.amountSmall;
      if (itemSize === "Medium") return selectedItem.amountMedium;
      if (itemSize === "Large") return selectedItem.amountLarge;
    }
    return selectedItem.itemAmount;
  };

  const handleIncrement = () => {
    const basePrice = getProductPrice();
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    const basePrice = getProductPrice();
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        return newQuantity;
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: selectedItem.image,
          }}
          style={styles.productImage}
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.productName}>{selectedItem.productName}</Text>
          <View>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.productPrice}>
              {getProductPrice() > 0
                ? `₱${getProductPrice().toFixed(2)}`
                : "Not Available Size"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={handleDecrement}>
          <AntDesign name="minuscircle" size={30} color="gray" />
        </TouchableOpacity>
        <Text style={styles.counterText}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncrement}>
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
    color: "#B66619",
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
