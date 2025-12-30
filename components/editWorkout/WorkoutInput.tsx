import React from "react";
import { TextInput, View, Text } from "react-native";

interface WorkoutInputProps {
  value: string;
  placeholder: string;
  error: boolean;
  rightLabel?: string;
  isWholeNumber?: boolean;
  style?: object;
  onChangeText: (text: string) => void;
}

const WorkoutInput = ({
  value,
  placeholder,
  error,
  rightLabel,
  isWholeNumber = false,
  style,
  onChangeText,
}: WorkoutInputProps) => {
  const handleChangeText = (text: string, isWholeNumber: boolean) => {
    if (text === "") {
      onChangeText(text);
      return;
    }

    const regex = isWholeNumber ? /^\d+$/ : /^\d+(\.\d{0,1})?$/;
    if (regex.test(text)) {
      onChangeText(text);
    }
  };

  return (
    <View
      style={[
        {
          borderBottomWidth: 1,
          borderColor: "#A9A9A9",
        },
        error && { borderColor: "red" },
        style,
      ]}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        keyboardType="decimal-pad"
        onChangeText={(text) => handleChangeText(text, isWholeNumber)}
      />

      {rightLabel && value && (
        <Text className="absolute bottom-[11px] right-0 font-semibold text-[#999]">
          {rightLabel}
        </Text>
      )}
    </View>
  );
};

export default WorkoutInput;
