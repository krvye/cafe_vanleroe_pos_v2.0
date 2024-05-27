import { StyleSheet, View } from "react-native";
import TodaySales from "../components/History/TodaySales.js";

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <TodaySales />
      {/* <Text style={styles.title}>History</Text>
        <Button
          title="Sign Out"
          onPress={() => {
            navigation.navigate("SignInScreen");
          }}
        /> */}
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
