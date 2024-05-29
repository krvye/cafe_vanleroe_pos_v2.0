import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ItemCategory from "./SmallComponents/Sidebar/ItemCategory";

import itemCategories from "@utils/Home/SidebarFakeData";

export default function Sidebar() {
  const [active, setActive] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={itemCategories}
        renderItem={({ item, index }) => (
          <ItemCategory
            categoryName={item}
            onPress={() => setActive(index)}
            active={active === index}
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
