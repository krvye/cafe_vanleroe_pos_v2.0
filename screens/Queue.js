import { StyleSheet, View } from "react-native";
import { useState } from "react";

import QueueItems from "../components/Queue/QueueItems";
import QueueItemModal from "../components/Queue/QueueItemModal";

export default function QueueScreen() {
  const [voidQueueItem, setVoidQueueItem] = useState(false);
  const [openQueueItem, setOpenQueueItem] = useState(false);

  return (
    <View style={styles.container}>
      <QueueItems
        setVoidQueueItem={setVoidQueueItem}
        setOpenQueueItem={setOpenQueueItem}
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
