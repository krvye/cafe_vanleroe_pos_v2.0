import { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { retrieveItemAddOns } from "@services/firebase/Home/retrieveItemAddOns";

export default function AddOns({ setTotalPrice }) {
  const [quantities, setQuantities] = useState({});

  const itemAddOns = retrieveItemAddOns();

  const calculateTotalPrice = (newQuantities) => {
    let total = 0;
    itemAddOns.forEach((addOn, index) => {
      total += (newQuantities[index] || 0) * addOn.addOnPrice;
    });
    setTotalPrice((prev) => prev + total);
  };

  const handleIncrement = (index) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [index]: (prevQuantities[index] || 0) + 1,
      };
      calculateTotalPrice(updatedQuantities);
      return updatedQuantities;
    });
  };

  const handleDecrement = (index) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [index]: Math.max((prevQuantities[index] || 0) - 1, 0),
      };
      calculateTotalPrice(updatedQuantities);
      return updatedQuantities;
    });
  };

  return (
    <View>
      <Text style={styles.headerText}>Add-ons</Text>
      {itemAddOns.map((addOn, index) => (
        <View key={index} style={styles.container}>
          <View style={styles.itemContainer}>
            {/* <Image
        source={{
          uri: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        }}
        style={styles.productImage}
      /> */}

            <View>
              <Text style={styles.productName}>{addOn.addOnDesc}</Text>
              <Text style={styles.productPrice}>P{addOn.addOnPrice}</Text>
            </View>
          </View>
          <View style={styles.counterContainer}>
            <TouchableOpacity onPress={() => handleDecrement(index)}>
              <AntDesign name="minuscircle" size={30} color="gray" />
            </TouchableOpacity>
            <Text style={styles.counterText}>{quantities[index] || 0}</Text>
            <TouchableOpacity onPress={() => handleIncrement(index)}>
              <AntDesign name="pluscircle" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
