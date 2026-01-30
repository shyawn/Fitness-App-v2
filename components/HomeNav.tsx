import React from "react";
import { View, Text } from "react-native";
import ScheduleSwiper from "./ScheduleSwiper";
import ProfileIcon from "./common/ProfileIcon";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { Typography } from "@/constants/typography";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface HomeNavProps {
  title: string;
}

const HomeNav = ({ title }: HomeNavProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { username } = useSelector((state: RootState) => state.profile);
  const isHomePage = title === "Home";

  return (
    <View>
      <View className="flex flex-row items-center justify-between px-6 mt-6 mb-5">
        <Text className="font-semibold" style={Typography.header}>
          {isHomePage ? "Welcome, " : title}

          {isHomePage && (
            <Text className="capitalize">
              {username ? username.split(" ")[0] : user?.firstName || "Athlete"}
              !
            </Text>
          )}
        </Text>

        <ProfileIcon onPress={() => router.push("/(stack)/profile")} />
      </View>

      <ScheduleSwiper workout={title.toLowerCase().includes("my plan")} />
    </View>
  );
};

export default HomeNav;
