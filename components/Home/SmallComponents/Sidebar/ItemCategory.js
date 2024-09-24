import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

export default function ItemCategory({ categoryName, onPress, active }) {
  const styles = makeStyles(useWindowDimensions().fontScale);

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

const makeStyles = (fontScale) =>
  StyleSheet.create({
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
    activeText: {
      color: "#B66619",
      fontSize: 18 * fontScale,
      fontWeight: "600",
    },
    inactiveText: {
      color: "#828487",
      fontSize: 19 * fontScale,
      fontWeight: "400",
    },
  });
