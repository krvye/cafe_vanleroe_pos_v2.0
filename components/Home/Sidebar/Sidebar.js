import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ItemCategory from "./ItemCategory";

import itemCategories from "../../../utils/Home/SidebarFakeData";

export default function Sidebar() {
  const [active, setActive] = useState(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={itemCategories}
        renderItem={({ item }) => (
          <ItemCategory
            categoryName={item}
            onPress={() => setActive(item)}
            active={active === item}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
  },
});
