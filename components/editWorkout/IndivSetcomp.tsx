import { REGEX } from "@/constants/regex";
import { Typography } from "@/constants/typography";
import { Workout, WorkoutSetType } from "@/types";
import { isEmptyWorkoutInput } from "@/utils";
import Ionicons from "@react-native-vector-icons/ionicons";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface IndivSetCompProps {
  index: number;
  set: WorkoutSetType;
  nested?: boolean;
  setWorkout: Dispatch<SetStateAction<Workout>>;
  onDelete: (id: string) => void;
}

const IndivSetComp = ({
  index,
  set,
  nested = false,
  setWorkout,
  onDelete,
}: IndivSetCompProps) => {
  // Kept local so typing doesn't propagate to the parent (and Redux) on
  // every keystroke — when this row lives inside DraggableList's DragList,
  // any Redux update gives the list a new `data` reference, which makes
  // react-native-draglist bump its internal row keys and remount the row,
  // dropping keyboard focus mid-edit. Committing on blur avoids that.
  const [repsText, setRepsText] = useState(set.reps);
  const [weightText, setWeightText] = useState(set.weight);

  const commit = (field: "reps" | "weight", text: string) => {
    setWorkout((prev) => ({
      ...prev,
      sets: prev.sets.map((item) =>
        item.id === set.id ? { ...item, [field]: text } : item,
      ),
    }));
  };

  const handleChange = (field: "reps" | "weight", text: string) => {
    const regex = field === "reps" ? REGEX.WHOLE_NUMBER : REGEX.WEIGHT;
    if (text === "" || regex.test(text)) {
      if (field === "reps") setRepsText(text);
      else setWeightText(text);
    }
  };

  const handleDone = () => {
    // Commit any pending edits so "done" reflects exactly what's shown.
    commit("reps", repsText);
    commit("weight", weightText);

    if (!isEmptyWorkoutInput(repsText) && !isEmptyWorkoutInput(weightText)) {
      setWorkout((prev) => ({
        ...prev,
        sets: prev.sets.map((item) =>
          item.id === set.id ? { ...item, done: !item.done } : item,
        ),
      }));
    }
  };

  return (
    <View
      style={[
        styles.container,
        index !== 1 && { marginTop: 6 },
        set.done && { backgroundColor: "#D0F0C0" },
      ]}
    >
      <Text style={[Typography.body, styles.index]}>{index}</Text>

      <View className="flex flex-row gap-3 justify-center">
        <View style={{ width: nested ? "31%" : "33%" }}>
          <Text style={[Typography.smallBody, styles.subheader]}>Reps</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="0"
            placeholderTextColor="#999"
            value={repsText}
            keyboardType="decimal-pad"
            onChangeText={(text) => handleChange("reps", text)}
            onEndEditing={() => commit("reps", repsText)}
          />
        </View>

        <View style={{ width: nested ? "31%" : "33%" }}>
          <Text style={[Typography.smallBody, styles.subheader]}>
            Weight (kg)
          </Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="0"
            placeholderTextColor="#999"
            value={weightText}
            keyboardType="decimal-pad"
            onChangeText={(text) => handleChange("weight", text)}
            onEndEditing={() => commit("weight", weightText)}
          />
        </View>
      </View>

      <View className="flex flex-row gap-2">
        <TouchableOpacity
          style={{
            height: hp(4),
            width: hp(4),
            backgroundColor: set.done ? "#32CD32" : "#D7D7D7",
          }}
          className="rounded-lg items-center justify-center"
          onPress={handleDone}
        >
          <Ionicons
            name="checkmark"
            color={set.done ? "white" : "#b1b1b1"}
            size={18}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ height: hp(4), width: hp(4) }}
          className="bg-rose-500 rounded-lg items-center justify-center"
          onPress={() => onDelete(set.id)}
        >
          <Ionicons name="trash" size={hp(2.5)} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderWidth: 0.5,
    borderColor: "#D7D7D7",
    borderRadius: 8,
    padding: 8,
  },
  index: {
    fontWeight: 500,
    width: wp(4),
  },
  subheader: {
    fontWeight: 500,
    color: "#999",
    marginBottom: 4,
  },
  inputContainer: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#D7D7D7",
    backgroundColor: "white",
    paddingVertical: 6,
    borderRadius: 8,
  },
});

export default IndivSetComp;
