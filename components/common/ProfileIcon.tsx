import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ProfileIcon = () => {
  return (
    <TouchableOpacity
      className="bg-neutral-200 rounded-full flex justify-center items-center border-[1px] border-neutral-300"
      style={{ height: hp(4.5), width: hp(4.5) }}
    >
      <Ionicons name="person-sharp" size={hp(2.5)} color="#404040" />
    </TouchableOpacity>
  );
};

export default ProfileIcon;
