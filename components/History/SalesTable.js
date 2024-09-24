import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function SalesTable() {
  const [visibleItems, setVisibleItems] = useState({});
  const [salesData, setSalesData] = useState([
    {
      customerName: "Mikaela Faye Popes",
      time: "04:20",
      branch: "Waltermart Taytay",
      modeOfPayment: "Cash",
      orderMode: "Onsite",
      noOfOrderedItems: 1,
      orderItems: [{"itemName" : "Americano", "itemQuantity" : 1}],
      price: 250.55,
    },
    {
      customerName: "Kurt Agripa",
      time: "04:20",
      branch: "Waltermart Taytay",
      modeOfPayment: "Gcash",
      orderMode: "Onsite",
      noOfOrderedItems: 1,
      orderItems: [{"itemName" : "Pantropiko", "itemQuantity" : 1}],
      price: 160.0,
    },
    {
      customerName: "Alexia Jose Roque",
      time: "05:20",
      branch: "Waltermart Taytay",
      modeOfPayment: "Cash",
      orderMode: "Onsite",
      noOfOrderedItems: 3,
      orderItems: [
        { itemName: "Americano", itemQuantity: 1 },
        { itemName: "Pantropiko", itemQuantity: 1 },
        { itemName: "Wild Strawberry", itemQuantity: 1 },
      ],
      price: 520.0,
    },
    {
      customerName: "Jane Blanca Ocampo",
      time: "06:40",
      branch: "Ayala Malls Feliz",
      modeOfPayment: "Grab",
      orderMode: "Online",
      noOfOrderedItems: 1,
      orderItems: [{"itemName" : "Spanish Latte", "itemQuantity" : 1}],
      price: 250.55,
    },
    {
      customerName: "Leila Roque",
      time: "12:40",
      branch: "Ayala Malls Feliz",
      modeOfPayment: "Gcash",
      orderMode: "Foodpanda",
      noOfOrderedItems: 2,
      orderItems: [
        { itemName: "Spanish Latte", itemQuantity: 1 },
        { itemName: "Pantropiko", itemQuantity: 1 },
      ],
      price: 400.5,
    },
    {
      customerName: "Alexia Jose Roque",
      time: "05:20",
      branch: "Waltermart Taytay",
      modeOfPayment: "Cash",
      orderMode: "Onsite",
      noOfOrderedItems: 3,
      orderItems: [
        { itemName: "Americano", itemQuantity: 1 },
        { itemName: "Pantropiko", itemQuantity: 1 },
        { itemName: "Wild Strawberry", itemQuantity: 1 },
      ],
      price: 520.0,
    },
    {
      customerName: "Alexia Jose Roque",
      time: "05:20",
      branch: "Waltermart Taytay",
      modeOfPayment: "Cash",
      orderMode: "Onsite",
      noOfOrderedItems: 3,
      orderItems: [
        { itemName: "Americano", itemQuantity: 1 },
        { itemName: "Pantropiko", itemQuantity: 1 },
        { itemName: "Wild Strawberry", itemQuantity: 1 },
      ],
      price: 520.0,
    },
    {
      customerName: "Alexia Jose Roque",
      time: "05:20",
      branch: "Waltermart Taytay",
      modeOfPayment: "Cash",
      orderMode: "Onsite",
      noOfOrderedItems: 3,
      orderItems: [
        { itemName: "Americano", itemQuantity: 1 },
        { itemName: "Pantropiko", itemQuantity: 1 },
        { itemName: "Wild Strawberry", itemQuantity: 1 },
      ],
      price: 520.0,
    },
    {
      customerName: "Alexia Jose Roque",
      time: "05:20",
      branch: "Waltermart Taytay",
      modeOfPayment: "Cash",
      orderMode: "Onsite",
      noOfOrderedItems: 3,
      orderItems: [
        { itemName: "Americano", itemQuantity: 1 },
        { itemName: "Pantropiko", itemQuantity: 1 },
        { itemName: "Wild Strawberry", itemQuantity: 1 },
      ],
      price: 520.0,
    },
    {
      customerName: "Alexia Jose Roque",
      time: "05:20",
      branch: "Waltermart Taytay",
      modeOfPayment: "Cash",
      orderMode: "Onsite",
      noOfOrderedItems: 3,
      orderItems: [
        { itemName: "Americano", itemQuantity: 1 },
        { itemName: "Pantropiko", itemQuantity: 1 },
        { itemName: "Wild Strawberry", itemQuantity: 1 },
      ],
      price: 520.0,
    },
    {
      customerName: "Alexia Jose Roque",
      time: "05:20",
      branch: "Waltermart Taytay",
      modeOfPayment: "Cash",
      orderMode: "Onsite",
      noOfOrderedItems: 3,
      orderItems: [
        { itemName: "Americano", itemQuantity: 1 },
        { itemName: "Pantropiko", itemQuantity: 1 },
        { itemName: "Wild Strawberry", itemQuantity: 1 },
      ],
      price: 520.0,
    },
    {
      customerName: "Alexia Jose Roque",
      time: "05:20",
      branch: "Waltermart Taytay",
      modeOfPayment: "Cash",
      orderMode: "Onsite",
      noOfOrderedItems: 3,
      orderItems: [
        { itemName: "Americano", itemQuantity: 1 },
        { itemName: "Pantropiko", itemQuantity: 1 },
        { itemName: "Wild Strawberry", itemQuantity: 1 },
      ],
      price: 520.0,
    },
  ]);

  const handleVisibleItems = (index) => {
    setVisibleItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const renderItem = ({ item, index }) => {
    const orderedItems = Array.isArray(item.orderItems)
      ? item.orderItems.map(({ itemName, itemQuantity }) => `${itemQuantity} - ${itemName}`).join("\n")
      : item.orderItems;

    return (
      <View style={styles.row}>
        <Text style={[styles.dataText, { width: 200 }]}>
          {item.customerName}
        </Text>
        <Text style={[styles.dataText, { width: 80 }]}>{item.time}</Text>
        <Text style={[styles.dataText, { width: 180 }]}>{item.branch}</Text>
        <Text style={[styles.dataText, { width: 100 }]}>
          {item.modeOfPayment}
        </Text>
        <Text style={[styles.dataText, { width: 120 }]}>{item.orderMode}</Text>
        <Text style={[styles.dataText, { width: 100 }]}>
          {item.noOfOrderedItems}
        </Text>

        {Array.isArray(item.orderItems) ? (
          <Text style={[styles.dataText, { width: 200 }]}>
            {visibleItems[index] ? orderedItems : `${item.orderItems[0].itemQuantity} - ${item.orderItems[0].itemName}`}
          </Text>
        ) : (
          <Text style={[styles.dataText, { width: 200 }]}>{orderedItems}</Text>
        )}

        <Text style={[styles.dataText, { width: 80 }]}>{item.price}</Text>

        {item.orderItems.length > 1 ? (
          <Pressable
            style={styles.eyeIconCon}
            onPress={() => handleVisibleItems(index)}
          >
            {visibleItems[index] ? (
              <VisibilityIcon style={{ width: 80, color: "#B66619" }} />
            ) : (
              <VisibilityOffIcon style={{ width: 80, color: "#B66619" }} />
            )}
          </Pressable>
        ) : (
          <View />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
      >
        <View style={styles.listContainer}>
          <View style={styles.header}>
            <Text style={[styles.headerText, { width: 200 }]}>
              Customer Name
            </Text>
            <Text style={[styles.headerText, { width: 80 }]}>Time</Text>
            <Text style={[styles.headerText, { width: 180 }]}>Branch</Text>
            <Text style={[styles.headerText, { width: 100 }]}>
              Mode of Payment
            </Text>
            <Text style={[styles.headerText, { width: 120 }]}>Order Mode</Text>
            <Text style={[styles.headerText, { width: 100 }]}>
              No. of Ordered Items
            </Text>
            <Text style={[styles.headerText, { width: 200 }]}>
              Ordered Items
            </Text>
            <Text style={[styles.headerText, { width: 80 }]}>Price</Text>
            <Text style={[styles.headerText, { width: 80 }]}></Text>
          </View>
          <View style={styles.rowContainer}>
            <FlatList
              data={salesData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 25,
  },
  listContainer: {
      flex: 1,
      flex: 1,
    borderRadius: 5,
  },
  header: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "#F9BC4D",
    alignItems: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "#fbfbfa",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  dataText: {
    fontSize: 14,
    textAlign: "center",
  },
  rowContainer: {
    height: 420,
    borderBottomEndRadius: 5,
  },
  eyeIconCon: {
    alignItems: "center",
  },
});
