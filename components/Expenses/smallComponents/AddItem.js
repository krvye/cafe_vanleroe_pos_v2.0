import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import { useState } from "react";

export default function AddItem({
  index,
  handleRemoveItem,
  handleAddItem,
  itemLength,
}) {
  const [itemName, setItemName] = useState("");
  const [itemQTY, setItemQTY] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [receiptTotal, setReceiptTotal] = useState("");

  const addItem = () => {
    if (itemName && itemQTY && itemPrice && receiptTotal) {
      handleAddItem(itemName, itemQTY, itemPrice, receiptTotal);
    }
    console.log("Item Added!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputTitleCon}>
        <Text style={[styles.inputTitleText, { fontWeight: "500" }]}>
          Item Name:
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.inputTitleText]}
          placeholder="Item Name"
          placeholderTextColor={"gray"}
          value={itemName}
          onChangeText={setItemName}
        />
      </View>

      <View style={styles.inputTitleCon}>
        <Text style={[styles.inputTitleText, { fontWeight: "500" }]}>QTY:</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.inputTitleText]}
          placeholder="Quantity"
          placeholderTextColor={"gray"}
          value={itemQTY.toString()}
          onChangeText={(value) => setItemQTY(Number(value))}
        />
      </View>

      <View style={styles.inputTitleCon}>
        <Text style={[styles.inputTitleText, { fontWeight: "500" }]}>
          Item Price:
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.inputTitleText]}
          placeholder="Item Price"
          placeholderTextColor={"gray"}
          value={itemPrice}
          onChangeText={setItemPrice}
        />
      </View>

      <View style={styles.inputTitleCon}>
        <Text style={[styles.inputTitleText, { fontWeight: "500" }]}>
          Total Price:
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.inputTitleText]}
          placeholder="Total Price"
          placeholderTextColor={"gray"}
          value={receiptTotal}
          onChangeText={setReceiptTotal}
        />
      </View>

      {index === itemLength - 1 ? (
        <View style={styles.rmAndAddCon}>
          <Pressable onPress={() => handleRemoveItem(index)}>
            <Text style={styles.rmAndAddText}>Remove</Text>
          </Pressable>
          <Pressable onPress={addItem}>
            <Text style={styles.rmAndAddText}>Add Item?</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.rmAndAddCon}>
          <Pressable onPress={() => handleRemoveItem(index)}>
            <Text style={styles.rmAndAddText}>Remove</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  inputTitleCon: {
    height: 25,
    width: "100%",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
  inputTitleText: {
    fontSize: 15,
    marginLeft: "5%",
  },
  inputContainer: {
    height: 35,
    width: "100%",
    justifyContent: "center",
    // backgroundColor: "yellow",
  },
  input: {
    flex: 1,
    width: "88%",
    borderColor: "gray",
    borderRadius: 1,
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: "5%",
    padding: 2,
  },
  rmAndAddCon: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  rmAndAddText: {
    fontSize: 14,
    color: "#B66619",
    textDecorationLine: "underline",
    marginRight: 5,
    marginBottom: "15%",
  },
});
