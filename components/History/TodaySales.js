import { View, Text, StyleSheet } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function TodaySales() {
  return (
    <View style={styles.mainContainer}>
      {/*Today's Sales Section*/}
      <View style={styles.totalSalesContainer}>
        <Text style={styles.todaySalesText}>Today's Sales</Text>
        <View style={styles.todaySalesContainer}>
          <View style={styles.todayTotalSales}>
            <FontAwesome5
              name="coins"
              size={15}
              color="red"
              style={{ marginLeft: 8, marginTop: 8, marginBottom: 50 }}
            />
            <View style={styles.salesAmountContainer}>
              <Text style={styles.amountText}>₱ 2000.00</Text>
              <Text style={styles.salesText}>Total Sales</Text>
            </View>
          </View>
          <View style={styles.todayTotalCount}>
            <MaterialCommunityIcons
              name="order-bool-ascending-variant"
              size={15}
              color="#F9BC4D"
              style={{ marginLeft: 8, marginTop: 8, marginBottom: 50 }}
            />
            <View style={styles.salesAmountContainer}>
              <Text style={styles.amountText}>₱ 2000.00</Text>
              <Text style={styles.salesText}>Order Count</Text>
            </View>
          </View>
          <View style={styles.todayTotalCustomers}>
            <Ionicons
              name="people"
              size={15}
              color="#E052ED"
              style={{ marginLeft: 8, marginTop: 8, marginBottom: 50 }}
            />
            <View style={styles.salesAmountContainer}>
              <Text style={styles.amountText}>₱ 2000.00</Text>
              <Text style={styles.salesText}>Total Customers</Text>
            </View>
          </View>
        </View>
      </View>
      {/*Mode of Payment Section*/}
      <View style={styles.paymentModeContainer}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 150,
    backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "1%",
  },
  todaySalesText: {
    marginTop: 8,
    marginLeft: 10,
    fontSize: "16px",
    fontWeight: "bold",
  },
  totalSalesContainer: {
    height: "100%",
    width: "35%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginRight: "2%",
  },
  todaySalesContainer: {
    height: "70%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "5px",
  },
  todayTotalSales: {
    height: "100%",
    width: "30%",
    backgroundColor: "#f4363652",
    borderRadius: 5,
    flexDirection: "column",
    marginRight: "2%",
  },
  todayTotalCount: {
    height: "100%",
    width: "30%",
    backgroundColor: "#f9bc4d52",
    borderRadius: 5,
    flexDirection: "column",
    marginRight: "2%",
  },
  todayTotalCustomers: {
    height: "100%",
    width: "30%",
    backgroundColor: "#e052ed52",
    borderRadius: 5,
    flexDirection: "column",
  },
  salesAmountContainer: {
    width: "90%",
    marginLeft: "5%",
  },
  amountText: {
    fontWeight: "bold",
    fontSize: "12px",
  },
  salesText: {
    fontWeight: "light",
    fontSize: "8px",
  },
  paymentModeContainer: {
    height: "100%",
    width: "60%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row',
  },
  grabContainer: {
  }
});
