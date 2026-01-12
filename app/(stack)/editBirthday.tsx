import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "@/components/common/BackIcon";
import { Typography } from "@/constants/typography";
import { DatePicker } from "@quidone/react-native-wheel-picker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "expo-router";
import { updateDob } from "@/store/profile/profileSlice";
import { format } from "date-fns";

export default function EditBirthday() {
  const { dob } = useSelector((state: RootState) => state.profile);

  const [adjustedDob, setAdjustedDob] = useState(
    dob !== "" ? dob : format(new Date(), "yyyy-MM-dd")
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = () => {
    dispatch(updateDob(adjustedDob));
    router.back();
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-6">
        <BackIcon />

        <Text style={[Typography.subheader, styles.header]}>
          Set Height & Weight
        </Text>

        <View className="flex-1 justify-center items-center">
          <DatePicker
            visibleItemCount={7}
            itemTextStyle={[Typography.subheader, styles.wheelItem]}
            date={adjustedDob}
            onDateChanged={({ date }) => setAdjustedDob(date)}
            enableScrollByTapOnItem={true}
          />
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
  wheelItem: {
    marginTop: 5,
  },
});
