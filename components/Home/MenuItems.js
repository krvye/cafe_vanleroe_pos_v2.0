import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Items from "./SmallComponents/MenuItem/Items";
import OrderModesButtons from "./SmallComponents/MenuItem/OrderModeButtons";
import { Alert } from "react-native";

export default function MenuItems({
  setModalState,
  setViewOrderState,
  setFoodService,
  selectedCategoryCode,
  setSelectedItem,
  setCustomerName,
  setOrderNote,
  setOrderNumber,
  setRetekessNumber,
  setTimeElapsed,
  setOrderDetails,
  setCustomDiscountCode,
  setDiscount,
  setFinalTotal,
  setSubTotal,
  setPaymentMethod,
  setPaymentDetails,
  foodService,
  setOnsiteMode,
  orderDetails,
}) {
  const { fontScale, scale } = useWindowDimensions();
  const styles = makeStyles(scale, fontScale);
  const iconSize = 70 / scale;

  console.log("Food Service", foodService);

  const handleCancelOrder = () => {
    setCustomerName("");
    setOrderNote("");
    setOrderNumber("");
    setRetekessNumber("");
    setTimeElapsed("");
    setOrderDetails([]);
    setCustomDiscountCode("");
    setDiscount(0);
    setFinalTotal(0);
    setSubTotal(0);
    setPaymentMethod("");
    setPaymentDetails({});
    setOnsiteMode("");
  };

  return (
    <ScrollView style={styles.container}>
      <OrderModesButtons setFoodService={setFoodService} />
      <Items
        setModalState={setModalState}
        selectedCategoryCode={selectedCategoryCode}
        setSelectedItem={setSelectedItem}
        foodService={foodService}
      />
      <View style={styles.orderButtonContainer}>
        <TouchableOpacity
          style={styles.cancelOrderButton}
          onPress={handleCancelOrder}
        >
          <MaterialCommunityIcons name="cash" size={iconSize} color="white" />
          <Text style={styles.orderButtonText}>Cancel Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewOrderButton}
          onPress={() => {
            if (orderDetails.length === 0) {
              Alert.alert(
                "No items in the order",
                "Please add items to your order before viewing."
              );
            } else {
              setViewOrderState(true);
            }
          }}
        >
          <MaterialCommunityIcons name="cash" size={iconSize} color="white" />
          <Text style={styles.orderButtonText}>View Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const makeStyles = (scale, fontScale) =>
  StyleSheet.create({
    container: {
      flex: 0.8,
      backgroundColor: "white",
      padding: 20,
    },
    orderButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      gap: 30,
      paddingHorizontal: 70,
      marginBottom: 30,
    },
    orderButtonText: { color: "white", fontSize: 16 / fontScale },
    cancelOrderButton: {
      backgroundColor: "#19191C",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 30 / scale,
      borderRadius: 20,
      gap: 5,
    },
    viewOrderButton: {
      backgroundColor: "#B66619",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 30 / scale,
      borderRadius: 20,
      gap: 5,
    },
  });
