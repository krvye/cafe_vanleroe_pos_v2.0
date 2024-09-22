import { View, StyleSheet } from "react-native";
import { useState } from "react"; 

import TodayExpenses from "../components/Expenses/TodayExpenses";
import ExpensesTable from "../components/Expenses/ExpensesTable";
import AddExpenseModal from "../components/Expenses/AddExpenseModal";

export default function ExpensesScreen() {
  const [openAddExpense, setOpenAddExpense] = useState(false); 
  return (
    <View style={styles.container}>
      <View contentContainerStyle={styles.scrollContainer}>
        <TodayExpenses 
          setOpenAddExpense={setOpenAddExpense}
        />
        <ExpensesTable />
        <AddExpenseModal 
          openAddExpense={openAddExpense}
          setOpenAddExpense={setOpenAddExpense}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});