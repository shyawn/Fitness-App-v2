import React from "react";
import { View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ScheduleSwiper from "./ScheduleSwiper";
import ProfileIcon from "./common/ProfileIcon";

interface HomeNavProps {
  title: string;
}

const HomeNav = ({ title }: HomeNavProps) => {
  return (
    <View>
      <View className="flex flex-row items-center justify-between px-6 mt-3 mb-5">
        <Text
          style={{ fontSize: hp(4) }}
          className="text-left font-semibold text-neutral-700"
        >
          {title}
        </Text>

        <ProfileIcon />
      </View>

      <ScheduleSwiper workout={title.toLowerCase().includes("my plan")} />
    </View>
  );
};

export default HomeNav;
