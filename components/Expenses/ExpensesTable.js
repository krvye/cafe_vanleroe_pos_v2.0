import { StyleSheet, View, ScrollView, Text, FlatList } from "react-native";

export default function ExpensesTable({ expensesInfo, expensesTypeInfo }) {
  // Map expenseTypeDesc from EXPENSE_TYPE
  const getExpenseType = (expenseTypeCode) => {
    const expensesTypeData = expensesTypeInfo.find(
      (item) => item.expenseTypeCd === expenseTypeCode
    );
    return expensesTypeData ? expensesTypeData.expenseTypeDesc : " ";
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.dataText, { width: 150 }]}>
          {item.dateChecked}
        </Text>
        <Text style={[styles.dataText, { width: 250 }]}>
          {item.receiptNumber}
        </Text>
        <Text style={[styles.dataText, { width: 200 }]}>
          {getExpenseType(item.expenseTypeCd)}
        </Text>
        <Text style={[styles.dataText, { width: 250 }]}>{item.itemName}</Text>
        <Text style={[styles.dataText, { width: 150 }]}>{item.itemQTY}</Text>
        <Text style={[styles.dataText, { width: 150 }]}>
          ₱ {item.itemPrice}
        </Text>
        <Text style={[styles.dataText, { width: 200 }]}>
          ₱ {item.receiptTotal}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={{ borderRadius: 5, width: "98%" }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          <View style={styles.header}>
            <Text style={[styles.headerText, { width: 150 }]}>Date</Text>
            <Text style={[styles.headerText, { width: 250 }]}>
              Receipt/OR No.
            </Text>
            <Text style={[styles.headerText, { width: 200 }]}>
              Expense Type
            </Text>
            <Text style={[styles.headerText, { width: 250 }]}>Item Name</Text>
            <Text style={[styles.headerText, { width: 150 }]}>QTY</Text>
            <Text style={[styles.headerText, { width: 150 }]}>Item Price</Text>
            <Text style={[styles.headerText, { width: 200 }]}>
              Receipt Total
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <FlatList
              data={expensesInfo}
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
    justifyContent: "center",
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
    fontWeight: "500",
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
