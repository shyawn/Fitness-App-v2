import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Router, useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BodyPartExercise } from "@/types";

export default function ExerciseList({ data }: { data: BodyPartExercise[] }) {
  const router = useRouter();
  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <ExerciseCard router={router} index={index} item={item} />
        )}
      />
    </View>
  );
}

const ExerciseCard = ({
  item,
  router,
  index,
}: {
  item: BodyPartExercise;
  router: Router;
  index: number;
}) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(400)
        .delay(index * 200)
        .springify()}
    >
      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: "/exerciseDetails", params: item })
        }
        className="flex py-3 space-y-2"
      >
        <View className="bg-neutral-200 shadow rounded-[10px] mb-2">
          <Image
            source={{ uri: item.gifUrl }}
            contentFit="cover"
            style={{
              width: wp(45),
              height: wp(52),
              borderRadius: 10,
            }}
          />
        </View>

        <Text
          style={{ fontSize: hp(1.7), width: wp(44), flexWrap: "wrap" }}
          className="text-neutral-700 font-semibold ml-1 tracking-wide capitalize"
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
