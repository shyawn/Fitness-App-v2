import DraggableList from "@/components/DraggableList";
import { RootState } from "@/store/store";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setWorkoutOrder } from "@/store/workoutPlan/workoutSlice";
import { Workout } from "@/types";
import WorkoutModal from "@/components/WorkoutModal";
import Schedule from "@/components/Schedule";
import { StatusBar } from "expo-status-bar";
import EditWorkoutModal from "@/components/EditWorkoutModal";

export default function MyPlan() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editWorkout, setEditWorkout] = useState({});
  const [value, setValue] = useState(new Date());

  const dispatch = useDispatch();
  const workoutList = useSelector((state: RootState) => state.workout);

  const toggleModal = () => {
    // console.log("LENGTH:", workoutList.length);
    // console.log("workoutlist: ", workoutList);
    // console.log("API: ", process.env.EXPO_RAPID_API_KEY);
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView
      style={{ flexDirection: "row" }}
      className="mt-10 space-y-5"
      edges={["top"]}
    >
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Schedule value={value} setValue={setValue} />

        {workoutList.length === 0 ? (
          <Text className="font-semibold text-gray-500 top-full">
            Add your workout plan
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
          onPress={toggleModal}
          className="absolute p-1 right-7 top-32 bg-[#A9A9A9] rounded-full"
        >
          <Ionicons name="add" size={wp(5)} color="white" />
        </TouchableOpacity>
      </View>

      {modalVisible && (
        <WorkoutModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}

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
  },
});
