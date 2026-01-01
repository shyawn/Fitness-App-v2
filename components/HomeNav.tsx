import React from "react";
import { View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ScheduleSwiper from "./ScheduleSwiper";

interface HomeNavProps {
  title: string;
  value: Date;
  setValue: (date: Date) => void;
}

const HomeNav = ({ title, value, setValue }: HomeNavProps) => {
  return (
    <View>
      <Text
        style={{ fontSize: hp(4) }}
        className="text-left font-semibold text-neutral-700 mb-3 pl-6"
      >
        {title}
      </Text>

      <ScheduleSwiper
        workout={title.toLowerCase().includes("my plan")}
        value={value}
        setValue={setValue}
      />
    </View>
  );
};

export default HomeNav;
