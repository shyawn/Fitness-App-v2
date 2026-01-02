import { RootState } from "@/store/store";
import { calcMacrosFulfilled, calcMacrosLeft } from "@/utils";
import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const CaloriesContent = () => {
  const { calories } = useSelector((state: RootState) => state.macros);

  return (
    <View
      className="flex flex-row items-center justify-between border-[1px] border-[#D7D7D7] bg-white"
      style={styles.container}
    >
      <View>
        <Text
          style={{ fontSize: hp(4) }}
          className="font-semibold text-neutral-700"
        >
          {calcMacrosLeft(calories.goal, calories.tracked)}
        </Text>
        <Text style={{ fontSize: hp(1.5) }} className="text-neutral-700">
          Calories <Text className="font-semibold">left</Text>
        </Text>
      </View>

      <AnimatedCircularProgress
        size={100}
        width={7}
        fill={calcMacrosFulfilled(calories.goal, calories.tracked)}
        tintColor="#404040"
        onAnimationComplete={() => {}}
        backgroundColor="#e3e3e3"
      >
        {() => (
          <View style={[styles.flameContainer]}>
            <Ionicons name="flame" color="#404040" size={20} />
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 1,
  },
  flameContainer: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#f7f2f2",
  },
});

export default CaloriesContent;
