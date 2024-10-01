import { StyleSheet, View, ScrollView, Text, FlatList } from "react-native";
import { useState } from "react"; 

export default function ExpensesTable() {
  const [expensesData, setExpensesData] = useState([
    {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, {
      dateChecked:"09/24/2024", 
      expenseType: "Off Cycle Employee Salary", 
      itemName: "SLCTA MLK", 
      itemPrice: 171, 
      receiptNumber: "01-2345",
      receiptTotal: 456,
      itemQTY: 1,
    }, 
  ]);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.dataText, { width: 120 }]}>
          {item.dateChecked}
        </Text>
        <Text style={[styles.dataText, { width: 150 }]}>
          {item.receiptNumber}
        </Text>
        <Text style={[styles.dataText, { width: 200 }]}>
          {item.expenseType}
        </Text>
        <Text style={[styles.dataText, { width: 180 }]}>
          {item.itemName}
        </Text>
        <Text style={[styles.dataText, { width: 80 }]}>
          {item.itemQTY}
        </Text>
        <Text style={[styles.dataText, { width: 100 }]}>
          {item.itemPrice}
        </Text>
        <Text style={[styles.dataText, { width: 120 }]}>
          {item.receiptTotal}
        </Text>
      </View>
    )
  }
  return (
<View style={styles.container}>
      <ScrollView
        horizontal
        style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
      >
        <View style={styles.listContainer}>
          <View style={styles.header}>
            <Text style={[styles.headerText, { width: 120 }]}>
              Date
            </Text>
            <Text style={[styles.headerText, { width: 150 }]}>Receipt/OR No.</Text>
            <Text style={[styles.headerText, { width: 200 }]}>Expense Type</Text>
            <Text style={[styles.headerText, { width: 180 }]}>Item Name</Text>
            <Text style={[styles.headerText, { width: 80 }]}>
              QTY
            </Text>
            <Text style={[styles.headerText, { width: 100 }]}>
              Item Price
            </Text>
            <Text style={[styles.headerText, { width: 120 }]}>Receipt Total</Text>
          </View>
          <View style={styles.rowContainer}>
            <FlatList
              data={expensesData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 25,
    alignItems: "center",
  },
  listContainer: {
      flex: 1,
      flex: 1,
    borderRadius: 5,
  },
  header: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "#F9BC4D",
    alignItems: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "#fbfbfa",
    alignItems: "center",
  },
  headerText: {
    fontWeight: 500,
    textAlign: "center",
  },
  dataText: {
    fontSize: 14,
    textAlign: "center",
  },
  rowContainer: {
    height: 500,
    borderBottomEndRadius: 5,
  },
});