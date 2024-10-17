import { StyleSheet, Pressable, View, Text } from "react-native";
import { useState } from "react";

// import Entypo from '@expo/vector-icons/Entypo';

export default function OrderDetails({
  selectedOrder,
  addOnsInfo,
  noteTemplatesInfo,
}) {

  // Map add ons to return addOnDesc
  const handleAddOns = (addOnCode) => {
    const addOnData = addOnsInfo.find((item) => item.addOnCode === addOnCode);

    return addOnData ? addOnData.addOnDesc : " ";
  };

  // Map Note templates to return noteTemplatesDesc
  const handleNoteTemplates = (noteTemplatesCode) => {
    const noteTemplateData = noteTemplatesInfo.find(
      (item) => item.noteId === noteTemplatesCode
    );

    return noteTemplateData ? noteTemplateData.noteDesc : " ";
  };

  return (
    <>
      {selectedOrder.orderItems.map((order, orderIndex) => {
        return (
          <View key={orderIndex} style={styles.orderItem}>
            <View style={styles.orderDetails}>
              <Text style={styles.orderItemText}>{order.itemName} - {order.itemSize}</Text>
              <Text style={styles.orderItemText}>
                Quantity: {order.itemQuantity}
              </Text>
              <Text style={styles.orderItemText}>
                Add Ons: {handleAddOns(order.addOns)}
              </Text>
              <Text style={styles.orderItemText}>
                Notes: {handleNoteTemplates(order.itemNotes)}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  orderDetails: {
    flexDirection: "column",
    marginLeft: 25,
  },
  doneButton: {
    height: "45%",
    width: "20%",
    backgroundColor: "#F9BC4D",
    borderRadius: 30,
    justifyContent: "center",
    marginRight: 30,
    marginTop: 10,
  },
  orderItemText: {
    color: "#0e0e0e",
    fontSize: 20,
    fontWeight: "400",
  },
  doneButtonText: {
    color: "#0e0e0e",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  doneGreenButton: { 
    height: "45%",
    width: "20%",
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
    marginTop: 10,
  }
});
