import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import HomeScreen from "../screens/Home";
import QueueScreen from "../screens/Queue";
import HistoryScreen from "../screens/History";
import InventoryScreen from "../screens/Inventory";
import CustomersScreen from "../screens/Customers";

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Queue" component={QueueScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Inventory" component={InventoryScreen} />
      <Tab.Screen name="Customers" component={CustomersScreen} />
    </Tab.Navigator>
  );
}
