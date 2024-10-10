import { useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { retrieveItemAddOns } from "@services/firebase/Home/retrieveItemAddOns";

export default function AddOns() {
  const [quantities, setQuantities] = useState({});

  const handleIncrement = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 0) + 1,
    }));
  };

  const handleDecrement = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: Math.max((prevQuantities[index] || 0) - 1, 0),
    }));
  };

  const itemAddOns = retrieveItemAddOns();

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
