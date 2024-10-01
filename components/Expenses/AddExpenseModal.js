import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import AddItem from "../Expenses/smallComponents/AddItem";

export default function AddExpenseModal({ openAddExpense, setOpenAddExpense }) {
  const [addItem, setAddItem] = useState(false);
  const [items, setItems] = useState([]);
  const [addAllItems, setAddAllItems] = useState(false);

  const handleAddItem = () => {
    setAddItem(true);
    setItems([...items, items.length]);
    console.log("Added One Item!");
  };

  const handleRemoveItem = (index) => {
    if (items.length >= 1) {
      setItems(items.filter((_, idx) => idx !== index));
      console.log("Removed Item!");
      if (items.length == 1) {
        setAddItem(false);
      }
    }
  };

  const handleAddAllItems = () => {
    setAddAllItems(true);
    setAddItem(false);
    setOpenAddExpense(false);
    console.log("Add all items!");
  };

  const handleExitModal = () => {
    setOpenAddExpense(false);
    setItems([]);
    setAddItem(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openAddExpense}
    >
      <View style={styles.container}>
        <ScrollView style={styles.addExpenseContainer}>
          <View style={styles.exitContainer}>
            <Pressable onPress={handleExitModal}>
              <AntDesign
                name="close"
                size={25}
                color="#19191C"
                style={{ marginRight: 2 }}
              />
            </Pressable>
          </View>
          {/* Input Date */}
          <View style={styles.inputTitleCon}>
            <Text style={[styles.inputTitleText, { fontWeight: 500 }]}>
              Date:
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.inputTitleText]}
              placeholder="Date Today"
              placeholderTextColor={"gray"}
            />
          </View>

          {/* Input Branch */}
          <View style={styles.inputTitleCon}>
            <Text style={[styles.inputTitleText, { fontWeight: 500 }]}>
              Branch:
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.inputTitleText]}
              placeholder="Branch"
              placeholderTextColor={"gray"}
            />
          </View>

          {/* Expense Type */}
          <View style={styles.inputTitleCon}>
            <Text style={[styles.inputTitleText, { fontWeight: 500 }]}>
              Expense Type:
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Picker style={styles.input}>
              <Picker.Item
                label="Select Expense Type"
                value="Select Expense Type"
              />
              <Picker.Item
                label="Replenishment Expense"
                value="Replenishment Expense"
              />
              <Picker.Item
                label="Employee Deductions"
                value="Employee Deductions"
              />
              <Picker.Item
                label="Off Cycle Employee Salary"
                value="Off Cycle Employee Salary"
              />
              <Picker.Item label="Reimbursement" value="Reimbursement" />
              <Picker.Item
                label="Cost of Goods Expense"
                value="Cost of Goods Expense"
              />
            </Picker>
          </View>

          {/* Input Receipt/OR No. */}
          <View style={styles.inputTitleCon}>
            <Text style={[styles.inputTitleText, { fontWeight: 500 }]}>
              Receipt/OR No.:
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.inputTitleText]}
              placeholder="Receipt/OR No."
              placeholderTextColor={"gray"}
            />
          </View>

          {addItem ? (
            <View>
              {items.map((_, index) => (
                <AddItem
                  key={index}
                  index={index}
                  handleAddItem={handleAddItem}
                  handleRemoveItem={handleRemoveItem}
                />
              ))}
            </View>
          ) : (
            <Pressable onPress={handleAddItem} style={styles.addItemContainer}>
              <Text style={styles.addItemText}>Add Item?</Text>
            </Pressable>
          )}

          <View style={styles.addAllCon}>
            <Pressable onPress={handleAddAllItems} style={styles.addAllButton}>
              <Text style={styles.addAllText}>Add</Text>
            </Pressable>
            <Pressable
              onPress={handleExitModal}
              style={styles.cancelButton}
            >
              <Text style={styles.addAllText}>Cancel</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  addExpenseContainer: {
    maxHeight: 500,
    width: "30%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  exitContainer: {
    width: "100%",
    height: 20,
    marginTop: "1%",
    display: "flex",
    alignItems: "flex-end",
    marginBottom: "1%",
    // backgroundColor: "pink",
  },
  inputTitleCon: {
    height: 25,
    width: "100%",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
  inputTitleText: {
    fontSize: 15,
    marginLeft: "5%",
  },
  inputContainer: {
    height: 35,
    width: "100%",
    justifyContent: "center",
    // backgroundColor: "yellow",
  },
  input: {
    flex: 1,
    width: "88%",
    borderColor: "gray",
    borderRadius: 1,
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: "5%",
    padding: 2,
  },
  addItemContainer: {
    height: "5%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "45%",
    // backgroundColor: "pink"
  },
  addItemText: {
    fontSize: 14,
    color: "#B66619",
    textDecorationLine: "underline",
  },
  addAllCon: {
    height: 60,
    width: "100%",
    // backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  addAllButton: {
    height: "65%",
    width: "42%",
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "3%",
  },
  addAllText: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: 500,
    textAlign: "center",
  },
  cancelButton: {
    height: "65%",
    width: "42%",
    borderRadius: 5,
    backgroundColor: "#F44336",
    alignItems: "center",
    justifyContent: "center",
  },
});
