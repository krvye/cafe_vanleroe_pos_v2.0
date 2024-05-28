import { Button, StyleSheet, Text, View } from "react-native";

import AddOrder from "../components/Home/AddOrder";
import ItemSelected from "../components/Home/ItemSelected";
import PayNowSelected from "../components/Home/PayNowSelected";
import PlaceOrderSelected from "../components/Home/PlaceOrderSelected";
import Sidebar from "../components/Home/Sidebar/Sidebar";
import MenuItems from "../components/Home/MenuItem/MenuItems";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Sidebar />
      <MenuItems />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
