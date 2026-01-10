import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@react-native-vector-icons/ionicons";

interface ButtonProps {
  type: "signin" | "signup" | "verify";
  loading: boolean;
  loadingText: string;
  text: string;
  onPress: () => void;
}

export default function Button({
  type,
  onPress,
  loading,
  loadingText,
  text,
}: ButtonProps) {
  const isSignin = type === "signin";
  const isVerify = type === "verify";
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={`rounded-xl py-4 shadow-sm ${!isSignin && "mb-4"} ${
        loading ? "bg-gray-400" : isVerify ? "bg-green-600" : " bg-blue-600"
      }`}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <Ionicons name="refresh" size={20} color="white" />
        ) : isSignin ? (
          <Ionicons name="log-in-outline" size={20} color="white" />
        ) : isVerify ? (
          <Ionicons name="checkmark-circle-outline" size={20} color="white" />
        ) : (
          <Ionicons name="person-add-outline" size={20} color="white" />
        )}
        <Text className="text-white font-semibold text-lg ml-2">
          {loading ? loadingText : text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
