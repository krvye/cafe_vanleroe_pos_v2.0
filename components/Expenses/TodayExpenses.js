import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";

import Foundation from '@expo/vector-icons/Foundation';

export default function TodayExpenses({ setOpenAddExpense, totalExpenses }) {
  const handleOpenAddExpense = () => {
    setOpenAddExpense(true);
    console.log("Add Item!");
  };

  return (
    <View style={styles.expMainContainer}>
      <View style={styles.expenseDetailsContainer}>
        <View style={styles.expenseIcon}>
          <Foundation name="shopping-cart" size={24} color="#FFFF" />
        </View>
        <Text style={styles.amountText}>TOTAL EXPENSES: </Text>
        <Text style={styles.expenseText}>₱ {totalExpenses}</Text>
      </View>

      {/* Today Expenses */}
      <View style={styles.addAndTodayExpCon}>
        <Pressable style={styles.addExpCon} onPress={handleOpenAddExpense}>
          <Text style={styles.buttonText}>Add Expenses</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  expMainContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "3%",
  },
  expenseDetailsContainer: {
    height: "100%",
    width: "40%",
    marginRight: "2%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  expenseIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#B66619",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "2%",
    marginRight: "2%",
  },
  amountText: {
    fontWeight: 500,
    fontSize: 23,
  },
  expenseText: {
    fontSize: 25,
  },
  addAndTodayExpCon: {
    height: "100%",
    width: "50%",
  },
  addExpCon: {
    height: "100%",
    width: "100%",
    backgroundColor: "#B66619",
    shadowColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "3%",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: 500,
  },
});