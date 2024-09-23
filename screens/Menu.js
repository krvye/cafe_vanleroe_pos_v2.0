import { StyleSheet, Text, View } from "react-native";

import Dropdown from "@components/Menu/Dropdown";
import Items from "@components/Menu/Items";
import { useState } from "react";

import DrinksModal from "@components/Menu/DrinksModal";
import NonDrinkModal from "@components/Menu/NonDrinkModal";

export default function MenuScreen() {
  const [modalState, setModalState] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Menu Management</Text>
      <Dropdown />
      <Items setModalState={setModalState} />
      <DrinksModal modalState={modalState} setModalState={setModalState} />
      {/* <NonDrinkModal modalState={modalState} setModalState={setModalState} /> */}
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
