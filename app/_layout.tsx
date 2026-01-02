import { Provider } from "react-redux";
import { store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store";
import { ActivityIndicator, View } from "react-native";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetProvider } from "@/components/common/BottomSheetComp";

export default function RootLayout() {
  const renderLoading = () => {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  };
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetProvider>
          <PersistGate persistor={persistor} loading={renderLoading()}>
            <Slot />
          </PersistGate>
        </BottomSheetProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
