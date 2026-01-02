import { week } from "@/constants";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BaseButton from "../common/BaseButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import CloseIcon from "../common/CloseIcon";
import { Typography } from "@/constants/typography";

interface SelectWorkoutDayContentProps {
  setWorkout: (selectedDay: string) => void;
  onClose: () => void;
}

const SelectWorkoutDayContent = ({
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
      <CloseIcon style={styles.closeContainer} onPress={onClose} />

      <Text
        style={{ fontSize: hp(3.5) }}
        className="text-center mb-3 font-semibold text-[#404040]"
      >
        Select Workout Day
      </Text>

      {week.map((day, idx) => (
        <TouchableOpacity
          className="my-[5px] flex flex-row justify-between items-center"
          key={idx}
          onPress={() => setSelectedDay(day)}
        >
          <Text style={Typography.largeBody}>{day}</Text>

          <View
            className="rounded-full h-[22px] w-[22px] border border-1 border-[#404040] flex items-center justify-center"
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
  closeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  active: {
    backgroundColor: "#404040",
  },
  innerCircle: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: "white",
  },
});

export default SelectWorkoutDayContent;
