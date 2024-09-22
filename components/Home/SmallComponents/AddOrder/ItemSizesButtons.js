import { StyleSheet } from "react-native";
import { Pressable, Text, View } from "react-native";

export default function ItemSizesButtons({
  active,
  setActive,
  itemSizes,
  setItemSize,
}) {
  return (
    <View style={styles.container}>
      {itemSizes.map((size, index) => (
        <Pressable
          style={[
            index === active ? styles.activeButton : styles.inactiveButton,
          ]}
          key={index}
          onPress={() => {
            setItemSize(size);
            setActive(index);
          }}
        >
          <Text style={{ fontSize: 16 }}>{size}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FD",
    padding: 4,
    borderRadius: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 80,
    marginBottom: 20,
  },
  activeButton: {
    backgroundColor: "white",
    padding: 4,
    borderRadius: 80,
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    elevation: 3,
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
