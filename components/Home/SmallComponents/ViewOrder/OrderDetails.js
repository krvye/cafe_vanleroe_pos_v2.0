import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

export default function OrderDetails() {
  const { height } = useWindowDimensions();
  const styles = makeStyles(height);

  const [quantity, setQuantity] = useState(1);
  return (
    <View>
      <Text style={styles.headerText}>Order Details</Text>
      <View style={styles.container}>
        <View style={styles.productContainer}>
          {/* <Image
            source={{
              uri: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
            }}
            style={styles.productImage}
          /> */}
          <View style={styles.productDetailsContainer}>
            <Text style={styles.productName}>Dark Mocha</Text>
            <View>
              <Text style={styles.productDetails}>Size: M</Text>
              <Text style={styles.productDetails}>Add Ons: N/A</Text>
              <Text style={styles.productDetails}>Order Notes: N/A</Text>
              <Text style={styles.productPrice}>P 120</Text>
            </View>
          </View>
        </View>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            onPress={() => {
              if (quantity > 0) {
                setQuantity(quantity - 1);
              }
            }}
          >
            <AntDesign name="minuscircle" size={30} color="gray" />
          </TouchableOpacity>
          <Text style={styles.counterText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              setQuantity(quantity + 1);
            }}
          >
            <AntDesign name="pluscircle" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const makeStyles = (height) =>
  StyleSheet.create({
    counterContainer: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
    counterText: {
      fontSize: 14,
      color: "#19191C",
      fontWeight: "600",
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#19191C",
    },

    container: {
      paddingVertical: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: "#E4E4E4",
    },

    productContainer: { flexDirection: "row", gap: 10, alignItems: "center" },
    productImage: {
      width: height <= 480 ? 55 : 75,
      height: height <= 480 ? 55 : 75,
      borderRadius: 15,
    },
    productDetailsContainer: { justifyContent: "space-between", gap: 10 },
    productName: {
      fontSize: height <= 480 ? 12 : 16,
      color: "#19191C",
      fontWeight: "600",
    },
    productDetails: {
      fontSize: height <= 480 ? 10 : 12,
      color: "#9C9C9C",
      fontWeight: "400",
    },
    productPrice: {
      fontSize: height <= 480 ? 12 : 16,
      color: "#B66619",
      fontWeight: "600",
    },
  });
