import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  setItemSize,
  selectedItem,
}) {
  const [active, setActive] = useState(0);

  const productName = selectedItem.productName ? selectedItem.productName : "";

  return (
    <Modal visible={modalState} transparent={true}>
      <View style={styles.modalStyles}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.addOrderLabel}>Add order - {productName}</Text>
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

          <ItemQuantitySelector selectedItem={selectedItem} />

          <AddOns />

          <View style={styles.bottomBorder}></View>

          <AddNote />

          <View style={styles.submitContainer}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>P120</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalState(false)}
            >
              <Text style={styles.buttonText}>Add to order</Text>
            </TouchableOpacity>
          </View>
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
