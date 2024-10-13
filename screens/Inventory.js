// InventoryScreen.js

import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import InvTable from "../components/Inventory/InvTable";
import AddInv from "../components/Inventory/addInv"; // Import AddInv component

import { InvInformation } from "../services/firebase/Inventory/retInv";
import { InvBranchesDetails } from "../services/firebase/Inventory/retBranches";

export default function InventoryScreen() {

  const invBranchInfo = InvBranchesDetails();
  const invData = InvInformation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.invMainCon}>
      <View style={styles.invContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonAM}>
          <Text style={styles.buttonText}>Add Inventory</Text>
        </TouchableOpacity>
        <InvTable invInfo={invData} />
        <AddInv modalVisible={modalVisible} setModalVisible={setModalVisible} />
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
    alignItems: "center",
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
    marginBottom: 20,
    width: 200,
    alignSelf: "center",
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
