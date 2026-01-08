import { REGEX } from "@/constants/regex";
import { Typography } from "@/constants/typography";
import { Workout, WorkoutSetType } from "@/types";
import { isEmptyWorkoutInput } from "@/utils";
import Ionicons from "@react-native-vector-icons/ionicons";
import React, { Dispatch, SetStateAction } from "react";
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
  const handleChange = (field: "reps" | "weight", text: string) => {
    const regex = field === "reps" ? REGEX.WHOLE_NUMBER : REGEX.DECIMAL;
    const value =
      text === "" ? 0 : field === "reps" ? parseInt(text) : parseFloat(text);

    if (text === "" || regex.test(text)) {
      setWorkout((prev) => ({
        ...prev,
        sets: prev.sets.map((item) =>
          item.id === set.id ? { ...item, [field]: value } : item
        ),
      }));
    }
  };

  const handleDone = () => {
    if (!isEmptyWorkoutInput(set.reps) && !isEmptyWorkoutInput(set.weight)) {
      setWorkout((prev) => ({
        ...prev,
        sets: prev.sets.map((item) =>
          item.id === set.id ? { ...item, done: !item.done } : item
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
            value={set.reps.toString()}
            keyboardType="decimal-pad"
            onChangeText={(text) => handleChange("reps", text)}
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
            value={set.weight.toString()}
            keyboardType="decimal-pad"
            onChangeText={(text) => handleChange("weight", text)}
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
