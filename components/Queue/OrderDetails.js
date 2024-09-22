import { StyleSheet, Pressable, View, Text } from "react-native";
import { useState } from "react";

export default function OrderDetails() {
  const [isDone, setIsDone] = useState(false);

  const handleDoneButton = () => {
    setIsDone(true);
    console.log("Done button clicked!");
  };
  return (
    <>
    <View style={styles.orderItem}>
      <View style={styles.orderDetails}>
        <Text style={styles.orderItemText}>Dark Mocha</Text>
        <Text style={styles.orderItemText}>Size: Medium</Text>
        <Text style={styles.orderItemText}>Quantity: 1</Text>
        <Text style={styles.orderItemText}>Add Ons: N/A</Text>
        <Text style={styles.orderItemText}>Notes: N/A</Text>
      </View>
      <Pressable onPress={handleDoneButton} style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </Pressable>
    </View>
    <View style={styles.orderItem}>
      <View style={styles.orderDetails}>
        <Text style={styles.orderItemText}>Dark Mocha</Text>
        <Text style={styles.orderItemText}>Size: Medium</Text>
        <Text style={styles.orderItemText}>Quantity: 1</Text>
        <Text style={styles.orderItemText}>Add Ons: N/A</Text>
        <Text style={styles.orderItemText}>Notes: N/A</Text>
      </View>
      <Pressable onPress={handleDoneButton} style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </Pressable>
    </View>
    <View style={styles.orderItem}>
      <View style={styles.orderDetails}>
        <Text style={styles.orderItemText}>Dark Mocha</Text>
        <Text style={styles.orderItemText}>Size: Medium</Text>
        <Text style={styles.orderItemText}>Quantity: 1</Text>
        <Text style={styles.orderItemText}>Add Ons: N/A</Text>
        <Text style={styles.orderItemText}>Notes: N/A</Text>
      </View>
      <Pressable onPress={handleDoneButton} style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </Pressable>
    </View>
    <View style={styles.orderItem}>
      <View style={styles.orderDetails}>
        <Text style={styles.orderItemText}>Dark Mocha</Text>
        <Text style={styles.orderItemText}>Size: Medium</Text>
        <Text style={styles.orderItemText}>Quantity: 1</Text>
        <Text style={styles.orderItemText}>Add Ons: N/A</Text>
        <Text style={styles.orderItemText}>Notes: N/A</Text>
      </View>
      <Pressable onPress={handleDoneButton} style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </Pressable>
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
    orderItem: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      orderDetails: {
        flexDirection: "column",
        marginLeft: 10,
      },
      doneButton: {
        height: '45%',
        width: '20%',
        backgroundColor: '#FF5C00',
        borderRadius: 30,
        justifyContent: 'center',
        marginRight: 60,
        marginTop: 10,
      }, 
      orderItemText: {
        color: "#828487",
        fontSize: 15,
        fontWeight: 500,
      },
      doneButtonText: {
        color: "#FFFFFF", 
        fontSize: 15, 
        fontWeight: 600, 
        textAlign: 'center',
      }
});
