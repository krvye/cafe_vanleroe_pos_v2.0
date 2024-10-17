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

export default function OrderDetails({
  orderDetails,
  setOrderDetails,
  setSubTotal,
}) {
  const { height } = useWindowDimensions();
  const styles = makeStyles(height);

  // Initialize quantities for each order based on the orderDetails length
  const [quantities, setQuantities] = useState(
    orderDetails.map((orderDetail) => orderDetail.itemQuantity) // Initialize with the quantity for each item
  );

  const handleDecreaseQuantity = (index, order) => {
    setSubTotal((prevSubTotal) => prevSubTotal - order.itemPrice);
    setQuantities((prev) => {
      const newQuantities = [...prev];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      } else {
        // Remove the order if quantity goes to 0
        const updatedOrderDetails = orderDetails.filter((_, i) => i !== index);
        setOrderDetails(updatedOrderDetails);
        const updatedQuantities = newQuantities.filter((_, i) => i !== index);
        setQuantities(updatedQuantities);
      }
      return newQuantities;
    });
  };

  const handleIncreaseQuantity = (index, order) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] += 1;
      return newQuantities;
    });
    setSubTotal((prevSubTotal) => prevSubTotal + order.itemPrice);
    console.log("Item Price: ", order.itemPrice);
  };

  return (
    <View>
      <Text style={styles.headerText}>Order Details</Text>
      <View style={styles.container}>
        <View style={styles.productContainer}>
          {/* Uncomment the Image block if you want to use images */}
          {/* <Image
            source={{
              uri: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
            }}
            style={styles.productImage}
          /> */}
          <View style={styles.productDetailsContainer}>
            {orderDetails.length > 0 ? (
              orderDetails.map((order, index) => (
                <View key={index} style={styles.orderItemContainer}>
                  <Text style={styles.productName}>{order.itemName}</Text>
                  <View>
                    <Text style={styles.productDetails}>
                      Size: {order.itemSize}
                    </Text>
                    <Text style={styles.productDetails}>Add Ons: </Text>
                    {order.addOns.length > 0 ? (
                      order.addOns.map((addOn, addOnIndex) => (
                        <Text key={addOnIndex} style={styles.productDetails}>
                          - {addOn.desc}: ₱{addOn.price}
                        </Text>
                      ))
                    ) : (
                      <Text style={styles.productDetails}>None</Text>
                    )}
                    <Text style={styles.productDetails}>
                      Order Notes: {order.itemNotes}
                    </Text>
                    <Text style={styles.productPrice}>₱{order.itemTotalAmount}</Text>
                  </View>

                  {/* Quantity Selector */}
                  <View style={styles.counterContainer}>
                    <TouchableOpacity
                      onPress={() => handleDecreaseQuantity(index, order)}
                    >
                      <AntDesign name="minuscircle" size={30} color="gray" />
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{quantities[index]}</Text>
                    <TouchableOpacity
                      onPress={() => handleIncreaseQuantity(index, order)}
                    >
                      <AntDesign name="pluscircle" size={30} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No items in the order.</Text>
            )}
          </View>
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
      fontWeight: "600",
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
    orderItemContainer: {
      flexDirection: "column",
      gap: 10,
      marginBottom: 15,
    },
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
    emptyText: {
      fontSize: 16,
      color: "#9C9C9C",
      fontStyle: "italic",
      textAlign: "center",
      marginTop: 20,
    },
  });
