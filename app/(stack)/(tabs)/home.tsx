import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AnimatedCarousel from "@/components/AnimatedCarousel";
import BodyParts from "@/components/BodyParts";
import ProfileNav from "@/components/ProfileNav";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 flex space-y-5">
      <StatusBar style="dark" />
      <ProfileNav />

      <AnimatedCarousel />

      <View
        style={{ marginTop: hp(32), marginBottom: hp(12) }}
        className="flex"
      >
        <BodyParts />
      </View>
    </SafeAreaView>
  );
}
