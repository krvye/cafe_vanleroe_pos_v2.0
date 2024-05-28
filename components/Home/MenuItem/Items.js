import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import itemData from "../../../utils/Home/ItemData";

export default function Items() {
  const styles = makeStyles(useWindowDimensions().height);
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      nestedScrollEnabled={true}
    >
      {itemData.map((item, index) => (
        <View style={styles.productContainer} key={index}>
          <Image source={item.image} style={styles.productImage} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const makeStyles = (height) =>
  StyleSheet.create({
    container: { maxHeight: height * 0.6, marginVertical: 20 },
    contentContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    productContainer: {
      alignItems: "center",
      paddingVertical: 20,
    },
    productImage: {
      width: 200,
      height: 150,
      borderRadius: 15,
    },
    productName: {
      fontSize: 16,
      color: "#19191C",
      fontWeight: "600",
    },
    productPrice: {
      fontSize: 16,
      color: "#FF5C00",
      fontWeight: "600",
    },
  });
