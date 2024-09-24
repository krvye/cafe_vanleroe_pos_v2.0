import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handlePress = (button) => {
    setSelectedButton((prevButton) => (prevButton === button ? 0 : button));
    if (button === "cash") {
      setPaymentMethod((prevButton) =>
        prevButton === "cash" ? "cash" : "cash"
      );
    } else if (button === "gcash") {
      setPaymentMethod((prevButton) =>
        prevButton === "gcash" ? "cash" : "gcash"
      );
    } else if (button === "maya") {
      setPaymentMethod((prevButton) =>
        prevButton === "maya" ? "cash" : "maya"
      );
    }
  };

  const getButtonColor = (button) => {
    return selectedButton === button ? "#d1d3de" : "#fff";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Payment method</Text>
      <View style={styles.methodContainer}>
        <Pressable
          style={[
            styles.imageContainer,
            { backgroundColor: getButtonColor("cash") },
          ]}
          onPress={() => handlePress("cash")}
        >
          <Image
            style={styles.cashImage}
            source={require("@assets/cash.png")}
          />
        </Pressable>
        <Pressable
          style={[
            styles.imageContainer,
            { backgroundColor: getButtonColor("gcash") },
          ]}
          onPress={() => handlePress("gcash")}
        >
          <Image
            style={styles.methodImage}
            source={require("@assets/gcash.png")}
          />
        </Pressable>
        <Pressable
          style={[
            styles.imageContainer,
            { backgroundColor: getButtonColor("maya") },
          ]}
          onPress={() => handlePress("maya")}
        >
          <Image
            style={styles.methodImage}
            source={require("@assets/maya.png")}
          />
        </Pressable>
      </View>

      {(paymentMethod === "gcash" || paymentMethod === "maya") && (
        <TextInput
          style={styles.referenceInput}
          placeholder="Input Reference Number"
          placeholderTextColor={"#C2C2C2"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#19191C",
  },
  referenceInput: {
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderRadius: 60,
    paddingVertical: 15,
    paddingHorizontal: 15,
    textAlign: "center",
    fontSize: 16,
  },
  methodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginVertical: 20,
    flexWrap: "wrap",
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "#E4E4E4",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 15,
    height: 80,
    alignItems: "center",
    flex: 1,
    minWidth: 100,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  methodImage: {
    width: 80,
    height: 30,
  },
  cashImage: {
    width: 40,
    height: 30,
  },
});
