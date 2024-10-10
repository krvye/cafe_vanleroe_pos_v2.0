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
import { collection, getDocs, addDoc, query, where } from "firebase/firestore"; // Import query and where to filter data

export default function InventoryScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isAM, setIsAM] = useState(true); // To check which button was clicked (AM or PM)
  const [formData, setFormData] = useState({
    firstName: "", // Employee first name
    lastName: "", // Employee last name
    timeChecked: "AM", // Default value for Time Checked
  });

  const [itemsByCategory, setItemsByCategory] = useState({}); // State to hold items grouped by category
  const [selectedItems, setSelectedItems] = useState([]); // To hold selected items and their inputs

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleItemInputChange = (itemName, fieldName, value) => {
    setSelectedItems((prevSelectedItems) => {
      const existingItemIndex = prevSelectedItems.findIndex(
        (item) => item.itemName === itemName
      );

      // Update existing item input or add a new one
      if (existingItemIndex >= 0) {
        const updatedItem = {
          ...prevSelectedItems[existingItemIndex],
          [fieldName]: value,
        };
        return [
          ...prevSelectedItems.slice(0, existingItemIndex),
          updatedItem,
          ...prevSelectedItems.slice(existingItemIndex + 1),
        ];
      } else {
        return [
          ...prevSelectedItems,
          { itemName, [fieldName]: value },
        ];
      }
    });
  };

  const handleAddInventory = async () => {
    const currentDate = new Date();
    const dateChecked = currentDate.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const timeChecked = currentDate.toTimeString().split(" ")[0]; // Get current time HH:MM:SS

    try {
      // Retrieve employee ID using lastName
      let employeeId = null;
      if (formData.lastName) {
        const employeeQuery = query(
          collection(firestore, "EMPLOYEE_INFORMATION"),
          where("lastName", "==", formData.lastName)
        );
        const employeeSnapshot = await getDocs(employeeQuery);
        if (!employeeSnapshot.empty) {
          employeeId = employeeSnapshot.docs[0].data().employeeId; // Get the first employeeId found
        }
      }

      // Loop through each selected item and save to Firestore
      await Promise.all(
        selectedItems.map(async (item) => {
          const inventoryData = {
            timeChecked, // Current time
            dateChecked, // Current date
            ...(employeeId && { employeeId }), // Save employeeId instead of first and last name
            inventoryTimeType: formData.timeChecked, // Save selected time type (AM/PM)
          };

          // Check itemCategory in itemsByCategory to determine itemType, itemCategory, and itemCategoryCode
          const itemCategoryData = Object.values(itemsByCategory).flat().find(i => i.itemName === item.itemName);
          
          if (itemCategoryData) {
            const { itemType, itemCategory, itemCategoryCode } = itemCategoryData;

            // Add itemType, itemCategory, and itemCategoryCode to inventory data
            inventoryData.itemType = itemType;
            inventoryData.itemCategory = itemCategory;
            inventoryData.itemCategoryCode = itemCategoryCode;

            if (itemType === "BLK") {
              inventoryData.blkStockQty = item.stockQty || 0; // Store stock qty in blkStockQty or 0 if not provided
              inventoryData.blkDisplayQty = item.displayQty || 0; // Store display qty in blkDisplayQty or 0 if not provided
            } else if (itemType === "CTB") {
              inventoryData.ctbStockQty = item.stockQty || 0; // Store stock qty in ctbStockQty or 0 if not provided
              inventoryData.ctbDisplayQty = item.displayQty || 0; // Store display qty in ctbDisplayQty or 0 if not provided
            }
          }

          // Write the data to Firestore
          await addDoc(collection(firestore, "POS_INVENTORY_ITEMS"), inventoryData);
          console.log("Inventory record added:", inventoryData);
        })
      );
    } catch (error) {
      console.error("Error adding inventory record:", error);
    }

    setModalVisible(false); // Close the modal after adding
    setSelectedItems([]); // Clear selected items after submission
  };

  const openModal = (isAM) => {
    setIsAM(isAM);
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
                          <Text style={styles.itemNameText}>{item.itemName}</Text>
                        </View>

                        {item.itemType === "BLK" ? (
                          <>
                            <TextInput
                              style={styles.input}
                              placeholder="Stock Quantity"
                              keyboardType="numeric"
                              onChangeText={(text) =>
                                handleItemInputChange(item.itemName, "stockQty", text)
                              }
                            />
                            <Picker
                              selectedValue={selectedItems.find(i => i.itemName === item.itemName)?.displayQty || "FULL"}
                              onValueChange={(value) =>
                                handleItemInputChange(item.itemName, "displayQty", value)
                              }
                            >
                              <Picker.Item label="FULL" value="FULL" />
                              <Picker.Item label="HALF" value="HALF" />
                              <Picker.Item label="EMPTY" value="EMPTY" />
                            </Picker>
                          </>
                        ) : item.itemType === "CTB" ? (
                          <>
                            <TextInput
                              style={styles.input}
                              placeholder="Stock Quantity"
                              keyboardType="numeric"
                              onChangeText={(text) =>
                                handleItemInputChange(item.itemName, "stockQty", text)
                              }
                            />
                            <TextInput
                              style={styles.input}
                              placeholder="Display Quantity"
                              keyboardType="numeric"
                              onChangeText={(text) =>
                                handleItemInputChange(item.itemName, "displayQty", text)
                              }
                            />
                          </>
                        ) : null}
                      </View>
                    ))}
                  </View>
                ))}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddInventory}
                  >
                    <Text style={styles.buttonText}>Add Inventory</Text>
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
