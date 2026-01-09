import { View, Text, TextInput } from "react-native";
import React, { Dispatch } from "react";
import Ionicons from "@react-native-vector-icons/ionicons";

interface CredInputProps {
  type: "email" | "password" | "verify";
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  createPassword?: boolean;
}

export default function CredInputComp({
  type,
  value,
  setValue,
  loading,
  createPassword,
}: CredInputProps) {
  return (
    <View className={type === "email" ? "mb-4" : "mb-6"}>
      <Text className="text-sm font-medium text-gray-700 mb-2 capitalize">
        {type}
      </Text>
      <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
        {type === "email" ? (
          <>
            <Ionicons name="mail-outline" size={20} color="#6B7280" />
            <TextInput
              autoCapitalize={"none"}
              value={value}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              onChangeText={setValue}
              className="flex-1 ml-3 text-gray-900"
              editable={!loading}
            />
          </>
        ) : type === "password" ? (
          <>
            <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
            <TextInput
              value={value}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={true}
              onChangeText={setValue}
              className="flex-1 ml-3 text-gray-900"
              editable={!loading}
            />
          </>
        ) : (
          <>
            <Ionicons name="key-outline" size={20} color="#6B7280" />
            <TextInput
              value={value}
              placeholder="Enter 6-digit code"
              placeholderTextColor="#9CA3AF"
              onChangeText={setValue}
              className="flex-1 ml-3 text-gray-900 text-center text-lg tracking-widest"
              keyboardType="number-pad"
              maxLength={6}
              editable={!loading}
            />
          </>
        )}
      </View>
      {createPassword && (
        <Text className="text-xs text-gray-500 mt-1">
          Must be at least 8 characters
        </Text>
      )}
    </View>
  );
}
