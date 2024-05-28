import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';

export default function InventoryScreen({ navigation }) {
  const tableHead = ['Item Code', 'Item Name', 'Date Checked', 'Branch', 'Category', 'Display QTY', 'Stock QTY', 'AM Shift Staff', 'PM Shift Staff', 'Item Status'];
  const tableData = [
    ['MT12345', 'Matcha Powder', '03/16/2024', 'Taytay', 'Ingredient', '500', '1000', 'Bhenjie Cabarlo', '', 'Full'],
    ['TP12321', 'Cream', '03/12/2024', 'Taytay', 'Ingredient', '10', '0', 'Austin Casquijo', '', 'Needs to be replenished'],
    ['CPES421', 'Sugar', '03/12/2024', 'Ayala Feliz', 'Ingredient', '10', '0', 'Austin Casquijo', '', 'Needs to be replenished'],
    ['CPE0911', 'Croissant', '03/11/2024', 'Ayala Feliz', 'Food', '5', '10', 'Austin Casquijo', '', 'Half Full'],
  ];

  return (
    <ScrollView style={styles.invMainCon}>
      <View style={styles.invContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.buttonAM} onPress={() => {}}>
            <Text style={styles.buttonText}>Add AM Inventory</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPM} onPress={() => {}}>
            <Text style={styles.buttonText}>Add PM Inventory</Text>
          </TouchableOpacity>
        </View>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#E1E1E1', borderRadius: 10 }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
          {
            tableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData.map((cell, cellIndex) => {
                  if (cellIndex === 9) {
                    return <Text style={getStatusStyle(cell)}>{cell}</Text>;
                  }
                  return cell;
                })}
                style={[styles.row, index % 2 && { backgroundColor: '#F8F8F8' }]}
                textStyle={styles.text}
              />
            ))
          }
        </Table>
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
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonAM: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
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
  head: {
    height: 40,
    backgroundColor: '#F9BC4D',
  },
  headText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    height: 40,
    backgroundColor: '#FFFFFF',
  },
  text: {
    textAlign: 'center',
  },
  statusFull: {
    backgroundColor: '#00CEC9',
    color: '#FFFFFF',
    borderRadius: 15,
    padding: 5,
    textAlign: 'center',
  },
  statusReplenish: {
    backgroundColor: '#D63031',
    color: '#FFFFFF',
    borderRadius: 15,
    padding: 5,
    textAlign: 'center',
  },
  statusHalf: {
    backgroundColor: '#0984E3',
    color: '#FFFFFF',
    borderRadius: 15,
    padding: 5,
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
