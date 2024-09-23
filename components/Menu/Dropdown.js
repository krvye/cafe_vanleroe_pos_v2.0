import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import itemCategories from "@utils/Home/SidebarFakeData";

export default function Dropdown() {
  return (
    <View style={styles.container}>
      <Picker style={styles.picker}>
        {itemCategories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons
          name="food-fork-drink"
          size={24}
          color="black"
        />
        <Text style={styles.buttonText}>New Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 30,
    marginTop: 20,
  },
  picker: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    flex: 0.8,
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
    height: 65,
    padding: 20,
  },
  button: {
    backgroundColor: "#F9BC4D",
    padding: 10,
    borderRadius: 10,
    // flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    width: "15%",
    height: 65,
  },
  buttonText: {
    color: "black",
  },
});
