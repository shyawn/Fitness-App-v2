import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "@/components/common/BackIcon";
import { Typography } from "@/constants/typography";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { RootState } from "@/store/store";
import { updateGender } from "@/store/profile/profileSlice";
import { genderOptions } from "@/constants";

export default function EditGender() {
  const { gender } = useSelector((state: RootState) => state.profile);

  const [adjustedGender, setAdjustedGender] = useState(gender);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = () => {
    dispatch(updateGender(adjustedGender));
    router.back();
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-6">
        <BackIcon />

        <Text style={[Typography.subheader, styles.header]}>Set Gender</Text>

        <View className="flex-1 justify-center items-center">
          {genderOptions.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              className={`${
                item === adjustedGender ? "bg-[#404040]" : "bg-[#f8f8f8]"
              } rounded-xl flex items-center justify-center w-full py-4 shadow-sm border-[0.5px] border-[#D7D7D7] ${
                idx !== 0 && "mt-6"
              }`}
              onPress={() => setAdjustedGender(item)}
              activeOpacity={0.8}
            >
              <Text
                className={`text-lg font-medium ${
                  item === adjustedGender ? "text-white" : "text-[#404040]"
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
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
  buttonText: {
    fontWeight: 600,
    color: "white",
  },
});
