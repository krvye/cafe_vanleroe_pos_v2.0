import { StyleSheet, View } from "react-native";
import TodaySales from "../components/History/TodaySales";

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <TodaySales />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
