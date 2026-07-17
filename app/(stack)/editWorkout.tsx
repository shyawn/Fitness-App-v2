import BackIcon from "@/components/common/BackIcon";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import {
  useNavigation,
  usePreventRemove,
  type NavigationAction,
} from "@react-navigation/native";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Workout, WorkoutSetType } from "@/types";
import SearchWorkout from "@/components/editWorkout/SearchWorkout";
import WorkoutSet from "@/components/editWorkout/WorkoutSet";
import WorkoutInput from "@/components/editWorkout/WorkoutInput";
import BaseButton from "@/components/common/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkout,
  storeEditWorkout,
  setSupersetGroup,
} from "@/store/workoutPlan/workoutSlice";
import { RootState } from "@/store/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SelectWorkoutDayContent from "@/components/editWorkout/SelectWorkoutDayContent";
import SelectSupersetContent from "@/components/editWorkout/SelectSupersetContent";
import { useBottomSheet } from "@/components/common/BottomSheetComp";
import { getParamValue, isEmptyWorkoutInput, nextSupersetGroup } from "@/utils";

const emptyWorkout: Workout = {
  id: "",
  name: "",
  day: "",
  sets: [],
  remarks: "",
  restSeconds: undefined,
};

const editWorkout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const params = useLocalSearchParams();

  const item: Workout = {
    id: getParamValue(params.id),
    name: getParamValue(params.name),
    day: getParamValue(params.day),
    sets:
      params.sets && typeof params.sets === "string"
        ? (JSON.parse(params.sets) as WorkoutSetType[])
        : [],
    remarks: getParamValue(params.remarks),
    restSeconds: getParamValue(params.restSeconds)
      ? Number(getParamValue(params.restSeconds))
      : undefined,
    muscleGroup: getParamValue(params.muscleGroup) || undefined,
    supersetGroup: getParamValue(params.supersetGroup) || null,
  };

  const [workout, setWorkout] = useState<Workout>(item ? item : emptyWorkout);
  const initialWorkoutRef = useRef(item);
  const justSavedRef = useRef(false);
  const [pendingLeaveAction, setPendingLeaveAction] =
    useState<NavigationAction | null>(null);

  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { expandSheet, closeSheet } = useBottomSheet();
  const workoutList = useSelector((state: RootState) => state.workout);

  const hasUnsavedChanges =
    JSON.stringify(workout) !== JSON.stringify(initialWorkoutRef.current);

  usePreventRemove(hasUnsavedChanges && !justSavedRef.current, ({ data }) => {
    setPendingLeaveAction(data.action);
  });

  const handleDiscardChanges = () => {
    if (pendingLeaveAction) {
      navigation.dispatch(pendingLeaveAction);
    }
    setPendingLeaveAction(null);
  };

  const handleSelectDay = () => {
    Keyboard.dismiss();
    expandSheet(
      <SelectWorkoutDayContent
        setWorkout={(text) => setWorkout((prev) => ({ ...prev, day: text }))}
        onClose={closeSheet}
      />
    );
  };

  const dispatch = useDispatch();

  const supersetPartner = workoutList.find(
    (w) =>
      w.id !== workout.id &&
      w.day === workout.day &&
      w.supersetGroup &&
      w.supersetGroup === workout.supersetGroup
  );

  const handleSelectSuperset = (partner: Workout | null) => {
    // Clear the old partner's group if we're switching to a different
    // exercise (or to none) so pairings never point at stale partners.
    if (
      workout.supersetGroup &&
      supersetPartner &&
      supersetPartner.id !== partner?.id
    ) {
      dispatch(
        setSupersetGroup({
          workoutId: supersetPartner.id,
          supersetGroup: null,
        })
      );
    }

    if (partner) {
      const group =
        partner.supersetGroup ??
        workout.supersetGroup ??
        nextSupersetGroup(workout.day, workoutList);
      dispatch(setSupersetGroup({ workoutId: partner.id, supersetGroup: group }));
      setWorkout((prev) => ({ ...prev, supersetGroup: group }));
    } else {
      setWorkout((prev) => ({ ...prev, supersetGroup: null }));
    }
  };

  const handleSelectSupersetPress = () => {
    Keyboard.dismiss();
    expandSheet(
      <SelectSupersetContent
        workout={workout}
        onSelect={handleSelectSuperset}
        onClose={closeSheet}
      />
    );
  };

  const saveWorkout = () => {
    const isEditing = typeof params.id === "string" && params.id.length > 0;
    if (
      workout.name === "" ||
      workout.day === "" ||
      workout.sets.length === 0 ||
      !workout.sets.every(
        (set) =>
          !isEmptyWorkoutInput(set.reps) && !isEmptyWorkoutInput(set.weight)
      )
    ) {
      setError("Please enter required fields");
    } else {
      if (isEditing) {
        dispatch(storeEditWorkout({ ...workout }));
      } else {
        dispatch(addWorkout({ ...workout, id: Date.now().toString() }));
      }
      justSavedRef.current = true;
      setWorkout(emptyWorkout);
      setError("");
      router.back();
    }
  };

  return (
    <GestureHandlerRootView
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
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
              className="px-6 mt-20 font-semibold text-neutral-700"
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

            <View className="px-6 mb-4">
              <Text className="mb-2 font-semibold text-[18px] text-gray-500">
                Rest Timer
              </Text>
              <WorkoutInput
                value={workout.restSeconds?.toString() ?? ""}
                placeholder="Rest duration in seconds"
                rightLabel="sec"
                isWholeNumber
                error={false}
                onChangeText={(text) =>
                  setWorkout({
                    ...workout,
                    restSeconds: text === "" ? undefined : Number(text),
                  })
                }
              />
            </View>

            <View style={styles.divider} />

            <View className="px-6 mb-4">
              <Text className="mb-2 font-semibold text-[18px] text-gray-500">
                Superset
              </Text>
              <TouchableOpacity
                className="w-full p-3 rounded-lg border-[1px] border-[#D7D7D7] bg-white"
                style={workout.day === "" && { opacity: 0.5 }}
                disabled={workout.day === ""}
                onPress={handleSelectSupersetPress}
              >
                <Text
                  className="capitalize"
                  style={!supersetPartner && { color: "#999" }}
                >
                  {workout.day === ""
                    ? "Select a day first"
                    : supersetPartner
                      ? `Superset with ${supersetPartner.name}`
                      : "None"}
                </Text>
              </TouchableOpacity>
            </View>

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

      <ConfirmModal
        visible={pendingLeaveAction !== null}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to discard them?"
        confirmText="Discard"
        cancelText="Keep Editing"
        destructive
        onConfirm={handleDiscardChanges}
        onCancel={() => setPendingLeaveAction(null)}
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
