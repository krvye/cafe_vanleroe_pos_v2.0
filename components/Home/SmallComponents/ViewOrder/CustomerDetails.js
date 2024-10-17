import { AntDesign } from "@expo/vector-icons";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function CustomerDetails({
  setModalState,
  foodService,
  setRetekessNumber,
  setOrderNumber,
  setOrderNote,
  setCustomerName,
  setTimeElapsed,
  customerName,
  retekessNumber,
  timeElapsed,
  orderNumber,
  orderNote,
  setOnsiteMode,
}) {
  // Sync with parent state when the values change
  const handleCustomerNameChange = (value) => {
    setCustomerName(value);
  };

  const handleRetekessNumberChange = (value) => {
    setRetekessNumber(value);
  };

  const handleOrderNumberChange = (value) => {
    setOrderNumber(value);
  };

  const handleOrderNoteChange = (value) => {
    setOrderNote(value);
  };

  const handleTimeElapsedChange = (text) => {
    // Validate the input format against MM:SS
    const regex = /^(?:([0-5][0-9]):([0-5][0-9]))?$/; // MM:SS format
    setTimeElapsed(text);
    if (text.length === 5) {
      if (regex.test(text) || text === "") {
        return;
      } else {
        // Show an alert if the format is incorrect
        setTimeElapsed("");
        Alert.alert("Invalid Format", "Please enter time in MM:SS format.");
      }
    }
  };

  const handleDineIn = () => {
    setOnsiteMode("Dine In");
  };

  const handleTakeOut = () => {
    setOnsiteMode("Take Out");
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
            keyboardType="numeric"
            maxLength={3}
          />
          <TextInput
            placeholder="Time Elapsed (HH:MM)"
            style={styles.customerInput}
            value={timeElapsed}
            onChangeText={handleTimeElapsedChange}
            keyboardType="number-pad" // Use number pad for time input
            maxLength={5} // Limit to HH:MM format
          />
        </>
      )}

      {(foodService === "Foodpanda" || foodService === "Grab") && (
        <TextInput
          placeholder="Order number"
          style={styles.customerInput}
          value={orderNumber}
          onChangeText={handleOrderNumberChange}
          keyboardType="numeric"
          maxLength={3}
        />
      )}

      <TextInput
        placeholder="Add Note"
        style={styles.customerInput}
        value={orderNote}
        onChangeText={handleOrderNoteChange}
      />

      {foodService === "On-Site" && (
        <View style={styles.onsiteButtonsContainer}>
          <TouchableOpacity style={styles.onsiteButtons} onPress={handleDineIn}>
            <Text>Dine In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.onsiteButtons}
            onPress={handleTakeOut}
          >
            <Text>Take Out</Text>
          </TouchableOpacity>
        </View>
      )}
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

  onsiteButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  onsiteButtons: {
    backgroundColor: "#E4E4E4",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 60,
  },
});
