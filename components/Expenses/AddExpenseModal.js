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
// import { StoreExpenses } from "../../services/firebase/Expenses/StoreExpenses";

export default function AddExpenseModal({
  openAddExpense,
  setOpenAddExpense,
  expensesTypeInfo,
}) {
  // Handling expense items 
  const [addItem, setAddItem] = useState(false);
  const [items, setItems] = useState([]);
  const [addAllItems, setAddAllItems] = useState(false);

  // States for the new item inputs
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  // useState for the expenses form 
  const [currDate, setCurrDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [branchCode, setBranchCode] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");

  // Handling function for adding name 
  const handleAddItem = () => {
    setAddItem(true);
    const expenses = {
      dateChecked: currDate,
      branchCode: branchCode,
      expenseTypeCd: expenseType,
      receiptNumber: receiptNumber,
      itemName: itemName,
      itemyQTY: itemQty,
      itemPrice: itemPrice,
      receiptTotal: totalPrice,
    };
    setItems((prevItems) => [...prevItems, expenses]);
    console.log("Expenses: ", expenses);
    // Clear inputs after adding
    setItemName('');
    setItemQty('');
    setItemPrice('');
    setTotalPrice('');
  };

  const handleRemoveItem = (index) => {
    if (items.length > 0) {
      setItems(items.filter((_, idx) => idx !== index));
      console.log("Removed Item!");
      if (items.length === 1) {
        setAddItem(false);
      }
    }
  };

  const handleAddAllItems = () => {
    setAddAllItems(true);
    setAddItem(false);
    setOpenAddExpense(false);

    console.log("All items added:", items);
  };

  const handleExitModal = () => {
    setOpenAddExpense(false);
    setItems([]);
    setAddItem(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={openAddExpense}>
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
              placeholder={currDate}
              placeholderTextColor={"gray"}
              value={currDate}
              onChangeText={setCurrDate}
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
              value={branchCode}
              onChangeText={setBranchCode}
            />
          </View>

          {/* Expense Type */}
          <View style={styles.inputTitleCon}>
            <Text style={[styles.inputTitleText, { fontWeight: 500 }]}>
              Expense Type:
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={expenseType}
              style={styles.input}
              onValueChange={(itemValue) => setExpenseType(itemValue)}
            >
              <Picker.Item label="Select Expense Type" value="" />
              {expensesTypeInfo.map((expType) => (
                <Picker.Item
                  key={expType.expenseTypeCd}
                  label={expType.expenseTypeDesc}
                  value={expType.expenseTypeCd}
                />
              ))}
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
              value={receiptNumber}
              onChangeText={setReceiptNumber}
            />
          </View>

          {/* Add Item Form */}
          <View>
            <Text style={styles.inputTitleText}>Item Name:</Text>
            <TextInput
              style={styles.input}
              value={itemName}
              onChangeText={setItemName}
              placeholder="Item Name"
            />
            <Text style={styles.inputTitleText}>Item Quantity:</Text>
            <TextInput
              style={styles.input}
              value={itemQty}
              onChangeText={setItemQty}
              placeholder="Item Quantity"
            />
            <Text style={styles.inputTitleText}>Item Price:</Text>
            <TextInput
              style={styles.input}
              value={itemPrice}
              onChangeText={setItemPrice}
              placeholder="Item Price"
            />
            <Text style={styles.inputTitleText}>Total Price:</Text>
            <TextInput
              style={styles.input}
              value={totalPrice}
              onChangeText={setTotalPrice}
              placeholder="Total Price"
            />
          </View>

          <Pressable onPress={handleAddItem} style={styles.addItemContainer}>
            <Text style={styles.addItemText}>Add Item</Text>
          </Pressable>

          {/* Added Items */}
          {items.map((item, index) => (
            <AddItem
              key={index}
              index={index}
              handleRemoveItem={handleRemoveItem}
              itemLength={items.length}
            />
          ))}

          <View style={styles.addAllCon}>
            <Pressable onPress={handleAddAllItems} style={styles.addAllButton}>
              <Text style={styles.addAllText}>Add</Text>
            </Pressable>
            <Pressable onPress={handleExitModal} style={styles.cancelButton}>
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
