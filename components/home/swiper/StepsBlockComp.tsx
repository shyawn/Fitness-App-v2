import Ionicons from "@react-native-vector-icons/ionicons";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { BlurView } from "expo-blur";

const StepsBlockComp = () => {
  const [isBlurred, setIsBlurred] = useState(true);

  return (
    <View className="flex flex-row gap-3" style={styles.mainContainer}>
      <View
        className="flex border-[1px] border-[#D7D7D7] bg-white"
        style={styles.container}
      >
        <View style={isBlurred && { opacity: 0.5 }}>
          <Text className="text-[20px] font-semibold text-neutral-700">
            0 <Text className="font-medium text-[14px]">/10000</Text>
          </Text>
          <Text className="text-[12px] font-semibold text-neutral-700">
            Steps Today
          </Text>

          <AnimatedCircularProgress
            style={styles.stepsProgress}
            size={100}
            width={7}
            fill={0}
            // fill={calcMacrosFulfilled(goal, tracked)}
            tintColor="#404040"
            onAnimationComplete={() => {}}
            backgroundColor="#e3e3e3"
          >
            {() => (
              <View style={[styles.stepContainer]}>
                <Ionicons name="flame" color="#404040" size={20} />
              </View>
            )}
          </AnimatedCircularProgress>
        </View>

        {isBlurred && (
          <BlurView
            intensity={30}
            style={StyleSheet.absoluteFill}
            tint="light"
          />
        )}

        <TouchableOpacity style={styles.healthAppContainer}>
          <Ionicons name="heart-outline" color="#139e18" size={32} />

          <View className="flex-1">
            <Text className="text-[10px] text-neutral-700">
              Connect your health app to track your steps
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        className="flex border-[1px] border-[#D7D7D7] bg-white"
        style={styles.container}
      >
        <View className="flex flex-row gap-1 mb-4">
          <Ionicons
            style={{ marginTop: 4 }}
            name="flame"
            color="#404040"
            size={18}
          />
          <View>
            <Text className="text-[20px] font-semibold text-neutral-700">
              0
            </Text>
            <Text className="text-[12px] font-medium text-neutral-700">
              Calories burned
            </Text>
          </View>
        </View>

        <View className="flex flex-row gap-3">
          <View className="w-[28px] h-[28px] rounded-full flex items-center justify-center bg-[#404040]">
            <Ionicons name="footsteps-outline" color="white" size={16} />
          </View>
          <View>
            <Text className="text-[12px] font-medium text-neutral-700 mb-[2px]">
              Steps
            </Text>

            <View className="flex items-center justify-center w-[32px] py-[2px] rounded-full bg-[#f1f1f1]">
              <Text className="text-[12px] text-neutral-700">+0</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: hp(27.5),
  },
  container: {
    width: wp(43),
    padding: 16,
    paddingHorizontal: 16,
    borderRadius: 24,
    elevation: 1,
  },
  healthAppContainer: {
    position: "absolute",
    zIndex: 10,
    left: 0,
    right: 0,
    bottom: "30%",
    marginHorizontal: 14,
    height: "55%",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  stepContainer: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#f7f2f2",
  },
  stepsProgress: {
    marginTop: 20,
    marginHorizontal: "auto",
  },
});

export default StepsBlockComp;
