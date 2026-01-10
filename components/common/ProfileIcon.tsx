import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ProfileIcon = ({ onPress }: { onPress: () => void }) => {
  const { user } = useUser();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-neutral-200 rounded-full flex justify-center items-center border-[1px] border-neutral-300"
      style={{ height: hp(4.5), width: hp(4.5) }}
    >
      {!user ? (
        <Ionicons name="person-sharp" size={hp(2.5)} color="#404040" />
      ) : (
        <Image
          source={{
            uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
          }}
          className="rounded-full"
          style={{ height: hp(4.5), width: hp(4.5) }}
        />
      )}
    </TouchableOpacity>
  );
};

export default ProfileIcon;
