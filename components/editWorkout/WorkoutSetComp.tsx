import { Typography } from "@/constants/typography";
import { Workout, WorkoutSetType } from "@/types";
import Ionicons from "@react-native-vector-icons/ionicons";
import React, { Dispatch, SetStateAction } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import IndivSetComp from "./IndivSetcomp";
import { editWorkoutSets } from "@/store/workoutPlan/workoutSlice";
import { useDispatch } from "react-redux";

interface WorkoutSetCompProps {
  workout: Workout;
  nested?: boolean;
  error?: boolean;
  setWorkout?: Dispatch<SetStateAction<Workout>>;
}

const WorkoutSetComp = ({
  workout,
  nested = false,
  error,
  setWorkout,
}: WorkoutSetCompProps) => {
  const dispatch = useDispatch();

  const updateSets = (newSets: WorkoutSetType[]) => {
    if (setWorkout) {
      setWorkout((prev) => ({ ...prev, sets: newSets }));
    } else {
      dispatch(editWorkoutSets({ workoutId: workout.id, sets: newSets }));
    }
  };

  const handleAdd = () => {
    const newSet: WorkoutSetType = {
      id: Math.random().toString(),
      reps: "",
      weight: "",
      done: false,
    };
    updateSets([...workout.sets, newSet]);
  };

  const handleDelete = (id: string) => {
    updateSets(workout.sets.filter((set) => set.id !== id));
  };

  return (
    <View
      className="p-3 border border-1 border-[#D7D7D7] bg-white rounded-lg"
      style={error && { borderColor: "red" }}
    >
      {workout.sets.map((set, idx) => (
        <IndivSetComp
          key={set.id}
          index={idx + 1}
          set={set}
          bodyweight={workout.type === "Bodyweight"}
          nested={nested}
          setWorkout={(updateFn) => {
            const dummyPrev = { sets: workout.sets };
            const result =
              typeof updateFn === "function"
                ? updateFn(dummyPrev as any)
                : updateFn;
            updateSets(result.sets);
          }}
          onDelete={handleDelete}
        />
      ))}

      {workout.sets.length === 0 && (
        <Text style={[Typography.body, styles.emptyText]}>
          No sets yet. Add your first set below
        </Text>
      )}

      <TouchableOpacity
        className="flex flex-row gap-2 items-center justify-center border border-1 border-[#b48c8c] w-full rounded-lg mt-3"
        style={styles.addButton}
        onPress={handleAdd}
      >
        <Ionicons name="add" color="#b48c8c" size={20} />
        <Text style={[Typography.body, styles.addText]}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    paddingVertical: 8,
    borderColor: "#d8a8a8",
    borderStyle: "dashed",
    backgroundColor: "#f7f2f2",
  },
  addText: {
    fontWeight: 500,
    color: "#b48c8c",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontWeight: 500,
    marginVertical: 8,
  },
});

export default WorkoutSetComp;
