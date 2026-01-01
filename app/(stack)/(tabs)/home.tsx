import { View, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HomeNav from "@/components/HomeNav";
import HomeSwiper from "@/components/home/swiper/HomeSwiper";
export default function Home() {
  return (
    <SafeAreaView className="flex-1 flex space-y-5">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <HomeNav title="MyFitnessApp" />

        <HomeSwiper />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
