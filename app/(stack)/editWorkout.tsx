import BackIcon from "@/components/common/BackIcon";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Workout, WorkoutType } from "@/types";
import SearchWorkout from "@/components/editWorkout/SearchWorkout";
import WorkoutSet from "@/components/editWorkout/WorkoutSet";
import BaseButton from "@/components/common/BaseButton";
import { useDispatch } from "react-redux";
import { addWorkout, storeEditWorkout } from "@/store/workoutPlan/workoutSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
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
  const params = useLocalSearchParams();

  const isWorkoutType = (value: any): value is WorkoutType => {
    return value === "Weights" || value === "Cable" || value === "Bodyweight";
  };

  const isUndefined = (value: string) => {
    return value === "undefined";
  };

  const item: Workout = {
    id: !isUndefined(String(params.id)) ? String(params.id) : "",
    name: !isUndefined(String(params.name)) ? String(params.name) : "",
    day: !isUndefined(String(params.day)) ? String(params.day) : "",
    type: isWorkoutType(params.type) ? params.type : "",
    sets: !isUndefined(String(params.sets)) ? String(params.sets) : "",
    reps: !isUndefined(String(params.reps)) ? String(params.reps) : "",
    weight: !isUndefined(String(params.weight)) ? String(params.weight) : "",
    remarks: !isUndefined(String(params.remarks)) ? String(params.remarks) : "",
  };

  const [workout, setWorkout] = useState<Workout>(item ? item : emptyWorkout);

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
    const isEditing = typeof params.id === "string" && params.id.length > 0;
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
      if (isEditing) {
        dispatch(storeEditWorkout({ ...workout }));
      } else {
        dispatch(addWorkout({ ...workout, id: Date.now().toString() }));
      }
      setWorkout(emptyWorkout);
      setError("");
      router.back();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: insets.top }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 5}
      >
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <ScrollView
            className="mt-2"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
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
                onChangeText={(text) =>
                  setWorkout({ ...workout, remarks: text })
                }
              />
            </View>

            <View className="my-5 px-6 w-full">
              <BaseButton text="Save Workout" onPress={saveWorkout} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

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
