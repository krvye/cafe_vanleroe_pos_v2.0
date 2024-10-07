import { StyleSheet, View } from "react-native";
import { useState } from "react";

import QueueItems from "../components/Queue/QueueItems";
import QueueItemModal from "../components/Queue/QueueItemModal";

export default function QueueScreen() {
  const [voidQueueItem, setVoidQueueItem] = useState(false);
  const [openQueueItem, setOpenQueueItem] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <View style={styles.container}>
      <QueueItems
        setVoidQueueItem={setVoidQueueItem}
        setOpenQueueItem={setOpenQueueItem}
      />
      <QueueItemModal
        openQueueItem={openQueueItem}
        setOpenQueueItem={setOpenQueueItem}
        selectedOrder={selectedOrder}
        orderStatusInfo={orderStatusInfo}
        handleDoneOrderStatus={updateOrderStatus.handleDoneOrderStatus}
        handleVoidOrderStatus={updateOrderStatus.handleVoidOrderStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
});
