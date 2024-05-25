import * as ScreenOrientation from "expo-screen-orientation";
import RootNavigator from "./navigators/RootNavigator";

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  return <RootNavigator />;
}
