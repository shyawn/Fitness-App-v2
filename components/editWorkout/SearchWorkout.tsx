import { uniqueProgramExercises } from "@/constants/programExercises";
import { ProgramExercise, Workout, WorkoutSetType } from "@/types";
import Ionicons from "@react-native-vector-icons/ionicons";
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface SearchWorkoutProps {
  workout: Workout;
  showDropdown: boolean;
  error: string;
  setWorkout: (workout: Workout) => void;
  setShowDropdown: (show: boolean) => void;
  onSelectDay: () => void;
}

const SearchWorkout = ({
  workout,
  showDropdown,
  error,
  setWorkout,
  setShowDropdown,
  onSelectDay,
}: SearchWorkoutProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleSelect = (exercise: ProgramExercise) => {
    const prefilledSets: WorkoutSetType[] = Array.from(
      { length: exercise.sets },
      () => ({
        id: Math.random().toString(),
        reps: exercise.reps.toString(),
        weight: "",
        done: false,
      })
    );
    setWorkout({
      ...workout,
      name: exercise.name,
      sets: prefilledSets,
      restSeconds: exercise.restSeconds,
      muscleGroup: exercise.muscleGroup,
      supersetGroup: exercise.supersetGroup,
    });
    setShowDropdown(false);
  };

  const filteredList = useMemo(() => {
    const query = workout.name.trim().toLowerCase();
    if (query === "") return uniqueProgramExercises;
    return uniqueProgramExercises.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.muscleGroup.toLowerCase().includes(query)
    );
  }, [workout.name]);

  return (
    <View className="px-6">
      <Text className="mt-4 mb-2 font-semibold text-[18px] text-gray-500">
        Name
      </Text>

      <View
        className={`w-full flex flex-row items-center gap-2 px-3 border-[1px] bg-white ${
          isFocus || workout.name !== ""
            ? "border-gray-400"
            : "border-[#D7D7D7]"
        } ${showDropdown ? "rounded-t-lg rounded-b-none" : "rounded-lg"}`}
        style={error && workout.name === "" && { borderColor: "red" }}
      >
        <Ionicons
          style={styles.searchIcon}
          name="search"
          color="#999"
          size={20}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises.."
          placeholderTextColor="#999"
          value={workout.name}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChangeText={(text) => {
            // Typing manually overrides a prior dropdown selection, so drop
            // its prefilled metadata rather than leaving it stale against
            // a now-different exercise name.
            setWorkout({
              ...workout,
              name: text,
              restSeconds: undefined,
              muscleGroup: undefined,
              supersetGroup: null,
            });
            setShowDropdown(true);
          }}
        />
        {workout.name !== "" && (
          <TouchableOpacity
            style={styles.cancelIcon}
            onPress={() => setWorkout({ ...workout, name: "" })}
          >
            <Ionicons name="close-outline" color="white" size={12} />
          </TouchableOpacity>
        )}
      </View>

      {showDropdown && (
        <ScrollView
          style={{ width: "100%", maxHeight: hp(30) }}
          className="border border-t-0 border-gray-400 rounded-b-lg"
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
        >
          {filteredList.length === 0 ? (
            <View style={styles.listItem}>
              <Text className="text-[#999]">No matching exercises</Text>
            </View>
          ) : (
            filteredList.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={styles.listItem}
                onPress={() => handleSelect(item)}
              >
                <View className="flex-row items-center justify-between">
                  <Text className="font-medium">{item.name}</Text>
                  {item.priority && <View style={styles.priorityDot} />}
                </View>
                <Text className="text-xs text-[#999] mt-0.5">
                  {item.muscleGroup}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}

      <Text className="mt-4 mb-2 font-semibold text-[18px] text-gray-500">
        Day
      </Text>
      <TouchableOpacity
        className="w-full p-3 rounded-lg border-[1px] border-[#D7D7D7] bg-white"
        style={error && workout.day === "" && { borderColor: "red" }}
        onPress={onSelectDay}
      >
        <Text style={workout.day === "" && { color: "#999" }}>
          {workout.day ? workout.day : "Select Workout Day"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    position: "absolute",
    left: 12,
  },
  searchInput: {
    paddingLeft: 32,
    flex: 1,
    textTransform: "capitalize",
  },
  listItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fefefd",
  },
  cancelIcon: {
    width: hp(2),
    height: hp(2),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#999",
    padding: 2,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f43f5e",
  },
});

export default SearchWorkout;
