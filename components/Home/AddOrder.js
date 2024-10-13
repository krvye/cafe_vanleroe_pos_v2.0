import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import ItemSizesButtons from "./SmallComponents/AddOrder/ItemSizesButtons";
import ItemQuantitySelector from "./SmallComponents/AddOrder/ItemQuantitySelector";
import AddOns from "./SmallComponents/AddOrder/AddOns";
import itemSizes from "@utils/Home/ItemSizes";
import AddNote from "./SmallComponents/AddOrder/AddNote";

export default function AddOrder({
  modalState,
  setModalState,
  selectedItem,
  foodService,
  setItemPrice,
  itemPrice,
  setTotalPrice,
  totalPrice,
  setSubTotal,
  setOrderDetails,
}) {
  const [itemSize, setItemSize] = useState("");
  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addOns, setAddOns] = useState([]);
  const [note, setNote] = useState("");
  const [addOnPrice, setAddOnPrice] = useState(0);

  console.log("Total Single Item Price: ", itemPrice + addOnPrice);

  const productName = selectedItem.productName ? selectedItem.productName : "";

  useEffect(() => {
    setTotalPrice((itemPrice + addOnPrice) * quantity);
  }, [itemPrice, addOnPrice, quantity]);

  const handleAddOrder = () => {
    // Create an order object with relevant details.
    const newOrder = {
      productName: selectedItem.productName,
      itemSize: itemSize,
      itemPrice: itemPrice + addOnPrice,
      quantity: quantity,
      totalPrice: totalPrice,
      addOns: addOns, // Include selected add-ons in the order object
      note: note,
    };

    // Update the order details by adding the new order.
    setOrderDetails((prevOrders) => [...prevOrders, newOrder]);

    // Set the subTotal with the current totalPrice when the order is confirmed.
    setSubTotal((prev) => prev + totalPrice);

    // Close the modal without resetting the totalPrice.
    setQuantity(1);
    setNote("");
    setItemSize("");
    setActive(0);
    setModalState(false);
  };

  return (
    <Modal visible={modalState} transparent={true}>
      <View style={styles.modalStyles}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "height" : "padding"}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.addOrderLabel}>
                Add order - {productName}
              </Text>
              <Pressable onPress={() => setModalState(false)}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>
            <View style={styles.bottomBorder}></View>

            <ItemSizesButtons
              active={active}
              setActive={setActive}
              itemSizes={itemSizes}
              setItemSize={setItemSize}
            />

            <ItemQuantitySelector
              selectedItem={selectedItem}
              foodService={foodService}
              itemSize={itemSize}
              setItemPrice={setItemPrice}
              quantity={quantity}
              setQuantity={setQuantity}
            />

            <AddOns setAddOns={setAddOns} setAddOnPrice={setAddOnPrice} />

            <View style={styles.bottomBorder}></View>

            <AddNote note={note} setNote={setNote} />

            <View style={styles.submitContainer}>
              <View>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>₱{totalPrice.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddOrder}
              >
                <Text style={styles.buttonText}>Add to order</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyles: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 50,
    backgroundColor: "white",
    maxHeight: "80%",
    width: "60%",
    borderRadius: 25,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
    marginTop: 20,
    marginBottom: 10,
  },
  addOrderLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#19191C",
  },

  submitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 30,
  },
  totalLabel: {
    fontSize: 14,
    color: "#828487",
    fontWeight: "400",
  },
  totalAmount: {
    fontSize: 16,
    color: "#19191C",
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#B66619",
    paddingVertical: 10,
    flex: 0.5,
    alignItems: "center",
    borderRadius: 60,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
