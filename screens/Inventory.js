import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import InvTable from "../components/Inventory/InvTable";

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

  return (
    <ScrollView style={styles.invMainCon}>
      <View style={styles.invContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.buttonAM} onPress={() => openModal(true)}>
            <Text style={styles.buttonText}>Add Inventory</Text>
          </TouchableOpacity>
        </View>
        <InvTable/>

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
                
                <Text style={styles.label}>Item Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Item Name"
                  value={formData.itemName}
                  onChangeText={(text) => handleInputChange('itemName', text)}
                />

                <Text style={styles.label}>Item Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Item Code"
                  value={formData.itemCode}
                  onChangeText={(text) => handleInputChange('itemCode', text)}
                />

                <Text style={styles.label}>Item Category</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Item Category"
                  value={formData.itemCategory}
                  onChangeText={(text) => handleInputChange('itemCategory', text)}
                />

                <Text style={styles.label}>Date Checked</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Date Checked"
                  value={formData.dateChecked}
                  onChangeText={(text) => handleInputChange('dateChecked', text)}
                />

                <Text style={styles.label}>Countable Stock Quantity</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Countable Stock Quantity"
                  value={formData.ctbStockQty}
                  onChangeText={(text) => handleInputChange('ctbStockQty', text)}
                />

                <Text style={styles.label}>Countable Display Quantity</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Countable Display Quantity"
                  value={formData.ctbDisplayQty}
                  onChangeText={(text) => handleInputChange('ctbDisplayQty', text)}
                />

                <Text style={styles.label}>Bulk Stock Quantity</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Bulk Stock Quantity"
                  value={formData.blkStockQty}
                  onChangeText={(text) => handleInputChange('blkStockQty', text)}
                />

                <Text style={styles.label}>Bulk Display Quantity</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.blkDisplayQty}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleInputChange('blkDisplayQty', itemValue)}
                  >
                    <Picker.Item label="FULL" value="FULL" />
                    <Picker.Item label="HALF" value="HALF" />
                    <Picker.Item label="AE" value="AE" />
                    <Picker.Item label="EMPTY" value="EMPTY" />
                  </Picker>
                </View>

                {isAM ? (
                  <>
                    <Text style={styles.label}>Staff Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="AM Employee ID"
                      value={formData.amEmployeeId}
                      onChangeText={(text) => handleInputChange('amEmployeeId', text)}
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.label}>PM Employee ID</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="PM Employee ID"
                      value={formData.pmEmployeeId}
                      onChangeText={(text) => handleInputChange('pmEmployeeId', text)}
                    />
                  </>
                )}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.addButton} onPress={handleAddInventory}>
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
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
    justifyContent: 'center', // Center the button horizontally
    alignItems: 'center',     // Center the button vertically
    marginBottom: 16,
  },
  buttonAM: {
    backgroundColor: '#B66619',
    padding: 15,
    borderRadius: 5,
    //flex: 1,
    alignItems: 'center',
    marginRight: 10,
    width:200,
  },
  buttonPM: {
    backgroundColor: '#FF6600',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
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
    width: 300,
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
  label: {
    width: '100%',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: '100%',
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

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
