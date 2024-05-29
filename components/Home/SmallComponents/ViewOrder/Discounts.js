import { Pressable, Text, TextInput, View } from "react-native";

export default function Discounts() {
  return (
    <View>
      <Text>Percentage Discounts</Text>
      <View>
        <Pressable>
          <Text>Senior Citizen/PWD</Text>
        </Pressable>
        <Pressable>
          <Text>Senior Citizen/PWD</Text>
        </Pressable>
      </View>
      <View>
        <Pressable>
          <Text>10%</Text>
        </Pressable>
        <Pressable>
          <Text>20%</Text>
        </Pressable>
      </View>
      <View>
        <Pressable>
          <Text>30%</Text>
        </Pressable>
        <Pressable>
          <Text>40%</Text>
        </Pressable>
      </View>

      <Text>Custom Discount/Voucher Code</Text>
      <TextInput placeholder="Add discount/voucher code" />
      <Pressable>
        <Text>Apply</Text>
      </Pressable>
    </View>
  );
}
