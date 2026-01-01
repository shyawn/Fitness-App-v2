import { View, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HomeNav from "@/components/HomeNav";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSchedule } from "@/store/schedule/scheduleSlice";

export default function Home() {
  const schedule = useSelector((state: RootState) => state.schedule);
  const dispatch = useDispatch();

  return (
    <SafeAreaView className="flex-1 flex space-y-5">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <HomeNav
          title="MyFitnessApp"
          value={schedule}
          setValue={(date) => dispatch(setSchedule(date.toISOString()))}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
});
