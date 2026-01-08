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
      style={[
        styles.container,
        error && { borderWidth: 1, borderColor: "red" },
      ]}
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
  container: {
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
    padding: 4,
    marginTop: 20,
    flexDirection: "row",
    gap: 8,
  },
  active: {
    backgroundColor: "#999",
  },
  activeText: {
    color: "white",
  },
});

export default SelectWorkoutType;
