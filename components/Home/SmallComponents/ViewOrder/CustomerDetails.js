import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function CustomerDetails({ setModalState }) {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Customer Information</Text>
        <Pressable
          onPress={() => {
            setModalState(false);
          }}
        >
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
      </View>
      <TextInput placeholder="Customer name" style={styles.customerInput} />
      <TextInput placeholder="Order number" style={styles.customerInput} />
      <TextInput placeholder="Add Note" style={styles.customerInput} />
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
