import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const SecondaryBackIcon = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ height: hp(4), width: hp(4) }}
      className="absolute rounded-full left-4 bg-[#f3f3f3] flex items-center justify-center mt-2"
    >
      <Ionicons name="arrow-back" size={hp(3)} />
    </TouchableOpacity>
  );
};

export default SecondaryBackIcon;
