import { Button, StyleSheet, Text, View } from "react-native";

export default function CustomersScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customers</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          navigation.navigate("SignInScreen");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});