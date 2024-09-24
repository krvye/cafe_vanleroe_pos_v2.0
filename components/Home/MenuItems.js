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
import PaymentButtons from "./SmallComponents/MenuItem/PaymentButtons";

export default function MenuItems({
  setModalState,
  setViewOrderState,
  setFoodService,
}) {
  const { fontScale, scale } = useWindowDimensions();
  const styles = makeStyles(scale, fontScale);
  const iconSize = 70 / scale;

  return (
    <ScrollView style={styles.container}>
      <PaymentButtons setFoodService={setFoodService} />
      <Items setModalState={setModalState} />
      <View style={styles.orderButtonContainer}>
        <TouchableOpacity style={styles.cancelOrderButton}>
          <MaterialCommunityIcons name="cash" size={iconSize} color="white" />
          <Text style={styles.orderButtonText}>Cancel Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewOrderButton}
          onPress={() => {
            setViewOrderState(true);
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
