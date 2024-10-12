import { View, StyleSheet } from "react-native";
import { useState } from "react"; 

import TodayExpenses from "../components/Expenses/TodayExpenses";
import ExpensesTable from "../components/Expenses/ExpensesTable";
import AddExpenseModal from "../components/Expenses/AddExpenseModal";

import { ExpensesInformation } from "../services/firebase/Expenses/RetrieveExpenses";
import { ExpensesTypeInformation } from "../services/firebase/Expenses/RetrieveExpenseType";
import { BranchesDetails } from "../services/firebase/Expenses/RetrieveBranches";

export default function ExpensesScreen() {
  const [openAddExpense, setOpenAddExpense] = useState(false);
  
  const {expensesData, totalExpenses} = ExpensesInformation(); 
  const expensesTypeInfo = ExpensesTypeInformation();
  const branchesInfo = BranchesDetails();

  return (
    <View style={styles.container}>
      <View contentContainerStyle={styles.scrollContainer}>
        <TodayExpenses 
          setOpenAddExpense={setOpenAddExpense}
          totalExpenses={totalExpenses}
        />
        <ExpensesTable 
          expensesInfo={expensesData}
          expensesTypeInfo={expensesTypeInfo}
        />
        <AddExpenseModal 
          openAddExpense={openAddExpense}
          setOpenAddExpense={setOpenAddExpense}
          expensesTypeInfo={expensesTypeInfo}
          branchesInfo={branchesInfo}
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