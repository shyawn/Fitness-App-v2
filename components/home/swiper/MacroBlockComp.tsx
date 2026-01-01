import { calcMacrosFulfilled, calcMacrosLeft } from "@/utils";
import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

interface MacroBlockCompProps {
  macroType: string;
  tracked: number;
  goal: number;
}

const MacroBlockComp = ({ macroType, tracked, goal }: MacroBlockCompProps) => {
  const macroIcon =
    macroType.toLowerCase() === "protein"
      ? "fish-sharp"
      : macroType.toLowerCase() === "carbs"
      ? "nutrition-sharp"
      : "fast-food-sharp";

  const macroColor =
    macroType.toLowerCase() === "protein"
      ? "#d96666"
      : macroType.toLowerCase() === "carbs"
      ? "#db9d48"
      : "#6796d6";

  return (
    <View style={styles.macroContainer}>
      <Text className="font-semibold text-neutral-700 mb-[1px]">
        {calcMacrosLeft(goal, tracked)}g
      </Text>
      <Text className="text-[12px] text-neutral-700 mb-5">
        {macroType} <Text className="font-medium">left</Text>
      </Text>

      <AnimatedCircularProgress
        size={50}
        width={4}
        fill={calcMacrosFulfilled(goal, tracked)}
        tintColor={macroColor}
        onAnimationComplete={() => {}}
        backgroundColor="#e3e3e3"
      >
        {() => (
          <View style={[styles.iconContainer]}>
            <Ionicons name={macroIcon} color={macroColor} size={14} />
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  macroContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  iconContainer: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#f0e9e9",
  },
});

export default MacroBlockComp;
