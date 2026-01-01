import DraggableList from "@/components/DraggableList";
import { RootState } from "@/store/store";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setWorkoutOrder } from "@/store/workoutPlan/workoutSlice";
import { Workout } from "@/types";
import { StatusBar } from "expo-status-bar";
import HomeNav from "@/components/HomeNav";

export default function MyPlan() {
  const [value, setValue] = useState(new Date());

  const dispatch = useDispatch();
  const workoutList = useSelector((state: RootState) => state.workout);

  const filteredWorkoutList = workoutList.filter((item) =>
    item.day.includes(value.toDateString().split(" ")[0])
  );

  return (
    <SafeAreaView
      style={{ flexDirection: "row" }}
      className="space-y-5"
      edges={["top"]}
    >
      <StatusBar style="dark" />
      <View style={styles.container}>
        <HomeNav title="My Plan" value={value} setValue={setValue} />

        {filteredWorkoutList.length === 0 ? (
          <Text className="text-center font-semibold text-[16px] text-[#999] top-full">
            {`No workouts for today.\n\nRemember to get sufficient rest!`}
          </Text>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <DraggableList
              selectedDay={value.toDateString().split(" ")[0]} // To filter by selected day
              onReordered={(updatedData: Workout[]) => {
                dispatch(setWorkoutOrder(updatedData));
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
});
