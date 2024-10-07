import { StyleSheet, Pressable, View, Text } from "react-native";
import { useState } from "react";

export default function OrderDetails({ selectedOrder }) {
  const [isDone, setIsDone] = useState(false);

  const handleDoneButton = () => {
    setIsDone(true);
    console.log("Done button clicked!");
  };
  return (
    <>
      {selectedOrder.orderItems.map((order, orderIndex) => {
        return(
        <View key={orderIndex} style={styles.orderItem}>
          <View style={styles.orderDetails}>
            <Text style={styles.orderItemText}>{order.itemName}</Text>
            <Text style={styles.orderItemText}>Size: {order.itemSize}</Text>
            <Text style={styles.orderItemText}>Quantity: 1</Text>
            <Text style={styles.orderItemText}>Add Ons: {order.itemQuantity}</Text>
            <Text style={styles.orderItemText}>Notes: {order.notes}</Text>
          </View>
          <Pressable onPress={handleDoneButton} style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </Pressable>
        </View>
        )
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
    marginLeft: 10,
  },
  doneButton: {
    height: "45%",
    width: "20%",
    backgroundColor: "#F9BC4D",
    borderRadius: 30,
    justifyContent: "center",
    marginRight: 60,
    marginTop: 10,
  },
  orderItemText: {
    color: "#0e0e0e",
    fontSize: 15,
    fontWeight: 500,
  },
  doneButtonText: {
    color: "#0e0e0e",
    fontSize: 15,
    fontWeight: 600,
    textAlign: "center",
  },
});
