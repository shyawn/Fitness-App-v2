import { Provider } from "react-redux";
import { store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store";
import { ActivityIndicator, View } from "react-native";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetProvider } from "@/components/common/BottomSheetComp";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

export default function RootLayout() {
  const renderLoading = () => {
    return (
      <View>
        <ActivityIndicator size={"large"} color="#2563eb" />
      </View>
    );
  };
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetProvider>
            <PersistGate persistor={persistor} loading={renderLoading()}>
              <Slot />
            </PersistGate>
          </BottomSheetProvider>
        </GestureHandlerRootView>
      </Provider>
    </ClerkProvider>
  );
}
