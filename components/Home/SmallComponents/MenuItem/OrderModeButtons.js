import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

// import PaymentMethod from "@utils/Home/PaymentMethods";
import { useState } from "react";

import { retrieveOrderModes } from "@services/firebase/Home/retrieveOrderModes";

export default function OrderModesButtons({ setFoodService }) {
  const [active, setActive] = useState(0);

  const styles = makeStyles(useWindowDimensions().height);

  const OrderModeData = retrieveOrderModes();

  const OrderMode = OrderModeData.map((item) => item.orderModeDesc);

  return (
    <View style={styles.container}>
      {OrderMode.map((method, index) => (
        <Pressable
          style={[
            index === active ? styles.activeButton : styles.inactiveButton,
          ]}
          key={index}
          onPress={() => {
            setActive(index);
            setFoodService(method);
          }}
        >
          <Text style={{ fontSize: 16 }}>{method}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const makeStyles = (height) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#F8F9FD",
      padding: 4,
      borderRadius: 80,
      flexDirection: "row",
      justifyContent: "space-between",
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
