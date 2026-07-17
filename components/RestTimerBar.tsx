import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { pauseTimer, resumeTimer, tick, clearTimer } from "@/store/restTimer/restTimerSlice";
import Ionicons from "@react-native-vector-icons/ionicons";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function RestTimerBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { workoutId, label, remainingSeconds, isRunning } = useSelector(
    (state: RootState) => state.restTimer
  );

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => dispatch(tick()), 1000);
    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  if (!workoutId) return null;

  const isDone = remainingSeconds === 0;

  return (
    <View style={styles.container}>
      <View className="flex-1">
        <Text className="font-semibold text-white capitalize" numberOfLines={1}>
          {isDone ? "Rest complete" : "Resting"} · {label}
        </Text>
        <Text className="text-white text-2xl font-bold mt-0.5">
          {formatTime(remainingSeconds)}
        </Text>
      </View>

      <View className="flex-row gap-3">
        {!isDone && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => dispatch(isRunning ? pauseTimer() : resumeTimer())}
          >
            <Ionicons
              name={isRunning ? "pause" : "play"}
              size={18}
              color="white"
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => dispatch(clearTimer())}
        >
          <Ionicons name="close" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#404040",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    marginBottom: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
});
