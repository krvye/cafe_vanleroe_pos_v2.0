import { StyleSheet, View, ScrollView } from "react-native";

import TodaySales from "../components/History/TodaySales";
import SalesTable from "../components/History/SalesTable";

import { SalesInformation } from "../services/firebase/History/RetrieveSales";

export default function HistoryScreen() {
  const salesInfo = SalesInformation(); 
  console.log("Sales Data: ", salesInfo);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TodaySales />
        <SalesTable/>
      </ScrollView>
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
