import { Text, TextInput, View } from "react-native";

export default function CustomerDetails() {
  return (
    <View>
      <Text>View Order</Text>
      <TextInput placeholder="Customer Name" />
      <TextInput placeholder="Order Number" />
      <TextInput placeholder="Add Note" />
    </View>
  );
}
