import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { retrieveMenuItems } from "@services/firebase/Home/retrieveMenuItems";

export default function Items({
  setModalState,
  selectedCategoryCode,
  setSelectedItem,
  foodService,
}) {
  const styles = makeStyles(useWindowDimensions().height);

  const itemData = retrieveMenuItems();

  const filteredItems = selectedCategoryCode
    ? itemData.filter((item) => item.categoryCode === selectedCategoryCode)
    : itemData;

  const handleItemPress = (item) => {
    if (!foodService) {
      Alert.alert("Alert", "Choose order mode first");
      return;
    }

    setModalState(true);
    setSelectedItem(item);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      nestedScrollEnabled={true}
    >
      {filteredItems.map((item, index) => (
        <TouchableOpacity
          style={styles.productContainer}
          key={index}
          onPress={() => handleItemPress(item)}
        >
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <Text style={styles.productName}>{item.productName}</Text>
          {/* <Text style={styles.productPrice}>{item.amountMedium}</Text> */}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const makeStyles = (height) =>
  StyleSheet.create({
    container: {
      maxHeight: height * 0.6,
      marginVertical: 20,
    },
    contentContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    productContainer: {
      alignItems: "center",
      paddingVertical: 20,
    },
    productImage: {
      width: 200,
      height: 150,
      borderRadius: 15,
    },
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
  });
