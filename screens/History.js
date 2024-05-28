import { StyleSheet, View } from "react-native";
import TodaySales from "../components/History/TodaySales";
import SalesTable from "../components/History/SalesTable";

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <TodaySales />
      <SalesTable/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: '#FFFFFF',
  },
});
