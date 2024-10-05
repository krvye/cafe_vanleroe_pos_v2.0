import { StyleSheet, View } from "react-native";
import { useState } from "react";

import QueueItems from "../components/Queue/QueueItems";
import QueueItemModal from "../components/Queue/QueueItemModal";

import { InProgressDineInOrder } from "../services/firebase/Queue/RetrieveDineInprogSales";
import { InProgressTakeOutOrder } from "../services/firebase/Queue/RetrieveTakeOutInprogSales";
import { InProgressGrabFpOrder } from "../services/firebase/Queue/RetrieveGrabFPSales";
import { InProgressFbOrder } from "../services/firebase/Queue/RetrieveFbSales";

export default function QueueScreen() {
  const [voidQueueItem, setVoidQueueItem] = useState(false);
  const [openQueueItem, setOpenQueueItem] = useState(false);

  const inprogressDineInfo = InProgressDineInOrder(); 
  const inprogressTakeOutInfo = InProgressTakeOutOrder(); 
  const inprogressGrabFpInfo = InProgressGrabFpOrder();
  const inprogressFbInfo = InProgressFbOrder();

  return (
    <View style={styles.container}>
      <QueueItems
        setVoidQueueItem={setVoidQueueItem}
        setOpenQueueItem={setOpenQueueItem}
        inprogressDineInfo={inprogressDineInfo}
        inprogressTakeOutInfo={inprogressTakeOutInfo}
        inprogressGrabFpInfo={inprogressGrabFpInfo}
        inprogressFbInfo={inprogressFbInfo}
      />
      <QueueItemModal
        openQueueItem={openQueueItem}
        setOpenQueueItem={setOpenQueueItem}
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
