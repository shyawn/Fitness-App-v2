import DraggableList from "@/components/DraggableList";
import { RootState } from "@/store/store";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setWorkoutOrder } from "@/store/workoutPlan/workoutSlice";
import { Workout } from "@/types";
import { StatusBar } from "expo-status-bar";
import HomeNav from "@/components/HomeNav";
import RestTimerBar from "@/components/RestTimerBar";
import moment from "moment";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function MyPlan() {
  const workoutList = useSelector((state: RootState) => state.workout);
  const selectedDay = useSelector((state: RootState) => state.schedule);
  const day = moment(selectedDay).toString().split(" ")[0];
  const dispatch = useDispatch();

  const filteredWorkoutList = workoutList.filter((item) =>
    item.day.includes(day)
  );

  return (
    <SafeAreaView
      style={{ flexDirection: "row" }}
      className="space-y-5"
      edges={["top"]}
    >
      <StatusBar style="dark" />
      <View style={styles.container}>
        <HomeNav title="My Plan" />

        <RestTimerBar />

        {filteredWorkoutList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="barbell-sharp" color="#999" size={38} />
            <Text className="text-center font-semibold text-[16px] leading-8 text-[#999] top-5">
              {`No workouts for today.
Remember to get sufficient rest!`}
            </Text>
          </View>
        ) : (
          <DraggableList
            selectedDay={day} // To filter by selected day
            onReordered={(updatedData: Workout[]) => {
              dispatch(setWorkoutOrder(updatedData));
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  emptyContainer: {
    top: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
