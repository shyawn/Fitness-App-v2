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
      style={{ height: hp(4.5), width: hp(4.5), elevation: 1 }}
      className="absolute z-10 rounded-full left-4 bg-[#f8f8f8] flex items-center justify-center mt-5"
    >
      <Ionicons name="arrow-back" size={hp(2.8)} color="#404040" />
    </TouchableOpacity>
  );
};

export default BackIcon;
