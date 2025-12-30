import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const BackIcon = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="absolute rounded-full left-4 mt-2"
    >
      <Ionicons name="arrow-back-circle-sharp" size={hp(5)} color="#D7D7D7" />
    </TouchableOpacity>
  );
};

export default BackIcon;
