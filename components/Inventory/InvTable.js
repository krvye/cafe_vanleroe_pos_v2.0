import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AntDesign from '@expo/vector-icons/AntDesign';
import { firestore } from "../../firebase.js"; // Adjust import based on your file structure
import { collection, getDocs } from 'firebase/firestore';

export default function InvTable() {
  const tableHead = ['Item Code', 'Item Name', 'Category', 'Display QTY', 'Stock QTY', 'Staff', 'Last Time Checked', ''];
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Fetch data from Firestore
    const fetchData = async () => {
      try {
        // Fetching POS_INVENTORY_ITEMS collection
        const itemsSnapshot = await getDocs(collection(firestore, "POS_INVENTORY_ITEMS"));
        const itemsData = itemsSnapshot.docs.map(doc => doc.data());

        // Fetching INVENTORY_ITEMS_DESC collection
        const itemsDescSnapshot = await getDocs(collection(firestore, "INVENTORY_ITEMS_DESC"));
        const itemsDescData = itemsDescSnapshot.docs.map(doc => doc.data());

        // Fetching ITEM_CATEGORY_DESC collection
        const categoriesSnapshot = await getDocs(collection(firestore, "ITEM_CATEGORY_DESC"));
        const categoriesData = categoriesSnapshot.docs.map(doc => doc.data());

        // Fetching EMPLOYEE_INFORMATION collection
        const employeesSnapshot = await getDocs(collection(firestore, "EMPLOYEE_INFORMATION"));
        const employeesData = employeesSnapshot.docs.map(doc => doc.data());

        // Merging data with itemName, category descriptions, and employee names
        const tableData = itemsData.map(item => {
          // Find matching item name based on itemCategory from INVENTORY_ITEMS_DESC
          const matchedItem = itemsDescData.find(desc => desc.itemCategory === item.itemCategory);
          const itemName = matchedItem ? matchedItem.itemName : 'Unknown';

          // Find matching category description
          const categoryDesc = categoriesData.find(cat => cat.itemCategoryCode === item.itemCategoryCode)?.itemCategoryDesc || 'Unknown';

          // Find matching employee name based on employeeId from EMPLOYEE_INFORMATION
          const matchedEmployee = employeesData.find(emp => emp.employeeId === item.employeeId);
          const employeeName = matchedEmployee ? matchedEmployee.name : 'Unknown';

          const timeChecked = item.timeChecked || 'N/A';
          const inventoryTimeType = item.inventoryTimeType || '';
          const lastTimeChecked = `${timeChecked} ${inventoryTimeType}`.trim();

          // Check which Display/Stock QTY to show
          const displayQty = item.ctbDisplayQty || item.blkDisplayQty || 'N/A';
          const stockQty = item.ctbStockQty || item.blkStockQty || 'N/A';

          return [
            item.itemCategory,    // Item Code
            itemName,             // Item Name
            categoryDesc,         // Category description
            displayQty || 'N/A', // Display QTY
            stockQty || 'N/A',   // Stock QTY
            employeeName,         // Employee Name (Staff)
            lastTimeChecked || 'N/A', // Last Time Checked
          ];
        });

        setTableData(tableData);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (index) => {
    setEditData({
      stockQty: tableData[index][4],
      displayQty: tableData[index][3],
    });
    setEditIndex(index);
    setModalVisible(true);
  };

  const handleSave = () => {
    const updatedData = [...tableData];
    updatedData[editIndex][4] = editData.stockQty;
    updatedData[editIndex][3] = editData.displayQty;
    setTableData(updatedData);
    setModalVisible(false);
  };

  return (
    <View style={styles.invTableContainer}>
      <ScrollView vertical={true}>
        <View style={styles.invlist}>
          <Table borderStyle={styles.invBorder}>
            <Row data={tableHead} style={styles.head} textStyle={styles.headText} widthArr={[100, 150, 100, 100, 100, 150, 150, 50]} />
            <ScrollView style={{ maxHeight: 400 }}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={[
                    ...rowData,
                    <TouchableOpacity onPress={() => handleEdit(index)}>
                      <AntDesign name="edit" size={24} color="black" style={styles.text} widthArr={[100, 150, 100, 100, 100, 150, 150, 50]} />
                    </TouchableOpacity>
                  ]}
                  style={[styles.row, index % 2 && { backgroundColor: '#F8F8F8' }]}
                  textStyle={styles.text}
                  widthArr={[100, 150, 100, 100, 100, 150, 150, 50]}
                />
              ))}
            </ScrollView>
          </Table>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Stock QTY"
              value={editData.stockQty}
              onChangeText={(text) => setEditData({ ...editData, stockQty: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Display QTY"
              value={editData.displayQty}
              onChangeText={(text) => setEditData({ ...editData, displayQty: text })}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
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
    width: '100%',
    height: '500rem',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  invlist: {
    width: '100%'
  },

  invBorder: {
    borderWidth: 0,
    borderRadius: 10,
  },
  head: {
    height: 40,
    backgroundColor: '#F9BC4D',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headText: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  row: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0,
  },
  text: {
    fontWeight: 'regular',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#FF6600',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
