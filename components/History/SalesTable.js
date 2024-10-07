import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function SalesTable({
  salesInfo,
  orderModeInfo,
  modeOfPaymentInfo,
}) {
  const [visibleItems, setVisibleItems] = useState({});

  const handleVisibleItems = (index) => {
    setVisibleItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Map orderModeDesc from ORDER_MODE
  const getOrderMode = (orderModeCode) => {
    const orderModeData = orderModeInfo.find(
      (item) => item.orderModeCode === orderModeCode
    );
    return orderModeData ? orderModeData.orderModeDesc : " ";
  };

  // Map modeOfPaymentDesc from MODE_OF_PAYMENT
  const getModeOfPayment = (modeOfPaymentCode) => {
    const modeOfPaymentData = modeOfPaymentInfo.find(
      (item) => item.paymentMethodCode === modeOfPaymentCode
    );

<<<<<<< HEAD
    return modeOfPaymentData ? modeOfPaymentData.paymentMethodDesc : "";
  };
=======
  // Convert to 12-hour time format 
  /*const convertToTwelveHour = (time) => {
    let [hour, minute] = time.split(':').map(Number);; 
    let period = 'AM'; 
>>>>>>> 6cd5d76c8d19734eee552fb706a0eb279d0631ce

  // Convert to 12-hour time format
  // const convertToTwelveHour = (time) => {
  //   let [hour, minute] = time.split(':').map(Number);;
  //   let period = 'AM';

  //   if (hour >= 12) {
  //     period = 'PM';
  //   }

<<<<<<< HEAD
  //   if (hour === 0) {
  //     hour = 12;
  //   } else if (hour > 12) {
  //     hour -= 12;
  //   }

  //   return `${hour}:${minute < 10 ? '0':''}${minute} ${period}`;
  // }
=======
    return `${hour}:${minute < 10 ? '0':''}${minute} ${period}`; 
  }*/
>>>>>>> 6cd5d76c8d19734eee552fb706a0eb279d0631ce

  const renderItem = ({ item, index }) => {
    const orderedItems = Array.isArray(item.orderItems)
      ? item.orderItems
          .map(({ itemName, itemQuantity }) => `${itemQuantity} - ${itemName}`)
          .join("\n")
      : item.orderItems;

    const paymentMethods = item.paymentMethods.map(
      (method) => method.modeOfPayment
    ).join(',');


    return (
      <View style={styles.row}>
<<<<<<< HEAD
        <Text style={[styles.dataText, { width: 300 }]}>
          {item.orderTakenBy}
        </Text>
        {/* <Text style={[styles.dataText, { width: 100 }]}>{convertToTwelveHour(item.elapsedTime)}</Text> */}
        {/* <Text style={[styles.dataText, { width: 180 }]}>{item.branch}</Text> */}
        <Text style={[styles.dataText, { width: 230 }]}>{getModeOfPayment(paymentMethods)}</Text>
        <Text style={[styles.dataText, { width: 150 }]}>
          {getOrderMode(item.orderMode)}
        </Text>
        <Text style={[styles.dataText, { width: 180 }]}>
          {Object.values(item.orderItems).reduce(
            (total, item) => total + item.itemQuantity,
            0
          )}
        </Text>

        {Array.isArray(item.orderItems) ? (
            <Text style={[styles.dataText, { width: 280 }]}>
              {visibleItems[index]
                ? orderedItems
                : `${item.orderItems[0].itemQuantity} - ${item.orderItems[0].itemName} \n`}
            </Text>
        ) : (
          <Text style={[styles.dataText, { width: 280 }]}>{orderedItems}
          </Text>
        )}

        <Text style={[styles.dataText, { width: 100 }]}>
          ₱ {item.totalAmount}
        </Text>
=======
        <Text style={[styles.dataText, { width: 200 }]}>
          {item.customerName}
        </Text>
        {/*<Text style={[styles.dataText, { width: 80 }]}>{convertToTwelveHour(item.orderTime)}</Text>*/}
        {/* <Text style={[styles.dataText, { width: 180 }]}>{item.branch}</Text> */}
        <Text style={[styles.dataText, { width: 150 }]}>
          {getModeOfPayment(item.modeOfPayment)}
        </Text>
        <Text style={[styles.dataText, { width: 120 }]}>{getOrderMode(item.orderMode)}</Text>
        <Text style={[styles.dataText, { width: 100 }]}>
          {Object.values(item.orderItems).reduce((total, item) => total + item.itemQuantity, 0)}
        </Text>

        {Array.isArray(item.orderItems) ? (
          <Text style={[styles.dataText, { width: 200 }]}>
            {visibleItems[index] ? orderedItems : `${item.orderItems[0].itemQuantity} - ${item.orderItems[0].itemName}`}
          </Text>
        ) : (
          <Text style={[styles.dataText, { width: 200 }]}>{orderedItems}</Text>
        )}

        <Text style={[styles.dataText, { width: 80 }]}>₱ {item.totalAmount}</Text>
>>>>>>> 6cd5d76c8d19734eee552fb706a0eb279d0631ce

        {item.orderItems.length > 1 ? (
          <Pressable
            style={styles.eyeIconCon}
            onPress={() => handleVisibleItems(index)}
          >
            {visibleItems[index] ? (
              <Ionicons name="eye" size={24} color="#B66619" />
            ) : (
              <Ionicons name="eye-off" size={24} color="#B66619" />
            )}
          </Pressable>
        ) : (
          <View />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <ScrollView horizontal style={{ borderRadius: 5, width: "98%" }}>
=======
      <ScrollView
        horizontal
        style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
      >
>>>>>>> 6cd5d76c8d19734eee552fb706a0eb279d0631ce
        <View style={styles.listContainer}>
          <View style={styles.header}>
            <Text style={[styles.headerText, { width: 200 }]}>
              Customer Name
            </Text>
<<<<<<< HEAD
            {/* <Text style={[styles.headerText, { width: 100 }]}>Time</Text> */}
            {/* <Text style={[styles.headerText, { width: 180 }]}>Branch</Text> */}
            <Text style={[styles.headerText, { width: 230 }]}>
=======
            <Text style={[styles.headerText, { width: 80 }]}>Time</Text>
            {/* <Text style={[styles.headerText, { width: 180 }]}>Branch</Text> */}
            <Text style={[styles.headerText, { width: 150 }]}>
>>>>>>> 6cd5d76c8d19734eee552fb706a0eb279d0631ce
              Mode of Payment
            </Text>
            <Text style={[styles.headerText, { width: 120 }]}>Order Mode</Text>
            <Text style={[styles.headerText, { width: 100 }]}>
              No. of Ordered Items
            </Text>
<<<<<<< HEAD
            <Text style={[styles.headerText, { width: 280 }]}>
=======
            <Text style={[styles.headerText, { width: 200 }]}>
>>>>>>> 6cd5d76c8d19734eee552fb706a0eb279d0631ce
              Ordered Items
            </Text>
            <Text style={[styles.headerText, { width: 80 }]}>Price</Text>
            <Text style={[styles.headerText, { width: 80 }]}></Text>
          </View>
          <View style={styles.rowContainer}>
            <FlatList
              data={salesInfo}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 25,
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    flex: 1,
    borderRadius: 5,
  },
  header: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "#F9BC4D",
    alignItems: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "#fbfbfa",
    alignItems: "center",
  },
  headerText: {
    fontWeight: 500,
    textAlign: "center",
  },
  dataText: {
    fontSize: 15,
    textAlign: "center",
  },
  rowContainer: {
    height: 420,
    borderBottomEndRadius: 5,
  },
  eyeIconCon: {
    alignItems: "center",
  },
});
