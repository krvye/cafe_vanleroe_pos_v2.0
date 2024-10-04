import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import InvTable from "../components/Inventory/InvTable";
import { firestore } from "../firebase"; // Adjust import based on your file structure
import { collection, getDocs } from 'firebase/firestore';

export default function InventoryScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isAM, setIsAM] = useState(true); // To check which button was clicked (AM or PM)
  const [formData, setFormData] = useState({
    itemName: '',
    itemCode: '',
    itemCategory: '',
    branchCode: '',
    dateChecked: '',
    ctbStockQty: '',
    ctbDisplayQty: '',
    blkStockQty: '',
    blkDisplayQty: 'FULL', // Default value for dropdown
    amEmployeeId: '',
    pmEmployeeId: '',
  });

  const [itemNames, setItemNames] = useState([]); // State to hold item names

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddInventory = () => {
    // Handle the form submission
    setModalVisible(false);
  };

  const openModal = (isAMInventory) => {
    setIsAM(isAMInventory);
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchItemNames = async () => {
      try {
        const itemsCollection = collection(firestore, 'INVENTORY_ITEMS_DESC');
        const itemSnapshot = await getDocs(itemsCollection);
        const itemsList = itemSnapshot.docs.map(doc => doc.data().itemName); // Extract itemName from each document
        setItemNames(itemsList); // Set the state with the fetched item names
      } catch (error) {
        console.error("Error fetching item names: ", error);
      }
    };

    fetchItemNames();
  }, []); // Empty dependency array to run once on mount

  return (
    <ScrollView style={styles.invMainCon}>
      <View style={styles.invContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.buttonAM} onPress={() => openModal(true)}>
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

                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>

                {/* Table-Like Form Starts */}
                <View style={styles.tableContainer}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Item</Text>
                    <View style={styles.quantityStatusHeader}>
                      <Text style={styles.tableHeader}>Stock</Text>
                      <Text style={styles.tableHeader}>Display</Text>
                    </View>
                  </View>

                  {/* Item Names */}
                  <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                      {itemNames.map((name, index) => (
                        <Text key={index} style={styles.itemNameText}>{name}</Text>
                      ))}
                    </View>
                  </View>

                  {/* Buttons */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddInventory}>
                      <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Table-Like Form Ends */}
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
    backgroundColor: '#fff',
  },
  invContainer: {
    display: 'flex',
    position: 'relative',
    paddingLeft: 50,
    paddingRight: 50,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonAM: {
    backgroundColor: '#B66619',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
    width: 200,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 600,
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalScroll: {
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  tableContainer: {
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '50%',
  },
  quantityStatusHeader: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
  },
  tableCell: {
    width: '50%',
    fontSize: 16,
  },
  inputGroup: {
    flexDirection: 'column', // Change to column for the item names
    width: '50%',
    justifyContent: 'space-between',
  },
  itemNameText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%', // Make input take full width
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  fullInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    width: '48%',
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#B66619',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
});
