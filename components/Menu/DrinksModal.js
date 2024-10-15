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
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import { retrieveItemCategory } from "../../services/firebase/Home/retrieveItemCategory";

import { UpdateDrinks } from "../../services/firebase/Menu/updateDrinks";

export default function DrinksModal({
  modalState,
  setModalState,
  selectedItem,
}) {
  console.log("Selected Item: ", selectedItem);
  const itemCategories = retrieveItemCategory();

  const [productName, setProductName] = useState("");
  const [amountSmall, setAmountSmall] = useState("");
  const [amountMedium, setAmountMedium] = useState("");
  const [amountLarge, setAmountLarge] = useState("");
  const [fpAmountSmall, setFpAmountSmall] = useState("");
  const [fpAmountMedium, setFpAmountMedium] = useState("");
  const [fpAmountLarge, setFpAmountLarge] = useState("");
  const [grabAmountSmall, setGrabAmountSmall] = useState("");
  const [grabAmountMedium, setGrabAmountMedium] = useState("");
  const [grabAmountLarge, setGrabAmountLarge] = useState("");

  const [selectedItemCategory, setSelectedItemCategory] = useState("");

  const handleApplyChanges = async () => {
    setModalState(false);

    const updateProductName = productName || selectedItem.productName;
    const updateCategory = selectedItemCategory;

    const updateAmountSmall =
      amountSmall !== "" ? parseFloat(amountSmall) : selectedItem.amountSmall;
    const updateAmountMedium =
      amountMedium !== ""
        ? parseFloat(amountMedium)
        : selectedItem.amountMedium;
    const updateAmountLarge =
      amountLarge !== "" ? parseFloat(amountLarge) : selectedItem.amountLarge;

    const updateFpAmountSmall =
      fpAmountSmall !== ""
        ? parseFloat(fpAmountSmall)
        : selectedItem.fpAmountSmall;
    const updateFpAmountMedium =
      fpAmountMedium !== ""
        ? parseFloat(fpAmountMedium)
        : selectedItem.fpAmountMedium;
    const updateFpAmountLarge =
      fpAmountLarge !== ""
        ? parseFloat(fpAmountLarge)
        : selectedItem.fpAmountLarge;

    const updateGrabAmountSmall =
      grabAmountSmall !== ""
        ? parseFloat(grabAmountSmall)
        : selectedItem.grabAmountSmall;
    const updateGrabAmountMedium =
      grabAmountMedium !== ""
        ? parseFloat(grabAmountMedium)
        : selectedItem.grabAmountMedium;
    const updateGrabAmountLarge =
      grabAmountLarge !== ""
        ? parseFloat(grabAmountLarge)
        : selectedItem.grabAmountLarge;

    console.log("Updated Category: ", updateCategory);

    await UpdateDrinks(
      selectedItem,
      updateProductName,
      updateCategory,
      updateAmountSmall,
      updateAmountMedium,
      updateAmountLarge,
      updateFpAmountSmall,
      updateFpAmountMedium,
      updateFpAmountLarge,
      updateGrabAmountSmall,
      updateGrabAmountMedium,
      updateGrabAmountLarge
    );

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

          <TextInput
            style={styles.bigInput}
            placeholder={selectedItem.productName}
            value={productName || null}
            onChangeText={setProductName}
          />

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

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabelText}>Small</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.amountSmall}
                value={amountSmall || null}
                onChangeText={setAmountSmall}
              />
            </View>

            <View>
              <Text style={styles.priceLabelText}>Medium</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.amountMedium}
                value={amountMedium || null}
                onChangeText={setAmountMedium}
              />
            </View>

            <View>
              <Text style={styles.priceLabelText}>Large</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.amountLarge}
                value={amountLarge || null}
                onChangeText={setAmountLarge}
              />
            </View>
          </View>

          <Text style={styles.priceLabelText}>Foodpanda Rates</Text>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabelText}>Small</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.fpAmountSmall}
                value={fpAmountSmall || null}
                onChangeText={setFpAmountSmall}
              />
            </View>

            <View>
              <Text style={styles.priceLabelText}>Medium</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.fpAmountMedium}
                value={fpAmountMedium || null}
                onChangeText={setFpAmountMedium}
              />
            </View>

            <View>
              <Text style={styles.priceLabelText}>Large</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.fpAmountLarge}
                value={fpAmountLarge || null}
                onChangeText={setFpAmountLarge}
              />
            </View>
          </View>

          <Text style={styles.priceLabelText}>Grab Rates</Text>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabelText}>Small</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.grabAmountSmall}
                value={grabAmountSmall || null}
                onChangeText={setGrabAmountSmall}
              />
            </View>

            <View>
              <Text style={styles.priceLabelText}>Medium</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.grabAmountMedium}
                value={grabAmountMedium || null}
                onChangeText={setGrabAmountMedium}
              />
            </View>

            <View>
              <Text style={styles.priceLabelText}>Large</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.grabAmountLarge}
                value={grabAmountLarge || null}
                onChangeText={setGrabAmountLarge}
              />
            </View>
          </View>

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
  picker: {
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
});
