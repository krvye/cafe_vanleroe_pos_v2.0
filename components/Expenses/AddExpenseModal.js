import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Text,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react"; 
import { AntDesign } from "@expo/vector-icons";

export default function AddExpenseModal({ openAddExpense, setOpenAddExpense }) {
  const [addItem, setAddItem] = useState(false); 

  const handleAddItem = () => {
    setAddItem(true);
    console.log("Added One Item!"); 
  }

  return (
    <Modal visible={openAddExpense} transparent={true}>
      <View style={styles.container}>
        <View style={styles.addExpenseContainer}>
          <View style={styles.exitContainer}>
            <Pressable onPress={() => setOpenAddExpense(false)}>
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
            <Text style={[styles.inputTitleText, { fontWeight: "bold" }]}>
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
            <Text style={[styles.inputTitleText, { fontWeight: "bold" }]}>
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
            <Text style={[styles.inputTitleText, { fontWeight: "bold" }]}>
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
            <Text style={[styles.inputTitleText, { fontWeight: "bold" }]}>
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
            </View>
          ): (
          <Pressable onPress={handleAddItem} style={styles.addItemContainer}>
            <Text style={styles.addItemText}>Add Item?</Text>
          </Pressable>
          )}

          
        </View>
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
    height: "60%",
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
    // backgroundColor: "pink"
  },
  addItemText: {
    fontSize: 14, 
    color: '#FF6600',
    textDecorationLine: "underline", 
  },

});
