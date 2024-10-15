import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { retrieveItemCategory } from "../../services/firebase/Home/retrieveItemCategory";
import { UpdateNonDrinks } from "../../services/firebase/Menu/updateNonDrinks";

import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function NonDrinkModal({
  modalState,
  setModalState,
  selectedItem,
}) {
  itemCategories = retrieveItemCategory();

  const [productName, setProductName] = useState("");
  const [selectedItemCategory, setSelectedItemCategory] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [fpItemAmount, setFpItemAmount] = useState("");
  const [grabItemAmount, setGrabItemAmount] = useState("");

  const handleApplyChanges = async () => {
    setModalState(false);

    const updateProductName = productName || selectedItem.productName;
    const updateCategory = selectedItemCategory;

    const updateItemAmount =
      itemAmount !== "" ? parseFloat(itemAmount) : selectedItem.itemAmount;
    const updateFpItemAmount =
      fpItemAmount !== ""
        ? parseFloat(fpItemAmount)
        : selectedItem.fpItemAmount;
    const updateGrabItemAmount =
      grabItemAmount !== ""
        ? parseFloat(grabItemAmount)
        : selectedItem.grabItemAmount;

    await UpdateNonDrinks(
      selectedItem,
      updateProductName,
      updateCategory,
      updateItemAmount,
      updateFpItemAmount,
      updateGrabItemAmount
    );

    setProductName("");
    setSelectedItemCategory("");
    setItemAmount("");
    setFpItemAmount("");
    setGrabItemAmount("");
  };

  const handleCancelButton = () => {
    setModalState(false);

    setProductName("");
    setSelectedItemCategory("");
    setAmountSmall("");
    setAmountMedium("");
    setAmountLarge("");
    setFpAmountSmall("");
    setFpAmountMedium("");
    setFpAmountLarge("");
    setGrabAmountSmall("");
    setGrabAmountMedium("");
    setGrabAmountLarge("");
  };

  return (
    <Modal visible={modalState} transparent={true}>
      <View style={styles.modalStyles}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              Edit Item: {selectedItem.productName}
            </Text>
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={() => {
                setModalState(false);
              }}
            />
          </View>

          <View style={styles.bottomBorder}></View>

          <Image
            source={{
              uri: selectedItem.image,
            }}
            style={styles.productImage}
          />

          <View style={styles.bottomBorder}></View>

          <Text style={styles.labelText}>Item Name</Text>

          <TextInput style={styles.bigInput} value={selectedItem.productName} />

          <Text style={styles.labelText}>Category</Text>

          <Picker
            style={styles.picker}
            selectedValue={selectedItemCategory || ""}
            onValueChange={setSelectedItemCategory}
          >
            {itemCategories.map((category, index) => (
              <Picker.Item
                key={index}
                label={category.itemCategoryDesc}
                value={category.itemCategoryCode}
              />
            ))}
          </Picker>

          <Text style={styles.priceLabelText}>Price</Text>

          <TextInput
            style={styles.bigInput}
            placeholder={selectedItem.itemAmount}
            value={itemAmount || null}
            onChangeText={setItemAmount}
          />

          <Text style={styles.priceLabelText}>Foodpanda Rates</Text>

          <TextInput
            style={styles.bigInput}
            placeholder={selectedItem.fpItemAmount}
            value={fpItemAmount || null}
            onChangeText={setFpItemAmount}
          />

          <Text style={styles.priceLabelText}>Grab Rates</Text>

          <TextInput
            style={styles.bigInput}
            placeholder={selectedItem.grabItemAmount}
            value={grabItemAmount || null}
            onChangeText={setGrabItemAmount}
          />

          <View style={styles.bottomBorder}></View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyChanges}
            >
              <Text style={styles.applyText}>Apply Changes</Text>
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
    width: "45%",
    borderRadius: 25,
    elevation: 5,
  },

  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
    marginTop: 20,
    marginBottom: 10,
  },

  productImage: {
    width: 210,
    height: 150,
    borderRadius: 15,
    alignSelf: "center",
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },

  labelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5A5A5A",
    marginLeft: 20,
  },
  bigInput: {
    height: 55,
    borderColor: "#E5E4E2",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    padding: 20,
  },

  priceLabelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5A5A5A",
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  smallInput: {
    height: 40,
    borderColor: "#E5E4E2",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    padding: 20,
    width: 100,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 50,
    gap: 10,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#F9BC4D",
    borderRadius: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },
  applyButton: {
    backgroundColor: "#F9BC4D",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 45,
  },
  cancelText: {
    color: "#F9BC4D",
    fontWeight: "600",
  },
  applyText: {
    fontWeight: "600",
  },

  picker: {
    height: 55,
    borderColor: "#E5E4E2",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    padding: 20,
  },
});
