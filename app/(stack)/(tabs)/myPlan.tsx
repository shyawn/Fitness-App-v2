import DraggableList from "@/components/DraggableList";
import { RootState } from "@/store/store";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setWorkoutOrder } from "@/store/workoutPlan/workoutSlice";
import { Workout } from "@/types";
import Schedule from "@/components/Schedule";
import { StatusBar } from "expo-status-bar";
import EditWorkoutModal from "@/components/EditWorkoutModal";
import { useRouter } from "expo-router";

export default function MyPlan() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editWorkout, setEditWorkout] = useState({});
  const [value, setValue] = useState(new Date());

  const dispatch = useDispatch();
  const router = useRouter();
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
        <Schedule value={value} setValue={setValue} />

        {filteredWorkoutList.length === 0 ? (
          <Text className="text-center font-semibold text-[16px] text-[#999] top-full">
            {`No workouts for today.\n\nRemember to get sufficient rest!`}
          </Text>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <DraggableList
              selectedDay={value.toDateString().split(" ")[0]} // To filter by selected day
              data={workoutList}
              editModalVisible={editModalVisible}
              setEditModalVisible={setEditModalVisible}
              setEditWorkout={setEditWorkout}
              onReordered={(updatedData: Workout[]) => {
                dispatch(setWorkoutOrder(updatedData));
              }}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={() => router.push({ pathname: "/editWorkout" })}
          className="absolute p-1 right-7 top-32 bg-[#A9A9A9] rounded-full"
        >
          <Ionicons name="add" size={wp(5)} color="white" />
        </TouchableOpacity>
      </View>

      {editModalVisible && (
        <EditWorkoutModal
          editModalVisible={editModalVisible}
          setEditModalVisible={setEditModalVisible}
          editWorkout={editWorkout}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
});
