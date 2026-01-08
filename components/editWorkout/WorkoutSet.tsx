import { Workout } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import { View, Text } from "react-native";
import WorkoutSetComp from "./WorkoutSetComp";

interface WorkoutSetProps {
  workout: Workout;
  error: boolean;
  setWorkout: Dispatch<SetStateAction<Workout>>;
}

const WorkoutSet = ({ workout, error, setWorkout }: WorkoutSetProps) => {
  return (
    <View className="px-6 mb-4">
      <Text className="mb-2 font-semibold text-[18px] text-gray-500">Sets</Text>

      <WorkoutSetComp workout={workout} setWorkout={setWorkout} error={error} />
    </View>
  );
};

export default WorkoutSet;
