import { View, Text, Image, StyleSheet } from "react-native";

// Import Icons
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Import Logo
import Grab from "../../assets/grab.png";
import Paymaya from "../../assets/maya.png";
import Facebook from "../../assets/facebook.png";
import Gcash from "../../assets/gcash.png";
import Foodpanda from "../../assets/foodpanda.png";

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
              style={{ marginLeft: 8, marginTop: 8, marginBottom: 45 }}
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
              style={{ marginLeft: 8, marginTop: 8, marginBottom: 46 }}
            />
            <View style={styles.salesAmountContainer}>
              <Text style={styles.amountText}>200</Text>
              <Text style={styles.salesText}>Order Count</Text>
            </View>
          </View>
          <View style={styles.todayTotalCustomers}>
            <Ionicons
              name="people"
              size={15}
              color="#E052ED"
              style={{ marginLeft: 8, marginTop: 8, marginBottom: 45 }}
            />
            <View style={styles.salesAmountContainer}>
              <Text style={styles.amountText}>200</Text>
              <Text style={styles.salesText}>Total Customers</Text>
            </View>
          </View>
        </View>
      </View>
      {/*Mode of Payment Section*/}
      <View style={styles.paymentModeContainer}>
        <ScrollView style={styles.grabContainer}>
          <Image
            source={Grab}
            style={{ height: 50, width: 50, marginBottom: 20 }}
            resizeMode="contain"
          />
          <View style={styles.salesAmountContainer}>
            <Text style={styles.amountText}>200</Text>
            <Text style={styles.salesText}>Total Customers</Text>
            <Text style={styles.amountText}>₱ 2000.00</Text>
            <Text style={styles.salesText}>Total Sales</Text>
          </View>
        </ScrollView>
        <View style={styles.foodpandaContainer} size={10}>
          <Image
            source={Foodpanda}
            style={{ height: 60, width: 60, marginBottom: 10 }}
            resizeMode="contain"
          />
          <View style={styles.salesAmountContainer}>
            <Text style={styles.amountText}>200</Text>
            <Text style={styles.salesText}>Total Customers</Text>
            <Text style={styles.amountText}>₱ 2000.00</Text>
            <Text style={styles.salesText}>Total Sales</Text>
          </View>
        </View>
        <View style={styles.onsiteContainer}>
          <Text
            style={{
              marginTop: 12,
              textAlign: "center",
              color: "#F9BC4D",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 32,
            }}
          >
            Onsite
          </Text>
          <View style={styles.salesAmountContainer}>
            <Text style={styles.amountText}>200</Text>
            <Text style={styles.salesText}>Total Customers</Text>
            <Text style={styles.amountText}>₱ 2000.00</Text>
            <Text style={styles.salesText}>Total Sales</Text>
          </View>
        </View>
        <View style={styles.facebookContainer}>
          <Image
            source={Facebook}
            style={{ height: 70, width: 70 }}
            resizeMode="contain"
          />
          <View style={styles.salesAmountContainer}>
            <Text style={styles.amountText}>200</Text>
            <Text style={styles.salesText}>Total Customers</Text>
            <Text style={styles.amountText}>₱ 2000.00</Text>
            <Text style={styles.salesText}>Total Sales</Text>
          </View>
        </View>
        <View style={styles.gcashContainer}>
          <Image
            source={Gcash}
            style={{ height: 70, width: 70 }}
            resizeMode="contain"
          />
          <View style={styles.salesAmountContainer}>
            <Text style={styles.amountText}>200</Text>
            <Text style={styles.salesText}>Total Customers</Text>
            <Text style={styles.amountText}>₱ 2000.00</Text>
            <Text style={styles.salesText}>Total Sales</Text>
          </View>
        </View>
        <View style={styles.cashContainer}>
          <Text
            style={{
              marginTop: 12,
              textAlign: "center",
              color: "#b66619",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 32,
            }}
          >
            Cash
          </Text>
          <View style={styles.salesAmountContainer}>
            <Text style={styles.amountText}>200</Text>
            <Text style={styles.salesText}>Total Customers</Text>
            <Text style={styles.amountText}>₱ 2000.00</Text>
            <Text style={styles.salesText}>Total Sales</Text>
          </View>
        </View>
        <View style={styles.paymayaContainer}>
          <Image
            source={Paymaya}
            style={{ height: 70, width: 70 }}
            resizeMode="contain"
          />
          <View style={styles.salesAmountContainer}>
            <Text style={styles.amountText}>200</Text>
            <Text style={styles.salesText}>Total Customers</Text>
            <Text style={styles.amountText}>₱ 2000.00</Text>
            <Text style={styles.salesText}>Total Sales</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 150,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "1%",
  },
  todaySalesText: {
    marginTop: 8,
    marginLeft: 10,
    fontSize: 16,
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
    marginRight: "1%",
  },
  todaySalesContainer: {
    height: "70%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 5,
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
    fontSize: 12,
  },
  salesText: {
    fontWeight: "light",
    fontSize: 8,
  },
  paymentModeContainer: {
    height: "100%",
    width: "62%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  grabContainer: {
    height: "90%",
    width: "13%",
    backgroundColor: "#5ccb3a66",
    borderRadius: 5,
    flexDirection: "column",
    marginRight: "1%",
    alignItems: "center",
  },
  foodpandaContainer: {
    height: "90%",
    width: "13%",
    backgroundColor: "#ffa8b766",
    borderRadius: 5,
    flexDirection: "column",
    marginRight: "1%",
    alignItems: "center",
  },
  onsiteContainer: {
    height: "90%",
    width: "13%",
    backgroundColor: "#f9bc4d52",
    borderRadius: 5,
    flexDirection: "column",
    marginRight: "1%",
    alignItems: "center",
  },
  facebookContainer: {
    height: "90%",
    width: "13%",
    backgroundColor: "#17a9fd66",
    borderRadius: 5,
    flexDirection: "column",
    marginRight: "1%",
    alignItems: "center",
  },
  gcashContainer: {
    height: "90%",
    width: "13%",
    backgroundColor: "#3b8ff366",
    borderRadius: 5,
    flexDirection: "column",
    marginRight: "1%",
    alignItems: "center",
  },
  cashContainer: {
    height: "90%",
    width: "13%",
    backgroundColor: "#b6661980",
    borderRadius: 5,
    flexDirection: "column",
    marginRight: "1%",
    alignItems: "center",
  },
  paymayaContainer: {
    height: "90%",
    width: "13%",
    backgroundColor: "#97e6dc",
    borderRadius: 5,
    flexDirection: "column",
    alignItems: "center",
  },
});