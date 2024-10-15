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
import { Picker } from "@react-native-picker/picker";

import { retrieveItemCategory } from "../../services/firebase/Home/retrieveItemCategory";
import { retrieveMenuItems } from "../../services/firebase/Home/retrieveMenuItems";
import { StoreDrinks } from "../../services/firebase/Menu/storeDrinks";
import { StoreNonDrinks } from "../../services/firebase/Menu/storeNonDrinks";
import { useState } from "react";

export default function DrinksModal({ newItemState, setNewItemState }) {
  const itemCategories = retrieveItemCategory();

  const allMenu = retrieveMenuItems();
  const [itemType, setItemType] = useState("Drinks");

  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // Drinks
  const [amountSmall, setAmountSmall] = useState("");
  const [amountMedium, setAmountMedium] = useState("");
  const [amountLarge, setAmountLarge] = useState("");
  const [fpAmountSmall, setFpAmountSmall] = useState("");
  const [fpAmountMedium, setFpAmountMedium] = useState("");
  const [fpAmountLarge, setFpAmountLarge] = useState("");
  const [grabAmountSmall, setGrabAmountSmall] = useState("");
  const [grabAmountMedium, setGrabAmountMedium] = useState("");
  const [grabAmountLarge, setGrabAmountLarge] = useState("");
  // Non Drinks
  const [itemAmount, setItemAmount] = useState("");
  const [fpItemAmount, setFpItemAmount] = useState("");
  const [grabItemAmount, setGrabItemAmount] = useState("");

  function incrementProductId(productId) {
    const prefix = productId.match(/[A-Z]+/)[0];
    const numberPart = productId.match(/\d+/)[0];
    const incrementedValue = (parseInt(numberPart, 10) + 1).toString();
    const paddedIncrementedValue = incrementedValue.padStart(
      numberPart.length,
      "0"
    );

    return `${prefix}${paddedIncrementedValue}`;
  }

  const handleApplyChanges = async () => {
    setNewItemState(false);
    const filteredMenu = allMenu.filter(
      (menu) => menu.categoryCode === selectedCategory
    );

    const productIds = filteredMenu.map((menu) => menu.productId);
    const highestProductId = productIds.sort().pop();
    const incrementedProductId = incrementProductId(highestProductId);
    console.log("Product Ids: ", productIds);
    console.log("Highest Product Id: ", highestProductId);
    console.log("Incremented Product ID: ", incrementedProductId);

    if (itemType === "Drinks") {
      await StoreDrinks(
        incrementedProductId,
        productName,
        amountSmall,
        amountMedium,
        amountLarge,
        fpAmountSmall,
        fpAmountMedium,
        fpAmountLarge,
        grabAmountSmall,
        grabAmountMedium,
        grabAmountLarge,
        selectedCategory
      );

      setAmountSmall("");
      setAmountMedium("");
      setAmountLarge("");
      setFpAmountSmall("");
      setFpAmountMedium("");
      setFpAmountLarge("");
      setGrabAmountSmall("");
      setGrabAmountMedium("");
      setGrabAmountLarge("");
    } else {
      await StoreNonDrinks(
        incrementedProductId,
        productName,
        itemAmount,
        fpItemAmount,
        grabItemAmount,
        selectedCategory
      );
      setItemAmount("");
      setFpItemAmount("");
      setGrabItemAmount("");
    }

    setProductName("");
    setSelectedCategory("");
  };

  const handleCancelButton = () => {
    setNewItemState(false);

    if (itemType === "Drinks") {
      setAmountSmall("");
      setAmountMedium("");
      setAmountLarge("");
      setFpAmountSmall("");
      setFpAmountMedium("");
      setFpAmountLarge("");
      setGrabAmountSmall("");
      setGrabAmountMedium("");
      setGrabAmountLarge("");
    } else {
      setItemAmount("");
      setFpItemAmount("");
      setGrabItemAmount("");
    }

    setProductName("");
    setSelectedCategory("");
  };

  return (
    <Modal visible={newItemState} transparent={true}>
      <View style={styles.modalStyles}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>New Item</Text>
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={() => {
                setNewItemState(false);
              }}
            />
          </View>

          <View style={styles.bottomBorder}></View>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
            }}
            style={styles.productImage}
          />

          <View style={styles.bottomBorder}></View>

          <Text style={styles.labelText}>Item Type</Text>

          <Picker
            style={styles.picker}
            selectedValue={itemType}
            onValueChange={(value) => setItemType(value)}
          >
            <Picker.Item label="Drinks" value="Drinks" />
            <Picker.Item label="Non-Drinks" value="Non-Drinks" />
          </Picker>

          <Text style={styles.labelText}>Item Name</Text>

          <TextInput
            style={styles.bigInput}
            placeholder="Enter the item name"
            value={productName}
            onChangeText={setProductName}
          />

          <Text style={styles.labelText}>Category</Text>

          <Picker
            style={styles.picker}
            selectedValue={selectedCategory}
            onValueChange={setSelectedCategory || ""}
          >
            {itemCategories.map((category, index) => (
              <Picker.Item
                key={index}
                label={category.itemCategoryDesc}
                value={category.itemCategoryCode}
              />
            ))}
          </Picker>

          {itemType === "Drinks" && (
            <>
              <Text style={styles.priceLabelText}>Price</Text>

              <View style={styles.priceContainer}>
                <View>
                  <Text style={styles.priceLabelText}>Small</Text>
                  <TextInput
                    style={styles.smallInput}
                    value={amountSmall}
                    onChangeText={setAmountSmall}
                  />
                </View>

                <View>
                  <Text style={styles.priceLabelText}>Medium</Text>
                  <TextInput
                    style={styles.smallInput}
                    value={amountMedium}
                    onChangeText={setAmountMedium}
                  />
                </View>

                <View>
                  <Text style={styles.priceLabelText}>Large</Text>
                  <TextInput
                    style={styles.smallInput}
                    value={amountLarge}
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
                    value={fpAmountSmall}
                    onChangeText={setFpAmountSmall}
                  />
                </View>

                <View>
                  <Text style={styles.priceLabelText}>Medium</Text>
                  <TextInput
                    style={styles.smallInput}
                    value={fpAmountMedium}
                    onChangeText={setFpAmountMedium}
                  />
                </View>

                <View>
                  <Text style={styles.priceLabelText}>Large</Text>
                  <TextInput
                    style={styles.smallInput}
                    value={fpAmountLarge}
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
                    value={grabAmountSmall}
                    onChangeText={setGrabAmountSmall}
                  />
                </View>

                <View>
                  <Text style={styles.priceLabelText}>Medium</Text>
                  <TextInput
                    style={styles.smallInput}
                    value={grabAmountMedium}
                    onChangeText={setGrabAmountMedium}
                  />
                </View>

                <View>
                  <Text style={styles.priceLabelText}>Large</Text>
                  <TextInput
                    style={styles.smallInput}
                    value={grabAmountLarge}
                    onChangeText={setGrabAmountLarge}
                  />
                </View>
              </View>
            </>
          )}

          {itemType === "Non-Drinks" && (
            <>
              <Text style={styles.priceLabelText}>Price</Text>

              <TextInput
                style={styles.bigInput}
                value={itemAmount}
                onChangeText={setItemAmount}
              />

              <Text style={styles.priceLabelText}>Foodpanda Rates</Text>

              <TextInput
                style={styles.bigInput}
                value={fpItemAmount}
                onChangeText={setFpItemAmount}
              />

              <Text style={styles.priceLabelText}>Grab Rates</Text>

              <TextInput
                style={styles.bigInput}
                value={grabItemAmount}
                onChangeText={setGrabItemAmount}
              />
            </>
          )}

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
