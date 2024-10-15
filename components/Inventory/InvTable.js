import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native"; // Added Picker for dropdown
import { Picker } from "@react-native-picker/picker";
import { Table, Row } from "react-native-table-component";
import AntDesign from "@expo/vector-icons/AntDesign";
import { firestore } from "../../firebase.js"; // Adjust import based on your file structure
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function InvTable() {
  const tableHead = [
    "Item Code",
    "Item Name",
    "Category",
    "Display QTY",
    "Stock QTY",
    "Staff",
    "Last Time Checked",
    "",
  ];
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [itemDocIds, setItemDocIds] = useState([]);
  const [editItemType, setEditItemType] = useState(""); // Track the item type for modal
  const [displayOptions] = useState(["FULL", "HALF", "AE", "EMPTY"]); // Dropdown options
  const [inventoryTimeType, setInventoryTimeType] = useState("AM");

  useEffect(() => {
    // Fetch data from Firestore
    const fetchData = async () => {
      try {
        const itemsSnapshot = await getDocs(
          collection(firestore, "POS_INVENTORY_ITEMS")
        );
        const itemsData = itemsSnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }; // Include document ID
        });

        const itemsDescSnapshot = await getDocs(
          collection(firestore, "INVENTORY_ITEMS_DESC")
        );
        const itemsDescData = itemsDescSnapshot.docs.map((doc) => doc.data());

        const categoriesSnapshot = await getDocs(
          collection(firestore, "ITEM_CATEGORY_DESC")
        );
        const categoriesData = categoriesSnapshot.docs.map((doc) => doc.data());

        const employeesSnapshot = await getDocs(
          collection(firestore, "EMPLOYEE_INFORMATION")
        );
        const employeesData = employeesSnapshot.docs.map((doc) => doc.data());

        const tableData = itemsData.map((item) => {
          const matchedItem = itemsDescData.find(
            (desc) => desc.itemCategory === item.itemCategory
          );
          const itemName = matchedItem ? matchedItem.itemName : "Unknown";

          const categoryDesc =
            categoriesData.find(
              (cat) => cat.itemCategoryCode === item.itemCategoryCode
            )?.itemCategoryDesc || "Unknown";

          const matchedEmployee = employeesData.find(
            (emp) => emp.employeeId === item.employeeId
          );
          const employeeName = matchedEmployee
            ? matchedEmployee.name
            : "Unknown";

          const timeChecked = item.timeChecked || "N/A";
          const inventoryTimeType = item.inventoryTimeType || "";
          const lastTimeChecked = `${timeChecked} ${inventoryTimeType}`.trim();

          const displayQty = item.ctbDisplayQty || item.blkDisplayQty || "N/A";
          const stockQty = item.ctbStockQty || item.blkStockQty || "N/A";

          return [
            item.itemCategory,
            itemName,
            categoryDesc,
            displayQty || "N/A",
            stockQty || "N/A",
            employeeName,
            lastTimeChecked || "N/A",
            item.itemType, // Include itemType for later use
          ];
        });

        setTableData(tableData);
        setItemDocIds(itemsData.map((item) => item.id));
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (index) => {
    const currentItem = tableData[index];
    setEditData({
      stockQty: currentItem[4],
      displayQty: currentItem[3],
    });
    setEditItemType(currentItem[7]); // Set itemType for the modal
    setEditIndex(index);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (editIndex === null) return;

    try {
      const itemDocId = itemDocIds[editIndex];
      const itemRef = doc(firestore, "POS_INVENTORY_ITEMS", itemDocId);

      // Get current time and date
      const currentDate = new Date();
      const timeChecked = currentDate.toLocaleTimeString("en-US", {
        hour12: false,
      }); // Format as HH:MM:SS

      // Format date as YYYY-MM-DD
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(currentDate.getDate()).padStart(2, "0");
      const dateChecked = `${year}-${month}-${day}`;

      // Update fields based on itemType
      let updateData = {
        timeChecked,
        dateChecked,
        inventoryTimeType,
      };

      if (editItemType === "BLK") {
        updateData = {
          ...updateData,
          blkStockQty: editData.stockQty,
          blkDisplayQty: editData.displayQty,
        };
      } else if (editItemType === "CTB") {
        updateData = {
          ...updateData,
          ctbStockQty: editData.stockQty,
          ctbDisplayQty: editData.displayQty,
        };
      }

      await updateDoc(itemRef, updateData);

      // Update local state
      const updatedData = [...tableData];
      updatedData[editIndex][4] = editData.stockQty;
      updatedData[editIndex][3] = editData.displayQty;
      updatedData[editIndex][6] = `${timeChecked} ${dateChecked}`; // Update last time checked display
      setTableData(updatedData);
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <View style={styles.invTableContainer}>
      <ScrollView vertical={true}>
        <View style={styles.invlist}>
          <Table borderStyle={styles.invBorder}>
            <Row
              data={tableHead}
              style={styles.head}
              textStyle={styles.headText}
              widthArr={[100, 150, 100, 100, 100, 150, 150, 50]}
            />
            <ScrollView style={{ maxHeight: 400 }}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={[
                    ...rowData.slice(0, 7), // Exclude itemType for display
                    <TouchableOpacity onPress={() => handleEdit(index)}>
                      <AntDesign
                        name="edit"
                        size={24}
                        color="black"
                        style={styles.text}
                        widthArr={[100, 150, 100, 100, 100, 150, 150, 50]}
                      />
                    </TouchableOpacity>,
                  ]}
                  style={[
                    styles.row,
                    index % 2 && { backgroundColor: "#F8F8F8" },
                  ]}
                  textStyle={styles.text}
                  widthArr={[100, 150, 100, 100, 100, 150, 150, 50]}
                />
              ))}
            </ScrollView>
          </Table>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Stock QTY"
              value={editData.stockQty}
              onChangeText={(text) =>
                setEditData({ ...editData, stockQty: text })
              }
              keyboardType="numeric"
            />
            {editItemType === "BLK" ? (
              <Picker
                selectedValue={editData.displayQty}
                style={styles.input}
                onValueChange={(itemValue) =>
                  setEditData({ ...editData, displayQty: itemValue })
                }
              >
                {displayOptions.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} />
                ))}
              </Picker>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Display QTY"
                value={editData.displayQty}
                onChangeText={(text) =>
                  setEditData({ ...editData, displayQty: text })
                }
                keyboardType="numeric"
              />
            )}
            <Picker
              selectedValue={inventoryTimeType}
              style={styles.picker}
              onValueChange={(itemValue) => setInventoryTimeType(itemValue)}
            >
              <Picker.Item label="AM" value="AM" />
              <Picker.Item label="PM" value="PM" />
            </Picker>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  invTableContainer: {
    width: "100%",
    height: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  invlist: {
    width: "100%",
  },

  invBorder: {
    borderWidth: 0,
    borderRadius: 10,
  },
  head: {
    height: 40,
    backgroundColor: "#F9BC4D",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headText: {
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  row: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0,
  },
  text: {
    fontWeight: "regular",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    height: "30%",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#FF6600",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
