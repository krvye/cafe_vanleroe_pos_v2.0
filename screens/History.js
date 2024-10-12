import { StyleSheet, View, ScrollView } from "react-native";

import TodaySales from "../components/History/TodaySales";
import SalesTable from "../components/History/SalesTable";

import { SalesInformation } from "../services/firebase/History/RetrieveSales";
import { OrderMode } from "../services/firebase/History/RetrieveOrderMode";
import { ModeOfPayment } from "../services/firebase/History/RetrieveMOP";
import { posAddOns } from "../services/firebase/History/RetrieveAddOns";

export default function HistoryScreen() {
  const {
    salesData,
    totalSales,
    orderCount,
    totalCustomers,
    gcashSales,
    gcashCount,
    cashOnHandSales,
    cashOnHandCount,
    mayaSales,
    mayaCount,
    grabSales,
    grabCount,
    fpCount,
    fpSales,
    onsiteSales,
    onsiteCount,
    fbSales,
    fbCount,
  } = SalesInformation();
  const orderModeInfo = OrderMode();
  const modeOfPaymentInfo = ModeOfPayment();
  const addOnsInfo = posAddOns(); 

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TodaySales
          totalSales={totalSales}
          orderCount={orderCount}
          totalCustomers={totalCustomers}
          gcashSales={gcashSales}
          gcashCount={gcashCount}
          cashOnHandSales={cashOnHandSales}
          cashOnHandCount={cashOnHandCount}
          mayaSales={mayaSales}
          mayaCount={mayaCount}
          grabSales={grabSales}
          grabCount={grabCount}
          fpCount={fpCount}
          fpSales={fpSales}
          onsiteSales={onsiteSales}
          onsiteCount={onsiteCount}
          fbSales={fbSales}
          fbCount={fbCount}
        />
        <SalesTable
          salesInfo={salesData}
          orderModeInfo={orderModeInfo}
          modeOfPaymentInfo={modeOfPaymentInfo}
          addOnsInfo={addOnsInfo}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
