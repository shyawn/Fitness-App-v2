import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function HeaderComp({
  title,
  subtitle,
  type,
}: {
  title: string;
  subtitle: string;
  type?: "verify";
}) {
  return (
    <View className="items-center mb-8">
      <View className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
        {type === "verify" ? (
          <Ionicons name="mail" size={40} color="white" />
        ) : (
          <Ionicons name="fitness" size={40} color="white" />
        )}
      </View>
      <Text className="text-3xl font-bold text-gray-900 mb-2">{title}</Text>
      <Text className="text-lg text-gray-600 text-center">{subtitle}</Text>
    </View>
  );
}
