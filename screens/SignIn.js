import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Button
        title="Sign In"
        onPress={() => {
          navigation.navigate("TabNavigator");
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
  input: {
    width: "80%",
    height: 40,
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
});
