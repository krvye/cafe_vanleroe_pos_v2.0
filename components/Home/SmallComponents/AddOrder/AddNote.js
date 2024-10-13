import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

export default function AddNote({ note, setNote }) {
  return (
    <>
      <Text style={styles.headerText}>Add note</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Type your note here.."
        placeholderTextColor={"#C2C2C2"}
        value={note}
        onChangeText={(text) => setNote(text)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#828487",
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E4E4E4",
    borderRadius: 15,
    padding: 15,
    height: 100,
    textAlignVertical: "top",
  },
});
