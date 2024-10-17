import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";

export default function QueueItems({
  setOpenQueueItem,
  inprogressDineInfo,
  inprogressTakeOutInfo,
  inprogressGrabFpInfo,
  inprogressFbInfo,
  setSelectedOrder,
  handleVoidOrderStatus,
}) {
  // Timer states
  const [dineInCountdownTimer, setDineInCountdownTimer] = useState({});
  const [takeOutCountdownTimer, setTakeOutCountdownTimer] = useState({});
  const [grabFpCountdownTimer, setGrabFpCountdownTimer] = useState({});
  const [fbCountdownTimer, setFbCountdownTimer] = useState({});

  // Handler for open queue button
  const handleOpenQueueItem = (order, elapsedTimeValue) => {
    setOpenQueueItem(true);
    setSelectedOrder({ ...order, elapsedTimeValue });
    console.log("Open Item!");
  };

  // Countdown Elapse time
  useEffect(() => {
    // Dine in
    const dineInCountdown = inprogressDineInfo.map((order, index) => {
      const [minutes, seconds] = order.elapsedTime.split(":").map(Number);
      let totalSeconds = minutes * 60 + seconds;

      // Countdown
      const countdown = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds -= 1;
          // Convert to "mm:ss"
          const newMinutes = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(2, "0");
          const newSeconds = (totalSeconds % 60).toString().padStart(2, "0");

          setDineInCountdownTimer((prevTimers) => ({
            ...prevTimers,
            [index]: `${newMinutes}:${newSeconds}`,
          }));
        } else {
          clearInterval(countdown);
        }
      }, 1000);

      return countdown;
    });

    // Take out
    const takeOutCountdown = inprogressTakeOutInfo.map((order, index) => {
      const [minutes, seconds] = order.elapsedTime.split(":").map(Number);
      let totalSeconds = minutes * 60 + seconds;

      // Countdown
      const countdown = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds -= 1;
          // Convert to "mm:ss"
          const newMinutes = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(2, "0");
          const newSeconds = (totalSeconds % 60).toString().padStart(2, "0");

          setTakeOutCountdownTimer((prevTimers) => ({
            ...prevTimers,
            [index]: `${newMinutes}:${newSeconds}`,
          }));
        } else {
          clearInterval(countdown);
        }
      }, 1000);

      return countdown;
    });

    // Grab/FP
    const grabFpCountdown = inprogressGrabFpInfo.map((order, index) => {
      const [minutes, seconds] = order.elapsedTime.split(":").map(Number);
      let totalSeconds = minutes * 60 + seconds;

      // Countdown
      const countdown = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds -= 1;
          // Convert to "mm:ss"
          const newMinutes = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(2, "0");
          const newSeconds = (totalSeconds % 60).toString().padStart(2, "0");

          setGrabFpCountdownTimer((prevTimers) => ({
            ...prevTimers,
            [index]: `${newMinutes}:${newSeconds}`,
          }));
        } else {
          clearInterval(countdown);
        }
      }, 1000);

      return countdown;
    });

    const fbCountdown = inprogressFbInfo.map((order, index) => {
      const [minutes, seconds] = order.elapsedTime.split(":").map(Number);
      let totalSeconds = minutes * 60 + seconds;

      // Countdown
      const countdown = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds -= 1;
          // Convert to "mm:ss"
          const newMinutes = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(2, "0");
          const newSeconds = (totalSeconds % 60).toString().padStart(2, "0");

          setFbCountdownTimer((prevTimers) => ({
            ...prevTimers,
            [index]: `${newMinutes}:${newSeconds}`,
          }));
        } else {
          clearInterval(countdown);
        }
      }, 1000);

      return countdown;
    });

    return () => {
      dineInCountdown.forEach((countdown) => clearInterval(countdown));
      takeOutCountdown.forEach((countdown) => clearInterval(countdown));
      grabFpCountdown.forEach((countdown) => clearInterval(countdown));
      fbCountdown.forEach((countdown) => clearInterval(countdown));
    };
  }, [
    inprogressDineInfo,
    inprogressTakeOutInfo,
    inprogressGrabFpInfo,
    inprogressFbInfo,
  ]);

  return (
    <View style={styles.container}>
      {/*Dine in*/}
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Dine In</Text>
        <ScrollView
          contentContainerStyle={styles.queueItemsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {inprogressDineInfo.map((order, orderIndex) => {
            return (
              <View key={orderIndex} style={styles.queueItem}>
                <View style={styles.queueItemDetailsContainer}>
                  <Text style={styles.queueItemTextStyles}>
                    Order No.: {order.orderNo}
                  </Text>
                  <Text style={styles.queueItemTextStyles}>
                    Order Taken By: {order.orderTakenBy}
                  </Text>
                  {dineInCountdownTimer[orderIndex] === "00:00" ? (
                    <Text style={styles.queueItemRedStyle}>
                      Elapsed Time:{" "}
                      {dineInCountdownTimer[orderIndex] || order.elapsedTime}
                    </Text>
                  ) : (
                    <Text style={styles.queueItemTextStyles}>
                      Elapsed Time:{" "}
                      {dineInCountdownTimer[orderIndex] || order.elapsedTime}
                    </Text>
                  )}
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={styles.voidButton}
                    onPress={() => handleVoidOrderStatus(order.doc_id)}
                  >
                    <Text style={styles.voidButtonText}>Void</Text>
                  </Pressable>
                  <Pressable
                    style={styles.openButton}
                    onPress={() =>
                      handleOpenQueueItem(
                        order,
                        dineInCountdownTimer[orderIndex] || order.elapsedTime
                      )
                    }
                  >
                    <Text style={styles.buttonText}>Open</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/*Take Out*/}
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Take Out</Text>
        <ScrollView
          contentContainerStyle={styles.queueItemsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {inprogressTakeOutInfo.map((order, orderIndex) => {
            return (
              <View key={orderIndex} style={styles.queueItem}>
                <View style={styles.queueItemDetailsContainer}>
                  <Text style={styles.queueItemTextStyles}>
                    Order No.: {order.orderNo}
                  </Text>
                  <Text style={styles.queueItemTextStyles}>
                    Order Taken By: {order.orderTakenBy}
                  </Text>
                  {takeOutCountdownTimer[orderIndex] === "00:00" ? (
                    <Text style={styles.queueItemRedStyle}>
                      Elapsed Time:{" "}
                      {takeOutCountdownTimer[orderIndex] || order.elapsedTime}
                    </Text>
                  ) : (
                    <Text style={styles.queueItemTextStyles}>
                      Elapsed Time:{" "}
                      {takeOutCountdownTimer[orderIndex] || order.elapsedTime}
                    </Text>
                  )}
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={styles.voidButton}
                    onPress={() => handleVoidOrderStatus(order.doc_id)}
                  >
                    <Text style={styles.voidButtonText}>Void</Text>
                  </Pressable>
                  <Pressable
                    style={styles.openButton}
                    onPress={() =>
                      handleOpenQueueItem(
                        order,
                        takeOutCountdownTimer[orderIndex] || order.elapsedTime
                      )
                    }
                  >
                    <Text style={styles.buttonText}>Open</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/*Foodpanda/Grab*/}
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Foodpanda/Grab</Text>
        <ScrollView
          contentContainerStyle={styles.queueItemsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {inprogressGrabFpInfo.map((order, orderIndex) => {
            return (
              <View key={orderIndex} style={styles.queueItem}>
                <View style={styles.queueItemDetailsContainer}>
                  <Text style={styles.queueItemTextStyles}>
                    Order No.: {order.orderNo}
                  </Text>
                  <Text style={styles.queueItemTextStyles}>
                    Order Taken By: {order.orderTakenBy}
                  </Text>
                  {grabFpCountdownTimer[orderIndex] === "00:00" ? (
                    <Text style={styles.queueItemRedStyle}>
                      Elapsed Time:{" "}
                      {grabFpCountdownTimer[orderIndex] || order.elapsedTime}
                    </Text>
                  ) : (
                    <Text style={styles.queueItemTextStyles}>
                      Elapsed Time:{" "}
                      {grabFpCountdownTimer[orderIndex] || order.elapsedTime}
                    </Text>
                  )}
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={styles.voidButton}
                    onPress={() => handleVoidOrderStatus(order.doc_id)}
                  >
                    <Text style={styles.voidButtonText}>Void</Text>
                  </Pressable>
                  <Pressable
                    style={styles.openButton}
                    onPress={() =>
                      handleOpenQueueItem(
                        order,
                        grabFpCountdownTimer[orderIndex] || order.elapsedTime
                      )
                    }
                  >
                    <Text style={styles.buttonText}>Open</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/*Facebook*/}
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Facebook</Text>
        <ScrollView
          contentContainerStyle={styles.queueItemsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {inprogressFbInfo.map((order, orderIndex) => {
            return (
              <View key={orderIndex} style={styles.queueItem}>
                <View style={styles.queueItemDetailsContainer}>
                  <Text style={styles.queueItemTextStyles}>
                    Order No.: {order.orderNo}
                  </Text>
                  <Text style={styles.queueItemTextStyles}>
                    Order Taken By: {order.orderTakenBy}
                  </Text>
                  {fbCountdownTimer[orderIndex] === "00:00" ? (
                    <Text style={styles.queueItemRedStyle}>
                      Elapsed Time:{" "}
                      {fbCountdownTimer[orderIndex] || order.elapsedTime}
                    </Text>
                  ) : (
                    <Text style={styles.queueItemTextStyles}>
                      Elapsed Time:{" "}
                      {fbCountdownTimer[orderIndex] || order.elapsedTime}
                    </Text>
                  )}
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={styles.voidButton}
                    onPress={() => handleVoidOrderStatus(order.doc_id)}
                  >
                    <Text style={styles.voidButtonText}>Void</Text>
                  </Pressable>
                  <Pressable
                    style={styles.openButton}
                    onPress={() =>
                      handleOpenQueueItem(
                        order,
                        fbCountdownTimer[orderIndex] || order.elapsedTime
                      )
                    }
                  >
                    <Text style={styles.buttonText}>Open</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>
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
    height: 850,
  },
  queueItemsContainer: {
    marginTop: 10,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  queueItem: {
    width: "90%",
    height: 170,
    backgroundColor: "#F9BC4D",
    borderRadius: 15,
    justifyContent: "center",
    marginBottom: 15,
  },
  queueItemDetailsContainer: {
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    height: "25%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  voidButton: {
    backgroundColor: "#F9BC4D",
    borderColor: "#B66619",
    borderWidth: 1,
    height: "100%",
    width: "40%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    height: "100%",
    width: "40%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  ordermodeTextStyles: {
    marginLeft: 25,
    fontWeight: "600",
    fontSize: 20,
  },
  queueItemTextStyles: {
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 20,
    color: "#0e0e0e",
  },
  queueItemRedStyle: {
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 20,
    color: "#F44336",
  },
  buttonText: {
    fontWeight: "500",
    fontSize: 15,
    textAlign: "center",
    color: "#0e0e0e",
  },
  horizontalLine: {
    height: 1,
    width: "100%",
    backgroundColor: "#B66619",
    marginTop: 15,
  },
  voidButtonText: {
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
    color: "#B66619",
  },
});
