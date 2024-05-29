import { Text, TouchableOpacity, View } from "react-native";

export default function PayNow() {
  return (
    <View>
      <View>
        <Text>Sub Total</Text>
        <Text>P593</Text>
      </View>
      <View>
        <Text>Discount</Text>
        <Text>P0</Text>
      </View>
      <View></View>
      <View>
        <Text>Total</Text>
        <Text>P593</Text>
      </View>
      <TouchableOpacity>
        <Text>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}
