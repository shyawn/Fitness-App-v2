import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { Typography } from "@/constants/typography";
import Ionicons from "@react-native-vector-icons/ionicons";
import { CircularProgress } from "react-native-circular-progress";

interface EditMacrosCompProps {
  macroType: string;
  goal: number;
  setGoal: (value: number) => void;
}

export default function EditMacrosComp({
  macroType,
  goal,
  setGoal,
}: EditMacrosCompProps) {
  const [isFocus, setIsFocus] = useState(false);

  const macroIcon =
    macroType.toLowerCase() === "calories"
      ? "flame"
      : macroType.toLowerCase() === "protein"
        ? "fish-sharp"
        : macroType.toLowerCase() === "carbs"
          ? "nutrition-sharp"
          : "fast-food-sharp";

  const macroColor =
    macroType.toLowerCase() === "calories"
      ? "#404040"
      : macroType.toLowerCase() === "protein"
        ? "#d96666"
        : macroType.toLowerCase() === "carbs"
          ? "#db9d48"
          : "#6796d6";

  return (
    <View className="flex flex-row justify-between items-center gap-5">
      <CircularProgress
        size={60}
        width={4}
        fill={50}
        tintColor={macroColor}
        backgroundColor="#e3e3e3"
      >
        {() => (
          <View style={styles.iconContainer}>
            <Ionicons name={macroIcon} color={macroColor} size={20} />
          </View>
        )}
      </CircularProgress>

      <View
        className={`flex-grow justify-center p-3 pl-4 pb-1 bg-[#f8f8f8] rounded-xl border-[${isFocus ? "1" : "0.5"}px] border-[${isFocus ? "#404040" : "#D7D7D7"}]`}
      >
        <Text style={[Typography.smallBody, styles.description]}>
          {macroType} goal
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder={goal.toString() ?? "0"}
          placeholderTextColor="#999"
          value={goal.toString()}
          keyboardType="decimal-pad"
          onChangeText={(text) => setGoal(Number(text))}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#f7f2f2",
  },
  description: {
    fontWeight: 500,
    color: "#999",
    marginLeft: 4,
  },
  textInput: {
    color: "#404040",
  },
});
