import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { firestore } from "../../firebase.js";
import { useBranches } from "../../context/BranchContext"; 

export default function AddInv({ modalVisible, setModalVisible, branchesInfo }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    timeChecked: " ",
  });
  const { selectedBranch } = useBranches(); 
  const selectedBranchCode = selectedBranch ? selectedBranch.branchCode : null; 
  const [itemsByCategory, setItemsByCategory] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [categoryDescMap, setCategoryDescMap] = useState({}); // New state for category descriptions

  // Handle input changes for formData
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle input changes for inventory items
  const handleItemInputChange = (itemName, fieldName, value) => {
    setSelectedItems((prevSelectedItems) => {
      const existingItemIndex = prevSelectedItems.findIndex(
        (item) => item.itemName === itemName
      );

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

  // Fetch items and category descriptions from Firestore
  useEffect(() => {
    const fetchItemsAndCategories = async () => {
      // Fetch items
      const itemsCollection = collection(firestore, "INVENTORY_ITEMS_DESC");
      const snapshot = await getDocs(itemsCollection);
      const items = snapshot.docs.map((doc) => doc.data());

      const grouped = items.reduce((acc, item) => {
        const { itemCategoryCode } = item;
        acc[itemCategoryCode] = acc[itemCategoryCode] || [];
        acc[itemCategoryCode].push(item);
        return acc;
      }, {});
      setItemsByCategory(grouped);

      // Fetch category descriptions
      const categoryCollection = collection(firestore, "ITEM_CATEGORY_DESC");
      const categorySnapshot = await getDocs(categoryCollection);
      const categoryMap = categorySnapshot.docs.reduce((acc, doc) => {
        const data = doc.data();
        acc[data.itemCategoryCode] = data.itemCategoryDesc;
        return acc;
      }, {});
      setCategoryDescMap(categoryMap);
    };
    fetchItemsAndCategories();
  }, []);


  const handleAddInventory = async () => {
    const currentDate = new Date();
    const dateChecked = currentDate.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set it to 12
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const timeChecked = `${hours}:${formattedMinutes}:${formattedSeconds}`; // Get time in 12-hour format (HH:MM AM/PM)

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
                    branchCode: selectedBranchCode,
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

                    // Determine itemStatus based on stockQty
                    let itemStatus = "EMPTY";
                    if (item.stockQty > 21) {
                        itemStatus = "FULL";
                    } else if (item.stockQty >= 11 && item.stockQty <= 20) {
                        itemStatus = "HALF";
                    } else if (item.stockQty >= 1 && item.stockQty <= 10) {
                        itemStatus = "AE";
                    }

                    // Save to ADMIN_INVENTORY_ITEMS collection
                    const adminInventoryData = {
                        latestDateChecked: dateChecked,
                        latestEmployeeChecked: employeeId,
                        branchCode: selectedBranchCode,
                        itemName: item.itemName,
                        itemType: itemType,
                        itemCategory: itemCategory,
                        itemStatus: itemStatus, // Add the itemStatus field
                        ...(item.stockQty && { stockQty: item.stockQty }),
                        ...(item.displayQty && { displayQty: item.displayQty })
                    };

                    await addDoc(collection(firestore, "ADMIN_INVENTORY_ITEMS"), adminInventoryData);
                    console.log("Admin inventory record added:", adminInventoryData);
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


  return (
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

            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={formData.firstName}
                onChangeText={(text) => handleInputChange("firstName", text)}
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

            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Time Checked</Text>
              <Picker
                selectedValue={formData.timeChecked}
                style={styles.picker}
                onValueChange={(itemValue) =>
                  handleInputChange("timeChecked", itemValue)
                }
              >
                <Picker.Item label="Please Select Time Type" value=" " />
                <Picker.Item label="AM" value="AM" />
                <Picker.Item label="PM" value="PM" />
              </Picker>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Item</Text>
              <Text style={styles.tableHeader}>Stock</Text>
              <Text style={styles.tableHeader}>Display</Text>
            </View>

            {/* Grouped Items by Category with Category Description */}
            {Object.keys(itemsByCategory).map((categoryCode) => (
              <View key={categoryCode}>
                {/* Display Category Description if available */}
                <Text style={styles.categoryHeader}>
                  {categoryDescMap[categoryCode] || categoryCode}
                </Text>

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
                          selectedValue={selectedItems.find(i => i.itemName === item.itemName)?.displayQty}
                          onValueChange={(value) =>
                            handleItemInputChange(item.itemName, "displayQty", value)
                          }
                        >
                          <Picker.Item label="Select Status" value=" " />
                          <Picker.Item label="Full" value="FULL" />
                          <Picker.Item label="Half" value="HALF" />
                          <Picker.Item label="AlmostEmpty" value="AE" />
                          <Picker.Item label="Empty" value="EMPTY" />
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
        fontWeight: "600",
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
        fontWeight: "600",
        marginBottom: 20,
      },
      closeButton: {
        position: "absolute",
        right: 10,
        padding: 5,
      },
      closeButtonText: {
        fontSize: 18,
        fontWeight: "600",
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
        fontWeight: "600",
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
        fontWeight: "600",
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
