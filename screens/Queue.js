import { StyleSheet, View } from "react-native";
import { useState } from "react";

import QueueItems from "../components/Queue/QueueItems";
import QueueItemModal from "../components/Queue/QueueItemModal";

<<<<<<< HEAD
import { InProgressDineInOrder } from "../services/firebase/Queue/RetrieveDineInprogSales";
import { InProgressTakeOutOrder } from "../services/firebase/Queue/RetrieveTakeOutInprogSales";
import { InProgressGrabFpOrder } from "../services/firebase/Queue/RetrieveGrabFPSales";
import { InProgressFbOrder } from "../services/firebase/Queue/RetrieveFbSales";
import { OrderStatus } from "../services/firebase/Queue/RetrieveOrderStatus";
import { UpdateOrderStatus } from "../services/firebase/Queue/UpdateOrderStatus";

=======
>>>>>>> 6cd5d76c8d19734eee552fb706a0eb279d0631ce
export default function QueueScreen() {
  const [voidQueueItem, setVoidQueueItem] = useState(false);
  const [openQueueItem, setOpenQueueItem] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

<<<<<<< HEAD
  const inprogressDineInfo = InProgressDineInOrder(); 
  const inprogressTakeOutInfo = InProgressTakeOutOrder(); 
  const inprogressGrabFpInfo = InProgressGrabFpOrder();
  const inprogressFbInfo = InProgressFbOrder();
  const orderStatusInfo = OrderStatus(); 
  const updateOrderStatus = UpdateOrderStatus(); 

=======
>>>>>>> 6cd5d76c8d19734eee552fb706a0eb279d0631ce
  return (
    <View style={styles.container}>
      <QueueItems
        setVoidQueueItem={setVoidQueueItem}
        setOpenQueueItem={setOpenQueueItem}
<<<<<<< HEAD
        inprogressDineInfo={inprogressDineInfo}
        inprogressTakeOutInfo={inprogressTakeOutInfo}
        inprogressGrabFpInfo={inprogressGrabFpInfo}
        inprogressFbInfo={inprogressFbInfo}
        setSelectedOrder={setSelectedOrder}
=======
>>>>>>> 6cd5d76c8d19734eee552fb706a0eb279d0631ce
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
