import { StyleSheet, View } from "react-native";

import QueueItems from "../components/Queue/QueueItems";

export default function QueueScreen() {
  return (
    <View style={styles.container}>
      <QueueItems/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: "#FFFFFF",
  },
  
});
