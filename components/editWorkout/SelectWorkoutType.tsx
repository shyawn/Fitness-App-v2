import { workoutTypes } from "@/constants";
import { Workout, WorkoutType } from "@/types";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface WorkoutTypeProps {
  workout: Workout;
  error: boolean;
  setWorkout: (workout: Workout) => void;
}

const SelectWorkoutType = ({
  workout,
  error,
  setWorkout,
}: WorkoutTypeProps) => {
  const [workoutType, setWorkoutType] = React.useState<WorkoutType>(
    workout.type
  );

  const handlePress = (type: WorkoutType) => {
    setWorkoutType(type);
    setWorkout({ ...workout, type: type });
  };

  return (
    <View
      className="bg-[#D7D7D7] rounded-xl p-1 mt-6 flex flex-row gap-2"
      style={error && { borderWidth: 1, borderColor: "red" }}
    >
      {workoutTypes.map((type, idx) => (
        <TouchableOpacity
          key={idx}
          className="flex-grow bg-white rounded-lg p-3"
          style={type === workoutType && styles.active}
          onPress={() => handlePress(type)}
        >
          <Text
            className="text-gray-500 font-bold text-center"
            style={type === workoutType && styles.activeText}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: "#999",
  },
  activeText: {
    color: "white",
  },
});

export default SelectWorkoutType;
