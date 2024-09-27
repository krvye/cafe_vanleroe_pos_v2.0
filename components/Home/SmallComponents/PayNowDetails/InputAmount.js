import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { light } from "@mui/material/styles/createPalette";
import { useState } from "react";

export default function InputAmount() {
  const [amount, setAmount] = useState("");

  const addToAmount = (num) => {
    setAmount((prevAmount) => prevAmount + num.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Input amount</Text>
      <Text style={styles.amountInput}>{amount}</Text>

      <View style={styles.inputSection}>
        <TouchableOpacity
          style={styles.inputLightBlock}
          onPress={() => {
            addToAmount(1);
          }}
        >
          <Text style={styles.boldText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputLightBlock}
          onPress={() => {
            addToAmount(2);
          }}
        >
          <Text style={styles.boldText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputLightBlock}
          onPress={() => {
            addToAmount(3);
          }}
        >
          <Text style={styles.boldText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputDarkBlock}
          onPress={() => {
            addToAmount(10);
          }}
        >
          <Text style={styles.blueText}>10</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputSection}>
        <TouchableOpacity
          style={styles.inputLightBlock}
          onPress={() => {
            addToAmount(4);
          }}
        >
          <Text style={styles.boldText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputLightBlock}
          onPress={() => {
            addToAmount(5);
          }}
        >
          <Text style={styles.boldText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputLightBlock}
          onPress={() => {
            addToAmount(6);
          }}
        >
          <Text style={styles.boldText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputDarkBlock}
          onPress={() => {
            addToAmount(20);
          }}
        >
          <Text style={styles.blueText}>20</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputSection}>
        <TouchableOpacity
          style={styles.inputLightBlock}
          onPress={() => {
            addToAmount(7);
          }}
        >
          <Text style={styles.boldText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputLightBlock}
          onPress={() => {
            addToAmount(8);
          }}
        >
          <Text style={styles.boldText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputLightBlock}
          onPress={() => {
            addToAmount(9);
          }}
        >
          <Text style={styles.boldText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputOrangeBlock}
          onPress={() => {
            setAmount((prevAmount) => prevAmount.slice(0, -1));
          }}
        >
          <MaterialIcons name="backspace" size={28} color="#EA4F3B" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputSection}>
        <TouchableOpacity
          style={styles.inputOrangeBlock}
          onPress={() => {
            setAmount("");
          }}
        >
          <Text style={styles.orangeText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputLightBlock}
          onPress={() => {
            addToAmount(0);
          }}
        >
          <Text style={styles.boldText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputLightBlock}
          onPress={() => {
            addToAmount(".");
          }}
        >
          <Text style={styles.boldText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputLightBlock}>
          <Text style={styles.lightText}>Add</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.confirmButton}>
        <MaterialIcons name="check" size={24} color="white" />
        <Text style={styles.buttonText}>Confirm Payment Method</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.printButton}>
        <MaterialIcons name="check" size={24} color="white" />
        <Text style={styles.buttonText}>Complete and Print Receipt</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#19191C",
  },
  amountInput: {
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderRadius: 60,
    paddingVertical: 15,
    paddingHorizontal: 15,
    textAlign: "center",
    fontSize: 16,
    color: "#C2C2C2",
    marginTop: 15,
  },

  inputSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    gap: 15,
  },
  inputLightBlock: {
    backgroundColor: "#F8F9FD",
    paddingVertical: 15,
    flex: 1,
    borderRadius: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  inputDarkBlock: {
    backgroundColor: "#ECF6FF",
    paddingVertical: 15,
    flex: 1,
    borderRadius: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  inputOrangeBlock: {
    backgroundColor: "#FFF1EF",
    paddingVertical: 15,
    flex: 1,
    borderRadius: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  boldText: {
    fontWeight: "600",
    fontSize: 28,
    color: "#19191C",
  },
  lightText: {
    fontWeight: "400",
    fontSize: 28,
    color: "#19191C",
  },
  orangeText: {
    fontWeight: "600",
    fontSize: 28,
    color: "#B66619",
  },
  blueText: {
    fontWeight: "600",
    fontSize: 28,
    color: "#0B57A0",
  },

  confirmButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#19191C",
    borderRadius: 15,
    paddingVertical: 10,
    gap: 10,
    marginBottom: 15,
  },
  printButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B66619",
    borderRadius: 15,
    paddingVertical: 10,
    gap: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
