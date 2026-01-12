import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "@/components/common/BackIcon";
import { Typography } from "@/constants/typography";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { heightRange, weightRange } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateHeightWeight } from "@/store/profile/profileSlice";
import { useRouter } from "expo-router";

export default function EditHeightWeight() {
  const { currentWeight, height } = useSelector(
    (state: RootState) => state.profile
  );
  const [adjustedHeight, setAdjustedHeight] = useState(height);
  const [adjustedWeight, setAdjustedWeight] = useState(currentWeight);

  const heightData = heightRange();
  const weightData = weightRange();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = () => {
    dispatch(updateHeightWeight({ type: "height", amount: adjustedHeight }));
    dispatch(
      updateHeightWeight({ type: "currentWeight", amount: adjustedWeight })
    );
    router.back();
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-6">
        <BackIcon />

        <Text style={[Typography.subheader, styles.header]}>
          Set Height & Weight
        </Text>

        <View className="flex flex-1 flex-row items-center justify-center gap-10">
          <View className="items-center">
            <Text style={[Typography.largeBody, styles.subheader]}>Height</Text>
            <WheelPicker
              style={{ alignSelf: "center", marginTop: 32 }}
              width={120}
              itemHeight={40}
              visibleItemCount={7}
              itemTextStyle={[Typography.subheader, styles.wheelItem]}
              data={heightData}
              value={adjustedHeight}
              onValueChanged={({ item: { value } }) => setAdjustedHeight(value)}
              enableScrollByTapOnItem={true}
            />
          </View>

          <View className="items-center">
            <Text style={[Typography.largeBody, styles.subheader]}>Weight</Text>
            <WheelPicker
              style={{ alignSelf: "center", marginTop: 32 }}
              width={120}
              itemHeight={40}
              visibleItemCount={7}
              itemTextStyle={[Typography.subheader, styles.wheelItem]}
              data={weightData}
              value={adjustedWeight}
              onValueChanged={({ item: { value } }) => setAdjustedWeight(value)}
              enableScrollByTapOnItem={true}
            />
          </View>
        </View>

        <TouchableOpacity
          className="absolute bottom-5 self-center rounded-full bg-[#404040] w-full py-5 flex items-center justify-center"
          onPress={handleSave}
        >
          <Text style={[Typography.largeBody, styles.buttonText]}>
            Save changes
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    fontWeight: 600,
    textAlign: "center",
  },
  subheader: {
    fontSize: 18,
    fontWeight: 600,
  },
  buttonText: {
    fontWeight: 600,
    color: "white",
  },
  wheelItem: {
    marginTop: 5,
  },
});
