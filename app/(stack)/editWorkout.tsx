import BackIcon from "@/components/common/BackIcon";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Workout } from "@/types";
import SearchWorkout from "@/components/editWorkout/SearchWorkout";
import WorkoutSet from "@/components/editWorkout/WorkoutSet";
import BaseButton from "@/components/common/BaseButton";
import { useDispatch } from "react-redux";
import { addWorkout } from "@/store/workoutPlan/workoutSlice";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetComp from "@/components/common/BottomSheetComp";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import SelectWorkoutDayContent from "@/components/editWorkout/SelectWorkoutDayContent";

const emptyWorkout: Workout = {
  id: "",
  name: "",
  day: "",
  type: "",
  sets: "",
  reps: "",
  weight: "",
  remarks: "",
};

const editWorkout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [workout, setWorkout] = useState<Workout>(emptyWorkout);

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    bottomSheetRef,
    bottomSheetContent,
    setBottomSheetContent,
    expandSheet,
    closeSheet,
  } = useBottomSheet();

  const handleSelectDay = () => {
    expandSheet();
    setBottomSheetContent(
      <SelectWorkoutDayContent
        workout={workout}
        setWorkout={(text) => setWorkout((prev) => ({ ...prev, day: text }))}
        onClose={closeSheet}
      />
    );
  };

  const dispatch = useDispatch();

  const saveWorkout = () => {
    console.log("WORKOUT", workout);
    if (
      workout.name === "" ||
      workout.day === "" ||
      workout.sets === "" ||
      workout.reps === "" ||
      workout.type === "" ||
      (workout.type !== "Bodyweight" && workout.weight === "")
    ) {
      setError("Please enter required fields");
    } else {
      dispatch(addWorkout({ ...workout, id: Date.now().toString() }));
      setWorkout(emptyWorkout);
      setError("");
      router.back();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: insets.top }}>
      <TouchableWithoutFeedback>
        {/* <TouchableWithoutFeedback onPress={handlePress}> */}
        <ScrollView className="mt-2">
          <BackIcon />

          <Text
            style={{ fontSize: hp(4) }}
            className="px-6 mt-20 font-semibold text-[#1d1d1d]"
          >
            Workout
          </Text>

          <SearchWorkout
            workout={workout}
            showDropdown={showDropdown}
            error={error}
            setWorkout={setWorkout}
            setShowDropdown={setShowDropdown}
            onSelectDay={handleSelectDay}
          />

          <View style={styles.divider} />

          <WorkoutSet
            workout={workout}
            error={error !== ""}
            setWorkout={setWorkout}
          />

          <View style={styles.divider} />

          <View className="px-6">
            <Text className="mb-2 font-semibold text-[18px] text-gray-500">
              Remarks
            </Text>
            <TextInput
              style={styles.textarea}
              placeholder="Enter remarks here"
              placeholderTextColor="#999"
              multiline={true}
              value={workout.remarks}
              onChangeText={(text) => setWorkout({ ...workout, remarks: text })}
            />
          </View>

          <View className="my-5 px-6 w-full">
            <BaseButton text="Save Workout" onPress={saveWorkout} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <BottomSheetComp
        setRef={(ref) => (bottomSheetRef.current = ref)}
        renderContent={bottomSheetContent}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 6,
    backgroundColor: "#e4e3e3",
    marginVertical: hp(3),
  },
  textarea: {
    height: 100,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
  },
});

export default editWorkout;
