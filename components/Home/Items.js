import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Items() {
  return (
    <View style={styles.container}>
      <ScrollView></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: "white",
  },
});
