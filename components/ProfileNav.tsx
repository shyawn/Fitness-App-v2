import React from "react";
import { View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ProfileIcon from "./common/ProfileIcon";

const ProfileNav = () => {
  return (
    <View className="flex-row justify-between items-center px-6 mt-3">
      <View className="flex flex-row gap-2">
        <Text
          style={{ fontSize: hp(4) }}
          className="font-bold tracking-wider text-neutral-700"
        >
          READY TO
        </Text>
        <Text
          style={{ fontSize: hp(4) }}
          className="font-bold tracking-wider text-rose-500"
        >
          WORKOUT
        </Text>
      </View>

      <ProfileIcon />
    </View>
  );
};

export default ProfileNav;
