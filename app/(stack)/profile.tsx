import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Typography } from "@/constants/typography";
import { formatJoinDate } from "@/utils";
import { profileSettings } from "@/constants";

export default function Profile() {
  const { signOut } = useAuth();
  const { user } = useUser();

  const joinDate = user?.createdAt ? new Date(user.createdAt) : new Date();
  const daysSinceJoining = Math.floor(
    (new Date().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: () => signOut() },
    ]);
  };

  return (
    <SafeAreaView className="flex flex-1">
      <ScrollView className="flex-1">
        {/* header */}
        <View className="px-6 pt-8 pb-6">
          <Text className="font-bold" style={Typography.header}>
            Profile
          </Text>
          <Text className="text-lg text-gray-600 mt-1">
            Manage your account and stats
          </Text>
        </View>

        {/* user info card */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-[#999] rounded-full items-center justify-center mr-4">
                <Image
                  source={{
                    uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
                  }}
                  className="rounded-full"
                  style={{ width: 64, height: 64 }}
                />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-semibold text-gray-900">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.firstName || "User"}
                </Text>
                <Text className="text-gray-600">
                  {user?.emailAddresses?.[0]?.emailAddress}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">
                  Member since {formatJoinDate(joinDate)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {profileSettings.map((setting) => (
          <View
            key={setting.id}
            className={`px-6 ${
              setting.id === profileSettings.length ? "mb-10" : "mb-6"
            }`}
          >
            <View className="bg-[#f3f3f3] rounded-2xl shadow-md border border-gray-100 p-4">
              {setting.collection.map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.settingsContainer,
                    idx === 0 && {
                      paddingTop: 0,
                    },
                    idx === setting.collection.length - 1 && {
                      borderBottomWidth: 0,
                      paddingBottom: 0,
                    },
                  ]}
                >
                  <TouchableOpacity style={styles.buttonContainer}>
                    <View className="flex-row items-center">
                      <View style={[styles.iconContainer]}>
                        <Ionicons
                          name={
                            item.title === "Personal Details"
                              ? "cloudy"
                              : item.title === "Adjust Macronutrients"
                              ? "disc-outline"
                              : item.title === "Goal & Current Weight"
                              ? "flag"
                              : item.title === "Language"
                              ? "language-outline"
                              : item.title === "Edit Profile"
                              ? "person"
                              : item.title === "Notifications"
                              ? "notifications"
                              : item.title === "Preferences"
                              ? "settings-outline"
                              : "help-circle-outline"
                          }
                          size={20}
                          color="#404040"
                        />
                      </View>
                      <Text className="font-medium" style={Typography.body}>
                        {item.title}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}

        <View className="px-6 mb-8">
          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-[#f7f3f3] rounded-2xl p-4 shadow-md"
            activeOpacity={0.8}
          >
            <View className="flex-row items-center">
              <Ionicons name="log-out-outline" size={20} color="#404040" />
              <Text style={Typography.body} className="font-semibold ml-3">
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#c1c1c1",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
});
