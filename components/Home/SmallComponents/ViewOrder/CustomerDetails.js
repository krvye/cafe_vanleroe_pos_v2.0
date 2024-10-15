import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function CustomerDetails({
  setModalState,
  foodService,
  setRetekessNumber,
  setOrderNumber,
  setOrderNote,
  setCustomerName,
  setTimeElapsed,
}) {
  const [customerName, setLocalCustomerName] = useState("");
  const [retekessNumber, setLocalRetekessNumber] = useState("");
  const [orderNumber, setLocalOrderNumber] = useState("");
  const [orderNote, setLocalOrderNote] = useState("");
  const [timeElapsed, setLocalTimeElapsed] = useState("");

  // Sync with parent state when the values change
  const handleCustomerNameChange = (value) => {
    setLocalCustomerName(value);
    setCustomerName(value);
  };

  const handleRetekessNumberChange = (value) => {
    setLocalRetekessNumber(value);
    setRetekessNumber(value);
  };

  const handleOrderNumberChange = (value) => {
    setLocalOrderNumber(value);
    setOrderNumber(value);
  };

  const handleOrderNoteChange = (value) => {
    setLocalOrderNote(value);
    setOrderNote(value);
  };

  const handleTimeElapsedChange = (value) => {
    setLocalTimeElapsed(value);
    setTimeElapsed(value);
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Customer Information</Text>
        <Pressable onPress={() => setModalState(false)}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
      </View>

      <TextInput
        placeholder="Customer name"
        style={styles.customerInput}
        value={customerName}
        onChangeText={handleCustomerNameChange}
      />

      {foodService === "On-Site" && (
        <>
          <TextInput
            placeholder="Retekess Number"
            style={styles.customerInput}
            value={retekessNumber}
            onChangeText={handleRetekessNumberChange}
          />
          <TextInput
            placeholder="Time Elapsed"
            style={styles.customerInput}
            value={timeElapsed}
            onChangeText={handleTimeElapsedChange}
          />
        </>
      )}

      {(foodService === "Foodpanda" || foodService === "Grab") && (
        <TextInput
          placeholder="Order number"
          style={styles.customerInput}
          value={orderNumber}
          onChangeText={handleOrderNumberChange}
        />
      )}

      <TextInput
        placeholder="Add Note"
        style={styles.customerInput}
        value={orderNote}
        onChangeText={handleOrderNoteChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#19191C",
  },
  customerInput: {
    borderWidth: 1,
    borderColor: "#E4E4E4",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 60,
    marginTop: 15,
  },
});
