import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import itemCategories from "@utils/Home/SidebarFakeData";
import { Picker } from "@react-native-picker/picker";

export default function DrinksModal({ modalState, setModalState }) {
  return (
    <Modal visible={modalState} transparent={true}>
      <View style={styles.modalStyles}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Edit Item: Americano</Text>
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={() => {
                setModalState(false);
              }}
            />
          </View>

          <View style={styles.bottomBorder}></View>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
            }}
            style={styles.productImage}
          />

          <View style={styles.bottomBorder}></View>

          <Text style={styles.labelText}>Item Name</Text>

          <TextInput style={styles.bigInput} value={"Americano"} />

          <Text style={styles.labelText}>Category</Text>

          <Picker style={styles.bigInput}>
            {itemCategories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>

          <Text style={styles.priceLabelText}>Price</Text>

          <TextInput style={styles.bigInput} value={"120"} />

          <Text style={styles.priceLabelText}>Foodpanda Rates</Text>

          <TextInput style={styles.bigInput} value={"120"} />

          <Text style={styles.priceLabelText}>Grab Rates</Text>

          <TextInput style={styles.bigInput} value={"120"} />

          <View style={styles.bottomBorder}></View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setModalState(false);
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setModalState(false);
              }}
            >
              <Text style={styles.applyText}>Apply Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyles: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 50,
    backgroundColor: "white",
    maxHeight: "80%",
    width: "45%",
    borderRadius: 25,
    elevation: 5,
  },

  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
    marginTop: 20,
    marginBottom: 10,
  },

  productImage: {
    width: 210,
    height: 150,
    borderRadius: 15,
    alignSelf: "center",
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },

  labelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5A5A5A",
    marginLeft: 20,
  },
  bigInput: {
    height: 55,
    borderColor: "#E5E4E2",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    padding: 20,
  },

  priceLabelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5A5A5A",
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  smallInput: {
    height: 40,
    borderColor: "#E5E4E2",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    padding: 20,
    width: 100,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 50,
    gap: 10,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#F9BC4D",
    borderRadius: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },
  applyButton: {
    backgroundColor: "#F9BC4D",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 45,
  },
  cancelText: {
    color: "#F9BC4D",
    fontWeight: "600",
  },
  applyText: {
    fontWeight: "600",
  },
});
