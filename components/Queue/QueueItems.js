import { StyleSheet, View, Text, Pressable } from "react-native";

export default function QueueItems({setVoidQueueItem, setOpenQueueItem}) {
  const handleVoidQueueItem = () => {
    setVoidQueueItem(true); 
    console.log("Void item!"); 
  }
  const handleOpenQueueItem = () => {
    setOpenQueueItem(true); 
    console.log("Open Item!"); 
  }

  return (
    <View style={styles.container}>
      {/*Dine in*/}
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Dine In</Text>
        <View style={styles.queueItemsContainer}>
          <View style={styles.queueItem}>
            <View style={styles.queueItemDetailsContainer}>
            <Text style={styles.queueItemTextStyles}>Order No. 23 Ivan</Text>
            <Text style={styles.queueItemTextStyles}>Elapsed Time: 23:45</Text>
            </View>
            <View style={styles.horizontalLine}/>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.voidButton} onPress={handleVoidQueueItem}>
                <Text style={styles.buttonText}>Void</Text>
              </Pressable>
              <Pressable style={styles.openButton} onPress={handleOpenQueueItem}>
                <Text style={styles.buttonText}>Open</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      {/*Take Out*/}
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Take Out</Text>
        <View style={styles.queueItemsContainer}>
          <View style={styles.queueItem}>
            <View style={styles.queueItemDetailsContainer}>
            <Text style={styles.queueItemTextStyles}>Order No. 23 Ivan</Text>
            <Text style={styles.queueItemTextStyles}>Elapsed Time: 23:45</Text>
            </View>
            <View style={styles.horizontalLine}/>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.voidButton} onPress={handleVoidQueueItem}>
                <Text style={styles.buttonText}>Void</Text>
              </Pressable>
              <Pressable style={styles.openButton} onPress={handleOpenQueueItem}>
                <Text style={styles.buttonText}>Open</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      {/*Foodpanda/Grab*/}
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Foodpanda/Grab</Text>
        <View style={styles.queueItemsContainer}>
          <View style={styles.queueItem}>
            <View style={styles.queueItemDetailsContainer}>
            <Text style={styles.queueItemTextStyles}>Order No. 23 Ivan</Text>
            <Text style={styles.queueItemTextStyles}>Elapsed Time: 23:45</Text>
            </View>
            <View style={styles.horizontalLine}/>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.voidButton} onPress={handleVoidQueueItem}>
                <Text style={styles.buttonText}>Void</Text>
              </Pressable>
              <Pressable style={styles.openButton} onPress={handleOpenQueueItem}>
                <Text style={styles.buttonText}>Open</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      {/*Facebook*/}
      <View style={styles.ordermodeContainer}>
        <Text style={styles.ordermodeTextStyles}>Facebook</Text>
        <View style={styles.queueItemsContainer}>
          <View style={styles.queueItem}>
            <View style={styles.queueItemDetailsContainer}>
            <Text style={styles.queueItemTextStyles}>Order No. 23 Ivan</Text>
            <Text style={styles.queueItemTextStyles}>Elapsed Time: 23:45</Text>
            </View>
            <View style={styles.horizontalLine}/>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.voidButton} onPress={handleVoidQueueItem}>
                <Text style={styles.buttonText}>Void</Text>
              </Pressable>
              <Pressable style={styles.openButton} onPress={handleOpenQueueItem}>
                <Text style={styles.buttonText}>Open</Text>
              </Pressable>
            </View>
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
    width: "90%",
    height: 150,
    backgroundColor: "#FF5C00",
    borderRadius: 20,
    justifyContent: 'center',
  },
  queueItemDetailsContainer: {
    width: '100%', 
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row', 
    height: 40, 
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  voidButton: {
    backgroundColor: '#FF5C00', 
    borderColor: '#FFFFFF',
    borderWidth: 1,
    height: '100%', 
    width: 80, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  openButton: {
    height: '100%', 
    width: 80, 
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
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
  },
  buttonText: {
    fontWeight: 'bold', 
    fontSize: 15, 
    textAlign: 'center', 
    color: '#FFFFFF',
  },
  horizontalLine: {
    height: 1, 
    width: '100%', 
    backgroundColor: '#FFFFFF',
    marginTop: 15,
  }
});
