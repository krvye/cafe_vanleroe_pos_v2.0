import RootNavigator from "./navigators/RootNavigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="white" />
      <RootNavigator />
    </>
  );
}