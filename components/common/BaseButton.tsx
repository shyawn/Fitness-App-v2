import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onPress: () => void;
}

const BaseButton = ({ text, disabled = false, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      className="bg-rose-500 h-[52px] rounded-2xl flex items-center justify-center"
      onPress={onPress}
      disabled={disabled}
      style={disabled && { backgroundColor: "#D7D7D7" }}
    >
      <Text className="font-semibold text-white text-[20px]">{text}</Text>
    </TouchableOpacity>
  );
};

export default BaseButton;
