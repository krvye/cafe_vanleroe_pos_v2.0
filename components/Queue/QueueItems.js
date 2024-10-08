import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
// import { useState } from "react"; 
// import CountDown from 'react-native-countdown-component';

export default function QueueItems({
  setOpenQueueItem,
  inprogressDineInfo,
  inprogressTakeOutInfo,
  inprogressGrabFpInfo,
  inprogressFbInfo,
  setSelectedOrder,
  handleVoidOrderStatus, 
}) {
  // For handling timers 
  // const [isDineTimerDone, setIsDineTimerDone] = useState(inprogressDineInfo.map(() => false));
  // const [isTakeTimerDone, setIsTakeTimerDone] = useState(inprogressTakeOutInfo.map(() => false)); 
  // const [isFpGbTimerDone, setIsFpGbTimerDone] = useState(inprogressGrabFpInfo.map(() => false)); 
  // const [isFbTimerDone, setIsFbTimerDone] = useState(inprogressFbInfo.map(() => false)); 


  const handleOpenQueueItem = (order) => {
    setOpenQueueItem(true);
    setSelectedOrder(order); 
    console.log("Open Item!");
  };

  // Handle Dine In Timer
  // const handleDineTimer = (order) => {
  //   const updatedTimer = [...isDineTimerDone]; 
  //   updatedTimer[order] = true; 
  //   setIsDineTimerDone(updatedTimer); 
  // }
  // Handle Take out timer
  // const handleTakeTimer = (order) => {
  //   const updatedTimer = [...isTakeTimerDone]; 
  //   updatedTimer[order] = true; 
  //   setIsTakeTimerDone(updatedTimer); 
  // }
  // Handle FP and GB Timer
  // const handleFpGrabTimer = (order) => {
  //   const updatedTimer = [...isFpGbTimerDone]; 
  //   updatedTimer[order] = true; 
  //   setIsFpGbTimerDone(updatedTimer); 
  // }
  // Handle FB Timer
  // const handleFbTimer = (order) => {
  //   const updatedTimer = [...isFbTimerDone]; 
  //   updatedTimer[order] = true; 
  //   setIsFbTimerDone(updatedTimer); 
  // }
  
  // Convert elapsed time to seconds only
  // const convertTimeToSeconds = (time) => {
  //   const [minutes, seconds] = time.split(':').map(Number);
  //   return minutes * 60 + seconds;
  // };

  return (
    <View style={styles.container}>
      {/*Dine in*/}
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Dine In</Text>
        <ScrollView contentContainerStyle={styles.queueItemsContainer} showsHorizontalScrollIndicator={false}>
          {inprogressDineInfo.map((order, orderIndex) => {
            return (
              <View key={orderIndex} style={styles.queueItem}>
                <View style={styles.queueItemDetailsContainer}>
                  <Text style={styles.queueItemTextStyles}>
                    Order No. {order.orderNo} {order.orderTakenBy}
                  </Text>
                  <Text style={styles.queueItemTextStyles}>
                    Elapsed Time: 
                    {/* <CountDown
                    until={convertTimeToSeconds(order.elapsedTime)}
                    // size={15}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                    digitTxtStyle={{ color: isDineTimerDone[orderIndex] ? '#F44336' : '#0e0e0e'}}
                    separatorStyle={{color: isDineTimerDone[orderIndex] ? '#F44336' : '#0e0e0e'}}
                    onFinish={() => handleDineTimer(orderIndex)}
                  /> */}
                  </Text>
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
                    onPress={() => handleOpenQueueItem(order)}
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
        <ScrollView contentContainerStyle={styles.queueItemsContainer} showsHorizontalScrollIndicator={false}>
          {inprogressTakeOutInfo.map((order, orderIndex) => {
            return (
              <View key={orderIndex} style={styles.queueItem}>
                <View style={styles.queueItemDetailsContainer}>
                  <Text style={styles.queueItemTextStyles}>
                    Order No. {order.orderNo} {order.orderTakenBy}
                  </Text>
                  <Text style={styles.queueItemTextStyles}>
                    Elapsed Time: 
                    {/* <CountDown
                    until={convertTimeToSeconds(order.elapsedTime)}
                    // size={15}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                    digitTxtStyle={{ color: isTakeTimerDone[orderIndex] ? '#F44336' : '#0e0e0e'}}
                    separatorStyle={{color: isTakeTimerDone[orderIndex] ? '#F44336' : '#0e0e0e'}}
                    onFinish={() => handleTakeTimer(orderIndex)}
                  /> */}
                  </Text>
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
                    onPress={() => handleOpenQueueItem(order)}
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
        <ScrollView contentContainerStyle={styles.queueItemsContainer} showsHorizontalScrollIndicator={false}>
          {inprogressGrabFpInfo.map((order, orderIndex) => {
            return (
              <View key={orderIndex} style={styles.queueItem}>
                <View style={styles.queueItemDetailsContainer}>
                  <Text style={styles.queueItemTextStyles}>
                    Order No. {order.orderNo} {order.orderTakenBy}
                  </Text>
                  <Text style={styles.queueItemTextStyles}>
                    Elapsed Time: 
                    {/* <CountDown
                    until={convertTimeToSeconds(order.elapsedTime)}
                    // size={15}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                    digitTxtStyle={{ color: isFpGbTimerDone[orderIndex] ? '#F44336' : '#0e0e0e'}}
                    separatorStyle={{color: isFpGbTimerDone[orderIndex] ? '#F44336' : '#0e0e0e'}}
                    onFinish={() => handleFpGrabTimer(orderIndex)}
                  /> */}
                  </Text>
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
                    onPress={() => handleOpenQueueItem(order)}
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
        <ScrollView contentContainerStyle={styles.queueItemsContainer} showsHorizontalScrollIndicator={false}>
          {inprogressFbInfo.map((order, orderIndex) => {
            return (
              <View key={orderIndex} style={styles.queueItem}>
                <View style={styles.queueItemDetailsContainer}>
                  <Text style={styles.queueItemTextStyles}>
                    Order No. {order.orderNo} {order.orderTakenBy}
                  </Text>
                  <Text style={styles.queueItemTextStyles}>
                    Elapsed Time: 
                    {/* <CountDown
                    until={convertTimeToSeconds(order.elapsedTime)}
                    // size={15}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                    digitTxtStyle={{ color: isFbTimerDone[orderIndex] ? '#F44336' : '#0e0e0e'}}
                    separatorStyle={{color: isFbTimerDone[orderIndex] ? '#F44336' : '#0e0e0e'}}
                    onFinish={() => handleFbTimer(orderIndex)}
                  /> */}
                  </Text>
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
                    onPress={() => handleOpenQueueItem(order)}
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
    justifyContent: 'center',
    marginBottom: 15,
  },
  queueItemDetailsContainer: {
    width: '100%', 
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
    backgroundColor: '#F9BC4D', 
    borderColor: '#B66619',
    borderWidth: 1,
    height: '100%', 
    width: "40%", 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  openButton: {
    height: '100%', 
    width: "40%", 
    borderRadius: 20,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  ordermodeTextStyles: {
    marginLeft: 25,
    fontWeight: "bold",
    fontSize: 20,
  },
  queueItemTextStyles: {
    fontWeight: 500,
    fontSize: 18,
    marginLeft: 20,
    color: "#0e0e0e",
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 15,
    textAlign: "center",
    color: "#0e0e0e",
  },
  horizontalLine: {
    height: 1, 
    width: '100%', 
    backgroundColor: '#B66619',
    marginTop: 15,
  },
  voidButtonText: {
    fontWeight: 600,
    fontSize: 15,
    textAlign: "center",
    color: "#B66619",
  },
});
