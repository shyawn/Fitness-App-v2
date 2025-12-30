import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchExercisesByBodyPart } from "../../api/exerciseDB";
import { dummyExercises } from "@/constants";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ExerciseList from "@/components/ExerciseList";
import { ScrollView } from "react-native-virtualized-view";
import { SafeAreaView } from "react-native-safe-area-context";
import SecondaryBackIcon from "@/components/common/SecondaryBackIcon";
import { ExerciseType } from "@/types";

export default function Exercises() {
  const [exercises, setExercises] = useState(dummyExercises);
  const item: ExerciseType = useLocalSearchParams();

  // useEffect(() => {
  //   // if (item) getExercises(item.name);
  // }, [item]);

  // const getExercises = async (bodyPart) => {
  //   // let data = await fetchExercisesByBodyPart(bodyPart);
  //   // console.log("got data: ", data);
  //   // setExercises(data);
  //   // setExercises(dummyExercises);
  // };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar style="dark" />
        <Image source={item.image} style={{ width: wp(100), height: hp(45) }} />

        <SecondaryBackIcon />

        <View className="mx-4 space-y-3 mt-4">
          <Text
            style={{ fontSize: hp(3.5) }}
            className="font-semibold text-neutral-700 capitalize"
          >
            {item.name} exercises
          </Text>
          <View className="mb-10">
            <ExerciseList data={exercises} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
