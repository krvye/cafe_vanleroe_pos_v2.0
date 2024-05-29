import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

export default function Discounts() {
  const { height } = useWindowDimensions();

  const styles = makeStyles(height);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Percentage Discounts</Text>

      <View style={styles.discountContainer}>
        <Pressable style={styles.discountButton}>
          <Text style={styles.discountText}>Senior Citizen/PWD</Text>
        </Pressable>
        <Pressable style={styles.discountButton}>
          <Text style={styles.discountText}>Student</Text>
        </Pressable>
      </View>

      <View style={styles.discountContainer}>
        <Pressable style={styles.discountButton}>
          <Text style={styles.discountText}>10%</Text>
        </Pressable>
        <Pressable style={styles.discountButton}>
          <Text style={styles.discountText}>20%</Text>
        </Pressable>
      </View>

      <View style={styles.discountContainer}>
        <Pressable style={styles.discountButton}>
          <Text style={styles.discountText}>30%</Text>
        </Pressable>
        <Pressable style={styles.discountButton}>
          <Text style={styles.discountText}>40%</Text>
        </Pressable>
      </View>

      <Text style={styles.customDiscountLabel}>
        Custom Discount/Voucher Code
      </Text>
      <TextInput
        placeholder="Add discount/voucher code"
        style={styles.addDiscount}
      />
      <Pressable style={styles.applyButton}>
        <Text style={styles.applyText}>Apply</Text>
      </Pressable>
    </View>
  );
}

const makeStyles = (height) =>
  StyleSheet.create({
    container: { marginTop: 20 },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#19191C",
    },
    discountContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 20,
      marginTop: 15,
    },
    discountButton: {
      backgroundColor: "#FF5C00",
      padding: 10,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 15,
      borderRadius: 60,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    discountText: {
      color: "white",
      fontWeight: "600",
      fontSize: height <= 480 ? 10 : 16,
    },

    customDiscountLabel: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#19191C",
      paddingVertical: 10,
    },
    addDiscount: {
      borderWidth: 1,
      borderColor: "#E4E4E4",
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 60,
    },
    applyButton: {
      flex: 1,
      paddingVertical: 10,
      backgroundColor: "#FF5C00",
      alignItems: "center",
      borderRadius: 60,
      marginTop: 10,
    },
    applyText: {
      color: "white",
      fontWeight: "600",
      fontSize: 16,
    },
  });
