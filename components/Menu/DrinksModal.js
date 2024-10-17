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
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import { retrieveItemCategory } from "../../services/firebase/Home/retrieveItemCategory";

import { UpdateDrinks } from "../../services/firebase/Menu/updateDrinks";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imgDB } from "../../services/firebase/firebaseConfig";
import { launchImageLibrary } from "react-native-image-picker";

export default function DrinksModal({
  modalState,
  setModalState,
  selectedItem,
}) {
  console.log("Selected Item: ", selectedItem);
  const itemCategories = retrieveItemCategory();

  const [imageUrl, setImageUrl] = useState(null);
  const [localImageUri, setLocalImageUri] = useState(null);
  const [productName, setProductName] = useState("");
  const [amountSmall, setAmountSmall] = useState("");
  const [amountMedium, setAmountMedium] = useState("");
  const [amountLarge, setAmountLarge] = useState("");
  const [fpAmountSmall, setFpAmountSmall] = useState("");
  const [fpAmountMedium, setFpAmountMedium] = useState("");
  const [fpAmountLarge, setFpAmountLarge] = useState("");
  const [grabAmountSmall, setGrabAmountSmall] = useState("");
  const [grabAmountMedium, setGrabAmountMedium] = useState("");
  const [grabAmountLarge, setGrabAmountLarge] = useState("");

  const [selectedItemCategory, setSelectedItemCategory] = useState("");


  const handleUploadPhoto = () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
        return;
      } else if (response.errorCode) {
        console.log("Image Picker Error: ", response.errorMessage);
        return;
      } else if (response.assets && response.assets.length > 0) {
        const file = response.assets[0];

        // Set the local image URI for preview
        setLocalImageUri(file.uri);

        // Check if the file size exceeds 1MB (1MB = 1048576 bytes)
        const maxFileSize = 1048576; // 1MB in bytes
        if (file.fileSize > maxFileSize) {
          Alert.alert("File size exceeds 1MB. Please select a smaller image.");
          return;
        }

        // Define the Firebase Storage reference
        const fileName = file.fileName;
        const storageRef = ref(imgDB, `PRF/${fileName}`);

        // Upload the file to Firebase Storage
        fetch(file.uri)
          .then((res) => res.blob()) // Convert image URI to blob for Firebase upload
          .then((blob) => {
            uploadBytes(storageRef, blob)
              .then((snapshot) => {
                console.log("Image uploaded successfully");

                // Get the download URL of the uploaded image
                getDownloadURL(snapshot.ref)
                  .then((downloadURL) => {
                    setImageUrl(downloadURL); // Set the Firebase image URL for display
                    console.log("Download URL:", downloadURL);
                  })
                  .catch((error) => {
                    console.error("Error getting download URL:", error);
                  });
              })
              .catch((error) => {
                console.error("Error uploading image:", error);
              });
          });
      }
    });
  };


  const handleApplyChanges = async () => {
    setModalState(false);

    const updateImageUrl = imageUrl || selectedItem.image;
    const updateProductName = productName || selectedItem.productName;
    const updateCategory = selectedItemCategory;

    const updateAmountSmall =
      amountSmall !== "" ? parseFloat(amountSmall) : selectedItem.amountSmall;
    const updateAmountMedium =
      amountMedium !== ""
        ? parseFloat(amountMedium)
        : selectedItem.amountMedium;
    const updateAmountLarge =
      amountLarge !== "" ? parseFloat(amountLarge) : selectedItem.amountLarge;

    const updateFpAmountSmall =
      fpAmountSmall !== ""
        ? parseFloat(fpAmountSmall)
        : selectedItem.fpAmountSmall;
    const updateFpAmountMedium =
      fpAmountMedium !== ""
        ? parseFloat(fpAmountMedium)
        : selectedItem.fpAmountMedium;
    const updateFpAmountLarge =
      fpAmountLarge !== ""
        ? parseFloat(fpAmountLarge)
        : selectedItem.fpAmountLarge;

    const updateGrabAmountSmall =
      grabAmountSmall !== ""
        ? parseFloat(grabAmountSmall)
        : selectedItem.grabAmountSmall;
    const updateGrabAmountMedium =
      grabAmountMedium !== ""
        ? parseFloat(grabAmountMedium)
        : selectedItem.grabAmountMedium;
    const updateGrabAmountLarge =
      grabAmountLarge !== ""
        ? parseFloat(grabAmountLarge)
        : selectedItem.grabAmountLarge;

    console.log("Updated Category: ", updateCategory);

    await UpdateDrinks(
      selectedItem,
      updateImageUrl,
      updateProductName,
      updateCategory,
      updateAmountSmall,
      updateAmountMedium,
      updateAmountLarge,
      updateFpAmountSmall,
      updateFpAmountMedium,
      updateFpAmountLarge,
      updateGrabAmountSmall,
      updateGrabAmountMedium,
      updateGrabAmountLarge
    );

    setLocalImageUri("");
    setImageUrl("");
    setProductName("");
    setSelectedItemCategory("");
    setAmountSmall("");
    setAmountMedium("");
    setAmountLarge("");
    setFpAmountSmall("");
    setFpAmountMedium("");
    setFpAmountLarge("");
    setGrabAmountSmall("");
    setGrabAmountMedium("");
    setGrabAmountLarge("");
  };

  const handleCancelButton = () => {
    setModalState(false);

    setLocalImageUri("");
    setImageUrl("");
    setProductName("");
    setSelectedItemCategory("");
    setAmountSmall("");
    setAmountMedium("");
    setAmountLarge("");
    setFpAmountSmall("");
    setFpAmountMedium("");
    setFpAmountLarge("");
    setGrabAmountSmall("");
    setGrabAmountMedium("");
    setGrabAmountLarge("");
  };

  return (
    <Modal visible={modalState} transparent={true}>
      <View style={styles.modalStyles}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              Edit Item: {selectedItem.productName}
            </Text>
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

          <TouchableOpacity onPress={handleUploadPhoto}>
          <Image
            source={{
              uri: imageUrl || localImageUri || selectedItem.image,
            }}
            style={styles.productImage}
          />
          </TouchableOpacity>

          <View style={styles.bottomBorder}></View>

          <Text style={styles.labelText}>Item Name</Text>

          <TextInput
            style={styles.bigInput}
            placeholder={selectedItem.productName}
            value={productName || null}
            onChangeText={setProductName}
          />

          <Text style={styles.labelText}>Category</Text>

          <Picker
            style={styles.picker}
            selectedValue={selectedItemCategory || ""}
            onValueChange={setSelectedItemCategory}
          >
            {itemCategories.map((category, index) => (
              <Picker.Item
                key={index}
                label={category.itemCategoryDesc}
                value={category.itemCategoryCode}
              />
            ))}
          </Picker>

          <Text style={styles.priceLabelText}>Price</Text>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabelText}>Small</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.amountSmall}
                value={amountSmall || null}
                onChangeText={setAmountSmall}
              />
            </View>

            <View>
              <Text style={styles.priceLabelText}>Medium</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.amountMedium}
                value={amountMedium || null}
                onChangeText={setAmountMedium}
              />
            </View>

            <View>
              <Text style={styles.priceLabelText}>Large</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.amountLarge}
                value={amountLarge || null}
                onChangeText={setAmountLarge}
              />
            </View>
          </View>

          <Text style={styles.priceLabelText}>Foodpanda Rates</Text>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabelText}>Small</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.fpAmountSmall}
                value={fpAmountSmall || null}
                onChangeText={setFpAmountSmall}
              />
            </View>

            <View>
              <Text style={styles.priceLabelText}>Medium</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.fpAmountMedium}
                value={fpAmountMedium || null}
                onChangeText={setFpAmountMedium}
              />
            </View>

            <View>
              <Text style={styles.priceLabelText}>Large</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.fpAmountLarge}
                value={fpAmountLarge || null}
                onChangeText={setFpAmountLarge}
              />
            </View>
          </View>

          <Text style={styles.priceLabelText}>Grab Rates</Text>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabelText}>Small</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.grabAmountSmall}
                value={grabAmountSmall || null}
                onChangeText={setGrabAmountSmall}
              />
            </View>

            <View>
              <Text style={styles.priceLabelText}>Medium</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.grabAmountMedium}
                value={grabAmountMedium || null}
                onChangeText={setGrabAmountMedium}
              />
            </View>

            <View>
              <Text style={styles.priceLabelText}>Large</Text>
              <TextInput
                style={styles.smallInput}
                placeholder={selectedItem.grabAmountLarge}
                value={grabAmountLarge || null}
                onChangeText={setGrabAmountLarge}
              />
            </View>
          </View>

          <View style={styles.bottomBorder}></View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyChanges}
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
  picker: {
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
