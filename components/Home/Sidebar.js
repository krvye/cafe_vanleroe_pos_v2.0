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

// import itemCategories from "@utils/Home/SidebarFakeData";

import { retrieveItemCategory } from "@services/firebase/Home/retrieveItemCategory";

export default function Sidebar({ setSelectedCategoryCode }) {
  const [active, setActive] = useState(0);

  const itemCategoriesData = retrieveItemCategory();

  const itemCategories = itemCategoriesData.map((item) => ({
    categoryCode: item.itemCategoryCode,
    categoryName: item.itemCategoryDesc,
  }));

  const handleCategoryPress = (index, categoryCode) => {
    setActive(index);
    setSelectedCategoryCode(categoryCode);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={itemCategories}
        renderItem={({ item, index }) => (
          <ItemCategory
            categoryName={item.categoryName}
            onPress={() => handleCategoryPress(index, item.categoryCode)}
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
