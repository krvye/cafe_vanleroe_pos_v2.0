import RootNavigator from "./navigators/RootNavigator";
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

  return <RootNavigator />;
}
