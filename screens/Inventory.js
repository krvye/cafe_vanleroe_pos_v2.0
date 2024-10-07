import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import InvTable from "../components/Inventory/InvTable";
import { firestore } from "../firebase"; // Adjust import based on your file structure
import { collection, getDocs, addDoc } from "firebase/firestore"; // Import addDoc to write data

export default function InventoryScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isAM, setIsAM] = useState(true); // To check which button was clicked (AM or PM)
  const [formData, setFormData] = useState({
    firstName: "", // Added for employee first name
    lastName: "", // Added for employee last name
    timeChecked: "AM", // Default value for Time Checked
    itemName: "",
    blkStockQty: "", // Holds the selected item name
    blkDisplayQty: "",
  });

  const [itemsByCategory, setItemsByCategory] = useState({}); // State to hold items grouped by category
  const [selectedItem, setSelectedItem] = useState(null); // To hold the selected item for tracking

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddInventory = async () => {
    const currentDate = new Date();
    const dateChecked = currentDate.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const timeChecked = currentDate.toTimeString().split(" ")[0]; // Get current time HH:MM:SS

    // Only submit fields that have values
    const inventoryData = {
      ...(selectedItem && {
        itemName: selectedItem.itemName,
        itemCategoryCode: selectedItem.itemCategoryCode,
        itemCategory: selectedItem.itemCategory,
        itemType: selectedItem.itemType,
      }),
      ...(formData.timeChecked && { inventoryTimeType: formData.timeChecked }), // AM or PM from dropdown
      timeChecked, // Current time when added
      dateChecked, // Current date
      ...(formData.firstName && { employeeFirstName: formData.firstName }), // Only include if not empty
      ...(formData.lastName && { employeeLastName: formData.lastName }), // Only include if not empty
      ...(formData[`stockQty-${selectedItem?.itemName}`] && {
        stockQty: formData[`stockQty-${selectedItem?.itemName}`],
      }),
      ...(formData[`displayQty-${selectedItem?.itemName}`] && {
        displayQty: formData[`displayQty-${selectedItem?.itemName}`],
      }),
    };

    try {
      // Write the data to Firestore (assuming you have a collection called 'INVENTORY_RECORDS')
      await addDoc(collection(firestore, "POS_INVENTORY_ITEMS"), inventoryData);
      console.log("Inventory record added:", inventoryData);
    } catch (error) {
      console.error("Error adding inventory record:", error);
    }

    setModalVisible(false); // Close the modal after adding
  };

  const openModal = (isAMInventory) => {
    setIsAM(isAMInventory);
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsCollection = collection(firestore, "INVENTORY_ITEMS_DESC");
        const itemSnapshot = await getDocs(itemsCollection);
        const itemsList = itemSnapshot.docs.map((doc) => doc.data()); // Fetch all item details

        // Group items by itemCategoryCode
        const groupedItems = itemsList.reduce((group, item) => {
          const { itemCategoryCode } = item;
          if (!group[itemCategoryCode]) {
            group[itemCategoryCode] = [];
          }
          group[itemCategoryCode].push(item);
          return group;
        }, {});

        setItemsByCategory(groupedItems); // Set the grouped items state
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    fetchItems();
  }, []); // Empty dependency array to run once on mount

  return (
    <ScrollView style={styles.invMainCon}>
      <View style={styles.invContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonAM}
            onPress={() => openModal(true)}
          >
            <Text style={styles.buttonText}>Add Inventory</Text>
          </TouchableOpacity>
        </View>
        <InvTable />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <ScrollView style={styles.modalScroll}>
                <Text style={styles.modalTitle}>Add Item Inventory</Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>

                {/* Employee Name Inputs */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>First Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={formData.firstName}
                    onChangeText={(text) =>
                      handleInputChange("firstName", text)
                    }
                  />
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChangeText={(text) => handleInputChange("lastName", text)}
                  />
                </View>

                {/* Time Checked Dropdown */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Time Checked</Text>
                  <Picker
                    selectedValue={formData.timeChecked}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      handleInputChange("timeChecked", itemValue)
                    }
                  >
                    <Picker.Item label="AM" value="AM" />
                    <Picker.Item label="PM" value="PM" />
                  </Picker>
                </View>

                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Item</Text>
                  <Text style={styles.tableHeader}>Stock</Text>
                  <Text style={styles.tableHeader}>Display</Text>
                </View>

                {/* Grouped Items by Category */}
                {Object.keys(itemsByCategory).map((categoryCode) => (
                  <View key={categoryCode}>
                    {/* Display Category Header */}
                    <Text style={styles.categoryHeader}>{categoryCode}</Text>

                    {/* Items under this category */}
                    {itemsByCategory[categoryCode].map((item, index) => (
                      <View key={index} style={styles.tableRow}>
                        <View style={styles.tableCell}>
                          <Text
                            style={styles.itemNameText}
                            onPress={() => setSelectedItem(item)} // Set selected item on press
                          >
                            {item.itemName}
                          </Text>
                        </View>

                        <TextInput
                          style={styles.input}
                          placeholder="Stock Quantity"
                          keyboardType="numeric"
                          onChangeText={(text) =>
                            handleInputChange(`stockQty-${item.itemName}`, text)
                          }
                        />

                        {item.itemType === "BLK" ? (
                          <Picker
                            selectedValue={
                              formData[`displayQty-${item.itemName}`] || "FULL"
                            }
                            style={styles.picker}
                            onValueChange={(value) =>
                              handleInputChange(
                                `displayQty-${item.itemName}`,
                                value
                              )
                            }
                          >
                            <Picker.Item label="Full" value="FULL" />
                            <Picker.Item label="Half" value="HALF" />
                            <Picker.Item label="AE" value="AE" />
                            <Picker.Item label="Empty" value="EMPTY" />
                          </Picker>
                        ) : (
                          <TextInput
                            style={styles.input}
                            placeholder="Display Quantity"
                            keyboardType="numeric"
                            onChangeText={(text) =>
                              handleInputChange(
                                `displayQty-${item.itemName}`,
                                text
                              )
                            }
                          />
                        )}
                      </View>
                    ))}
                  </View>
                ))}

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddInventory}
                  >
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  invMainCon: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  invContainer: {
    display: "flex",
    position: "relative",
    paddingLeft: 50,
    paddingRight: 50,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonAM: {
    backgroundColor: "#B66619",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
    width: 200,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 600,
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalScroll: {
    width: "100%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  tableContainer: {
    width: "100%",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row", // Ensure rows align horizontally
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 16,
    width: "30%", // Adjust width for a consistent layout
  },
  tableCell: {
    width: "30%",
    fontSize: 16,
  },
  input: {
    width: "30%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    width: "30%",
    borderColor: "gray",
    borderWidth: 1,
  },
  itemNameText: {
    fontSize: 16,
    marginBottom: 5,
  },
  categoryHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#B66619",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
  },
});
