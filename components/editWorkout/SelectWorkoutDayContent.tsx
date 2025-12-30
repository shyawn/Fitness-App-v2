import { week } from "@/constants";
import { Workout } from "@/types";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BaseButton from "../common/BaseButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface SelectWorkoutDayContentProps {
  workout: Workout;
  setWorkout: (selectedDay: string) => void;
  onClose: () => void;
}

const SelectWorkoutDayContent = ({
  workout,
  setWorkout,
  onClose,
}: SelectWorkoutDayContentProps) => {
  const [selectedDay, setSelectedDay] = useState("");
  const handleSave = () => {
    setWorkout(selectedDay);
    onClose();
  };

  return (
    <View>
      <Text
        style={{ fontSize: hp(3.5) }}
        className="mb-3 font-semibold text-[#1d1d1d]"
      >
        Select Workout Day
      </Text>

      {week.map((day, idx) => (
        <TouchableOpacity
          className="my-[5px] flex flex-row justify-between items-center"
          key={idx}
          onPress={() => setSelectedDay(day)}
        >
          <Text className="text-[16px]">{day}</Text>

          <View
            className="rounded-full h-[22px] w-[22px] border border-1 border-[#1d1d1d] flex items-center justify-center"
            style={day === selectedDay && styles.active}
          >
            <View style={styles.innerCircle} />
          </View>
        </TouchableOpacity>
      ))}

      <View className="mt-5">
        <BaseButton
          text="Save"
          disabled={selectedDay === ""}
          onPress={handleSave}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: "#1d1d1d",
  },
  innerCircle: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: "white",
  },
});

export default SelectWorkoutDayContent;
