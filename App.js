import RootNavigator from "./navigators/RootNavigator";
import { BranchProvider } from "./context/BranchContext";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="white" />
      <BranchProvider>
        <RootNavigator />
      </BranchProvider>
    </>
  );
}