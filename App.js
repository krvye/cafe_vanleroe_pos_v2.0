import * as ScreenOrientation from "expo-screen-orientation";
import RootNavigator from "./navigators/RootNavigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  return (
    <>
      <StatusBar backgroundColor="#FF5C00" />
      <RootNavigator />
    </>
  );
}
