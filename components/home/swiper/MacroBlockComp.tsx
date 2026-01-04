import { Typography } from "@/constants/typography";
import { calcMacrosFulfilled, calcMacrosLeft } from "@/utils";
import Ionicons from "@react-native-vector-icons/ionicons";
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

interface MacroBlockCompProps {
  macroType: string;
  tracked: number;
  goal: number;
  showMacroFraction: boolean;
}

const MacroBlockComp = ({
  macroType,
  tracked,
  goal,
  showMacroFraction,
}: MacroBlockCompProps) => {
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

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [showMacroFraction]);

  return (
    <View style={styles.macroContainer}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text className="font-semibold text-neutral-700 mb-[1px]">
          {showMacroFraction ? `${tracked} ` : calcMacrosLeft(goal, tracked)}
          {!showMacroFraction && "g"}

          {showMacroFraction && (
            <Text style={[Typography.smallBody, styles.weightFraction]}>
              / {goal}g
            </Text>
          )}
        </Text>
      </Animated.View>

      <Text className="text-[12px] text-neutral-700 mb-5">
        {macroType}{" "}
        <Text className="font-medium">
          {showMacroFraction ? "eaten" : "left"}
        </Text>
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
    width: "32%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  iconContainer: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#f7f2f2",
  },
  weightFraction: {
    color: "#999",
  },
});

export default MacroBlockComp;
