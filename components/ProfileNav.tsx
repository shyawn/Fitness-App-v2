import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ProfileNav = () => {
  return (
    <View className="flex-row justify-between items-center mx-5 mt-2">
      <TouchableOpacity
        className="bg-neutral-200 rounded-full flex justify-center items-center border-[1px] border-neutral-300"
        style={{ height: hp(5.5), width: hp(5.5) }}
      >
        <Ionicons name="person-sharp" size={hp(3)} color="gray" />
      </TouchableOpacity>

      <View className="space-y-2">
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

      <TouchableOpacity
        className="bg-neutral-200 rounded-full flex justify-center items-center border-[1px] border-neutral-300"
        style={{ height: hp(5.5), width: hp(5.5) }}
      >
        <Ionicons name="notifications" size={hp(3)} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileNav;
