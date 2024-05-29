import { StyleSheet, View, Text } from "react-native";

export default function QueueItems() {
  return (
    <View style={styles.container}>
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Dine In</Text>
        <View style={styles.queueItemsContainer}>
          <View style={styles.queueItem}>
            <Text style={styles.queueItemTextStyles}>Order No. 23 Ivan</Text>
            <Text style={styles.queueItemTextStyles}>Elapsed Time: 2345</Text>
          </View>
        </View>
      </View>
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Take Out</Text>
        <View style={styles.queueItemsContainer}>
          <View style={styles.queueItem}>
            <Text style={styles.queueItemTextStyles}>Order No. 23 Ivan</Text>
            <Text style={styles.queueItemTextStyles}>Elapsed Time: 2345</Text>
          </View>
        </View>
      </View>
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Foodpanda/Grab</Text>
        <View style={styles.queueItemsContainer}>
          <View style={styles.queueItem}>
            <Text style={styles.queueItemTextStyles}>Order No. 23 Ivan</Text>
            <Text style={styles.queueItemTextStyles}>Elapsed Time: 2345</Text>
          </View>
        </View>
      </View>
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Facebook</Text>
        <View style={styles.queueItemsContainer}>
          <View style={styles.queueItem}>
            <Text style={styles.queueItemTextStyles}>Order No. 23 Ivan</Text>
            <Text style={styles.queueItemTextStyles}>Elapsed Time: 2345</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "100%",
  },
  ordermodeContainer: {
    marginTop: 25,
    flexDirection: "column",
    width: "25%",
  },
  queueItemsContainer: {
    marginTop: 10,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  queueItem: {
    width: "80%",
    height: 150,
    backgroundColor: "#FF5C00",
    borderRadius: 20,
  },
  ordermodeTextStyles: {
    marginLeft: 35,
    fontWeight: "bold",
    fontSize: 18,
  },
  queueItemTextStyles: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
