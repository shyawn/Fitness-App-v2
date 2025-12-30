import { Workout } from "@/types";
import React from "react";
import { View, Text } from "react-native";
import SelectWorkoutType from "./SelectWorkoutType";
import WorkoutInput from "./WorkoutInput";

interface WorkoutSetProps {
  workout: Workout;
  error: boolean;
  setWorkout: (workout: Workout) => void;
}

const WorkoutSet = ({ workout, error, setWorkout }: WorkoutSetProps) => {
  return (
    <View className="px-6 mb-4">
      <Text className="mb-2 font-semibold text-[18px] text-gray-500">Set</Text>

      <SelectWorkoutType
        workout={workout}
        error={error && workout.type === ""}
        setWorkout={setWorkout}
      />

      <View className="flex flex-row justify-around mt-5 gap-5">
        <WorkoutInput
          style={{ flex: 1 }}
          value={workout.sets}
          placeholder="Sets"
          rightLabel="Sets"
          isWholeNumber={true}
          error={error && workout.sets === ""}
          onChangeText={(text) => setWorkout({ ...workout, sets: text })}
        />

        <WorkoutInput
          style={{ flex: 1 }}
          value={workout.reps}
          placeholder="Reps"
          rightLabel="Reps"
          isWholeNumber={true}
          error={error && workout.reps === ""}
          onChangeText={(text) => setWorkout({ ...workout, reps: text })}
        />
      </View>

      {workout.type !== "Bodyweight" && (
        <View style={{ width: "47%", marginTop: 8 }}>
          <WorkoutInput
            value={workout.weight}
            placeholder="Weight"
            rightLabel="kg"
            error={error && workout.weight === ""}
            onChangeText={(text) => setWorkout({ ...workout, weight: text })}
          />
        </View>
      )}
    </View>
  );
};

export default WorkoutSet;
