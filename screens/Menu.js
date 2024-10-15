import { StyleSheet, Text, View } from "react-native";

import Dropdown from "@components/Menu/Dropdown";
import Items from "@components/Menu/Items";
import { useState } from "react";

import DrinksModal from "@components/Menu/DrinksModal";
import NonDrinkModal from "@components/Menu/NonDrinkModal";
import NewItemModal from "@components/Menu/NewItemModal";

export default function MenuScreen() {
  const [modalState, setModalState] = useState(false);
  const [newItemState, setNewItemState] = useState(false);
  const [selectedCategoryCode, setSelectedCategoryCode] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Menu Management</Text>
      <Dropdown
        setNewItemState={setNewItemState}
        setSelectedCategoryCode={setSelectedCategoryCode}
        selectedCategoryCode={selectedCategoryCode}
      />
      <Items
        setModalState={setModalState}
        selectedCategoryCode={selectedCategoryCode}
        setSelectedItem={setSelectedItem}
      />
      {selectedCategoryCode === "MCH" ||
      selectedCategoryCode === "PST" ||
      // selectedCategoryCode === "LTD" ||
      selectedCategoryCode === "FOD" ||
      selectedCategoryCode === "MLS" ? (
        <NonDrinkModal
          modalState={modalState}
          setModalState={setModalState}
          selectedItem={selectedItem}
        />
      ) : (
        <DrinksModal
          modalState={modalState}
          setModalState={setModalState}
          selectedItem={selectedItem}
        />
      )}
      <NewItemModal
        newItemState={newItemState}
        setNewItemState={setNewItemState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerText: {
    fontSize: 34,
    fontWeight: "400",
    color: "#19191C",
  },
});
