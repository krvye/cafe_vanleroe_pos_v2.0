import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ItemCategory({ categoryName, onPress, active }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[!active ? styles.inactiveButton : styles.activeButton]}
        onPress={onPress}
      >
        <Text style={[!active ? styles.inactiveText : styles.activeText]}>
          {categoryName}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRightWidth: 1,
    borderRightColor: "#E4E4E4",
  },
  activeButton: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFF5EE",
    borderRightWidth: 4,
    borderRightColor: "#FF5C00",
    marginVertical: 15,
  },
  inactiveButton: {
    justifyContent: "center",
    padding: 20,
    marginVertical: 15,
  },
  activeText: { color: "#FF5C00", fontSize: 18, fontWeight: "600" },
  inactiveText: { color: "#828487", fontSize: 19, fontWeight: "400" },
});
