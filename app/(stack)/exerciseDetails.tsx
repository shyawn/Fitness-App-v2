import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "@/components/common/BackIcon";
import { BodyPartExercise } from "@/types";

export default function exerciseDetails() {
  const item: BodyPartExercise = useLocalSearchParams();
  const secondaryMuscles = Array.isArray(item.secondaryMuscles)
    ? item.secondaryMuscles
    : item.secondaryMuscles.split(",");
  const instructions = Array.isArray(item.instructions)
    ? item.instructions
    : item.instructions
        .split(".,")
        .map((i) => i.trim())
        .filter(Boolean);

  return (
    <SafeAreaView className="bg-white">
      <View>
        <View className=" bg-neutral-200 rounded-b-[40px]">
          <Image
            source={{ uri: item.gifUrl }}
            contentFit="cover"
            style={{ width: wp(100), height: wp(100) }}
          />
        </View>

        <BackIcon />

        <ScrollView
          className="mx-4 space-y-2 mt-3"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          <Text
            style={{ fontSize: hp(3.5) }}
            className="font-semibold text-neutral-800 tracking-wide capitalize mb-3"
          >
            {item.name}
          </Text>

          <Text
            style={{ fontSize: hp(2) }}
            className="text-neutral-700 tracking-wide mb-2"
          >
            Equipment:{" "}
            <Text className="font-bold text-neutral-800 capitalize">
              {item?.equipment}
            </Text>
          </Text>

          <Text
            style={{ fontSize: hp(2) }}
            className="text-neutral-700 tracking-wide mb-2"
          >
            Secondary muscles:{" "}
            <Text className="font-bold text-neutral-800 capitalize">
              {secondaryMuscles.join(", ")}
            </Text>
          </Text>

          <Text
            style={{ fontSize: hp(2) }}
            className="text-neutral-700 tracking-wide mb-3"
          >
            Target:{" "}
            <Text className="font-bold text-neutral-800 capitalize">
              {item?.target}
            </Text>
          </Text>

          <Text
            style={{ fontSize: hp(3) }}
            className="font-semibold text-neutral-800 tracking-wide mb-3"
          >
            Instructions
          </Text>

          {instructions.map((instruction, idx) => {
            return (
              <Text
                key={idx}
                style={{ fontSize: hp(2) }}
                className="text-neutral-800 mb-2"
              >
                {instruction}
                {idx !== instructions.length - 1 ? "." : ""}
              </Text>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
