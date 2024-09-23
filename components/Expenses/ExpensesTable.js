import { StyleSheet, View, ScrollView } from "react-native";
import { Table, Row } from "react-native-table-component";

export default function ExpensesTable() {
  const expensesTableHeader = [
    "Date",
    "Receipt/OR No.",
    "Expense Type",
    "Item Name",
    "QTY",
    "Item Price",
    "Receipt Total",
  ];

  const expensesTableData = [[
    "09/23/2024",
    "123",
    "Off Cycle Employee Salary", 
    "Coffee Beans", 
    4, 
    1230.50
  ], [
    "09/23/2024",
    "123",
    "Cost of Goods Expense", 
    "Americano", 
    4, 
    1230.50
  ], 
]
  return (
    <View style={styles.container}>
      <Table borderStyle={styles.tableBorder} style={styles.tableShadow}>
        <Row
          data={expensesTableHeader}
          style={styles.header}
          textStyle={styles.headerText}
        />
        <ScrollView horizontal={false}>
          {expensesTableData.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={[styles.row, index % 2 && { backgroundColor: "#F8F8F8" }]}
              textStyle={styles.rowText}
            />
          ))}
        </ScrollView>
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 5,
    paddingTop: 30,
    alignItems: "center",
  },
  tableBorder: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#FFFFFF",
  },
  tableShadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 10,
    height: 580,
    width: "95%",
    maxHeight: 800,
  },
  header: {
    height: 40,
    backgroundColor: "#FF6600",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  row: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF"
  },
  rowText: {
    textAlign: "center",
  },
});
