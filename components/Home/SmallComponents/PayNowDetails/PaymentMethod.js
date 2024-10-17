import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { retrievePaymentMethods } from "@services/firebase/Home/retrievePaymentMethods";

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
  setReferenceNumber,
  referenceNumber,
}) {
  const [selectedButton, setSelectedButton] = useState(null);

  const paymentMethods = retrievePaymentMethods();

  const handlePress = (selectedPaymentMethod) => {
    setSelectedButton((prevButton) =>
      prevButton === selectedPaymentMethod ? 0 : selectedPaymentMethod
    );
    setPaymentMethod((prevMethod) =>
      prevMethod === selectedPaymentMethod ? "" : selectedPaymentMethod
    );
    setReferenceNumber(""); // Reset the reference number when switching payment methods
  };

  const getButtonColor = (button) => {
    return selectedButton === button ? "#d1d3de" : "#fff";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Payment method</Text>

      <View style={styles.methodContainer}>
        {paymentMethods.map((paymentMethod) => (
          <Pressable
            key={paymentMethod.id}
            style={[
              styles.imageContainer,
              {
                backgroundColor: getButtonColor(
                  paymentMethod.paymentMethodDesc
                ),
              },
            ]}
            onPress={() => handlePress(paymentMethod.paymentMethodDesc)}
          >
            {/* <Image
              style={styles.cashImage}
              source={require("@assets/cash.png")}
            /> */}
            <Text>{paymentMethod.paymentMethodDesc}</Text>
          </Pressable>
        ))}
      </View>

      {(paymentMethod === "Gcash" || paymentMethod === "Maya") && (
        <TextInput
          style={styles.referenceInput}
          placeholder="Input Reference Number"
          placeholderTextColor={"#C2C2C2"}
          value={referenceNumber}
          onChangeText={setReferenceNumber}
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
