import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Workout } from "@/types";
import BaseButton from "../common/BaseButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import CloseIcon from "../common/CloseIcon";
import { Typography } from "@/constants/typography";

interface SelectSupersetContentProps {
  workout: Workout;
  onSelect: (partner: Workout | null) => void;
  onClose: () => void;
}

const SelectSupersetContent = ({
  workout,
  onSelect,
  onClose,
}: SelectSupersetContentProps) => {
  const workoutList = useSelector((state: RootState) => state.workout);

  const currentPartner = workoutList.find(
    (w) =>
      w.id !== workout.id &&
      w.day === workout.day &&
      w.supersetGroup &&
      w.supersetGroup === workout.supersetGroup,
  );

  // Only exercises on the same day that aren't already paired with someone
  // else, plus the current partner (if any), so picking never silently
  // breaks an unrelated pairing.
  const candidates = workoutList.filter(
    (w) =>
      w.id !== workout.id &&
      w.day === workout.day &&
      (!w.supersetGroup || w.id === currentPartner?.id),
  );

  const [selectedId, setSelectedId] = useState<string | null>(
    currentPartner?.id ?? null,
  );

  const handleSave = () => {
    onSelect(candidates.find((w) => w.id === selectedId) ?? null);
    onClose();
  };

  return (
    <View>
      <CloseIcon style={styles.closeContainer} onPress={onClose} />

      <Text
        style={{ fontSize: hp(3.5) }}
        className="text-center mb-3 font-semibold text-[#404040]"
      >
        Superset With
      </Text>

      {candidates.length === 0 ? (
        <Text className="text-center text-[#999] my-4">
          No other exercises on this day yet
        </Text>
      ) : (
        <>
          <TouchableOpacity
            className="my-[5px] flex flex-row justify-between items-center"
            onPress={() => setSelectedId(null)}
          >
            <Text style={Typography.largeBody}>None</Text>
            <View
              className="rounded-full h-[22px] w-[22px] border border-1 border-[#404040] flex items-center justify-center"
              style={selectedId === null && styles.active}
            >
              <View style={styles.innerCircle} />
            </View>
          </TouchableOpacity>

          {candidates.map((candidate) => (
            <TouchableOpacity
              className="my-[5px] flex flex-row justify-between items-center"
              key={candidate.id}
              onPress={() => setSelectedId(candidate.id)}
            >
              <Text style={Typography.largeBody} className="capitalize">
                {candidate.name}
              </Text>
              <View
                className="rounded-full h-[22px] w-[22px] border border-1 border-[#404040] flex items-center justify-center"
                style={selectedId === candidate.id && styles.active}
              >
                <View style={styles.innerCircle} />
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}

      <View className="mt-5">
        <BaseButton text="Save" onPress={handleSave} />
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

export default SelectSupersetContent;
