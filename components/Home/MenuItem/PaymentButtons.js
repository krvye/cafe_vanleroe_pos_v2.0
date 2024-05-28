import { Pressable, StyleSheet, Text, View } from "react-native";

import PaymentMethod from "../../../utils/Home/PaymentMethods";
import { useState } from "react";

export default function PaymentButtons() {
  const [active, setActive] = useState(0);

  return (
    <View style={styles.container}>
      {PaymentMethod.map((method, index) => (
        <Pressable
          style={[
            index === active ? styles.activeButton : styles.inactiveButton,
          ]}
          key={index}
          onPress={() => setActive(index)}
        >
          <Text>{method}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FD",
    // backgroundColor: "red",
    padding: 4,
    borderRadius: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activeButton: {
    backgroundColor: "white",
    padding: 4,
    borderRadius: 80,
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  inactiveButton: {
    backgroundColor: "#F8F9FD",
    padding: 4,
    borderRadius: 80,
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
});
