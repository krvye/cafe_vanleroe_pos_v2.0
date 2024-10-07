import {
  StyleSheet,
  View,
  Modal,
  Text,
  Pressable,
  ScrollView,
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import OrderDetails from "./OrderDetails";

export default function QueueItemModal({
  openQueueItem,
  setOpenQueueItem,
  selectedOrder,
  orderStatusInfo,
  addOnsInfo,
  noteTemplatesInfo,
  handleDoneOrderStatus,
  handleVoidOrderStatus,
}) {
  const getOrderStatusDesc = (orderStatusCode) => {
    const orderStatus = orderStatusInfo.find(
      (order) => order.orderStatusCode === orderStatusCode
    );
    return orderStatus ? orderStatus.orderStatusDesc : " ";
  };

  // Convert elapsed time to seconds only
  const convertTimeToSeconds = (time) => {
    // const [minutes, seconds] = time.split(':').map(Number);
    // return minutes * 60 + seconds;
    return time;
  };

  const orderElapsedTime = selectedOrder?.elapsedTime;
  const convertTime = convertTimeToSeconds(orderElapsedTime);
  console.log(convertTime);

  return (
    <Modal visible={openQueueItem} transparent={true}>
      <View style={styles.container}>
        <View style={styles.queueItemContainer}>
          <View style={styles.headerContainer}>
            <Ionicons name="arrow-back-outline" size={25} color="#19191C" />
            <Text style={styles.headerText}>
              Order No. {selectedOrder?.orderNo}{" "}
              {getOrderStatusDesc(selectedOrder?.orderStatus)} -{" "}
              {selectedOrder?.orderTakenBy}
            </Text>
            <Pressable onPress={() => setOpenQueueItem(false)}>
              <AntDesign name="close" size={25} color="#19191C" />
            </Pressable>
          </View>

          <View style={styles.mainQueueDetailsContainer}>
            <Text style={styles.elapsedTimeText}>
              Elapsed Time: {selectedOrder?.elapsedTime}
              {/* <CountDown
                    until={convertTimeToSeconds(selectedOder?.elapsedTime)}
                    // size={15}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                    digitTxtStyle={{ color: isTimerDone ? '#F44336' : '#828487'}}
                    separatorStyle={{color: isTimerDone ? '#F44336' : '#828487'}}
                    onFinish={() => setIsTimerDone(true)}
                  /> */}
            </Text>
            <ScrollView style={styles.orderItemContainer}>
              <OrderDetails
                selectedOrder={selectedOrder}
                addOnsInfo={addOnsInfo}
                noteTemplatesInfo={noteTemplatesInfo}
              />
            </ScrollView>
          </View>

          <View style={styles.doneAndVoidButtonContainer}>
            <Pressable
              onPress={() => handleVoidOrderStatus(selectedOrder.doc_id)}
              style={styles.voidAllButton}
            >
              <Text style={styles.voidAllText}>Void All</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                handleDoneOrderStatus(selectedOrder.doc_id);
              }}
              style={styles.allDoneButton}
            >
              <Text style={styles.allDoneText}>Mark All as Done</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  queueItemContainer: {
    height: "65%",
    width: "60%",
    backgroundColor: "#FFFFFF",
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 20,
  },
  headerContainer: {
    width: "100%",
    height: 50,
    borderColor: "#E4E4E4",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerText: {
    fontWeight: 600,
    fontSize: 20,
  },
  mainQueueDetailsContainer: {
    flexDirection: "column",
    width: "100%",
    height: "60%",
    marginTop: 20,
  },
  elapsedTimeText: {
    color: "#828487",
    fontSize: 20,
    fontWeight: 500,
    marginLeft: 45,
  },
  orderItemContainer: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    marginTop: 20,
  },
  doneAndVoidButtonContainer: {
    marginTop: 20,
    width: "100%",
    height: "20%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  voidAllButton: {
    height: "40%",
    width: "40%",
    borderColor: "#B66619",
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  allDoneButton: {
    height: "40%",
    width: "40%",
    backgroundColor: "#F9BC4D",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  voidAllText: {
    color: "#B66619",
    fontSize: 16,
    fontWeight: 600,
  },
  allDoneText: {
    color: "#0e0e0e",
    fontSize: 16,
    fontWeight: 600,
  },
});
