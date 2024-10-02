import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function InvTable() {
  const tableHead = ['Item Code', 'Item Name', 'Category', 'Display QTY', 'Stock QTY', 'Staff', ''];
  const initialTableData = [
    ['MT12345', 'Matcha Powder', 'Ingredient', '500', '1000', 'Bhenjie Cabarlo'],
    ['TP12321', 'Cream', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPES421', 'Sugar', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPE0911', 'Croissant', 'Food', '5', '10', 'Austin Casquijo'],
    ['MT12345', 'Matcha Powder', 'Ingredient', '500', '1000', 'Bhenjie Cabarlo'],
    ['TP12321', 'Cream', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPES421', 'Sugar', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPE0911', 'Croissant', 'Food', '5', '10', 'Austin Casquijo'],
    ['MT12345', 'Matcha Powder', 'Ingredient', '500', '1000', 'Bhenjie Cabarlo'],
    ['TP12321', 'Cream', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPES421', 'Sugar', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPE0911', 'Croissant', 'Food', '5', '10', 'Austin Casquijo'],
    ['MT12345', 'Matcha Powder', 'Ingredient', '500', '1000', 'Bhenjie Cabarlo'],
    ['TP12321', 'Cream', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPES421', 'Sugar', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPE0911', 'Croissant', 'Food', '5', '10', 'Austin Casquijo'],
    ['MT12345', 'Matcha Powder', 'Ingredient', '500', '1000', 'Bhenjie Cabarlo'],
    ['TP12321', 'Cream', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPES421', 'Sugar', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPE0911', 'Croissant', 'Food', '5', '10', 'Austin Casquijo'],
    ['MT12345', 'Matcha Powder', 'Ingredient', '500', '1000', 'Bhenjie Cabarlo'],
    ['TP12321', 'Cream', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPES421', 'Sugar', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPE0911', 'Croissant', 'Food', '5', '10', 'Austin Casquijo'],
    ['MT12345', 'Matcha Powder', 'Ingredient', '500', '1000', 'Bhenjie Cabarlo'],
    ['TP12321', 'Cream', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPES421', 'Sugar', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPE0911', 'Croissant', 'Food', '5', '10', 'Austin Casquijo'],
    ['MT12345', 'Matcha Powder', 'Ingredient', '500', '1000', 'Bhenjie Cabarlo'],
    ['TP12321', 'Cream', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPES421', 'Sugar', 'Ingredient', '10', '0', 'Austin Casquijo',],
    ['CPE0911', 'Croissant', 'Food', '5', '10', 'Austin Casquijo'],
  ];

  const [tableData, setTableData] = useState(initialTableData);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const handleEdit = (index) => {
    setEditData({
      dateChecked: tableData[index][2],
      stockQty: tableData[index][6],
      displayQty: tableData[index][5],
      amEmployeeId: tableData[index][7],
      pmEmployeeId: tableData[index][8],
    });
    setEditIndex(index);
    setModalVisible(true);
  };

  const handleSave = () => {
    const updatedData = [...tableData];
    updatedData[6] = editData.stockQty;
    updatedData[5] = editData.displayQty;
    setTableData(updatedData);
    setModalVisible(false);
  };

  return (
    <View style={styles.invTableContainer}>
      <ScrollView vertical={true}>
        <View style={styles.invlist}>
          <Table borderStyle={styles.invBorder}>
            <Row data={tableHead} style={styles.head} textStyle={styles.headText} widthArr={[100, 150, 100, 100, 100, 150, 50]} />
            <ScrollView style={{ maxHeight: 400 }}>
            {
              tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={[
                    ...rowData,
                    <TouchableOpacity onPress={() => handleEdit(index)}>
                      <AntDesign name="edit" size={24} color="black" style={styles.text} widthArr={[100, 150, 100, 100, 100, 150, 50]} />
                    </TouchableOpacity>
                  ]}
                  style={[styles.row, index % 2 && { backgroundColor: '#F8F8F8' }]}
                  textStyle={styles.text}
                  widthArr={[100, 150, 100, 100, 100, 150, 50]}
                />
              ))
            }
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
    justifyContent: 'center', // Centers the table vertically
    alignItems: 'center',     // Centers the table horizontally
    alignSelf: 'center',     // Ensures the container is centered within its parent
  },

  invlist: {
    width:'100%'
},

  invBorder: {
    borderWidth: 0,
    borderRadius: 10,
  },
  invShadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 10,
    width: '90%',
    height: 500,
    maxHeight: 500,
  },
  head: {
    height: 40,
    backgroundColor: '#F9BC4D',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headText: {
    fontWeight: 'bold',
    textAlign: 'center',  // Ensure the header text is centered
    alignSelf: 'center',  // Ensure proper centering inside the cell
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
  editButton: {
    color: '#3498db',
    textDecorationLine: 'underline',
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

function getStatusStyle(status) {
  switch (status) {
    case 'Full':
      return styles.statusFull;
    case 'Needs to be replenished':
      return styles.statusReplenish;
    case 'Half Full':
      return styles.statusHalf;
    default:
      return null;
  }
}
