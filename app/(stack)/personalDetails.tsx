import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "@/constants/typography";
import BackIcon from "@/components/common/BackIcon";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { format, parse } from "date-fns";

export default function PersonalDetails() {
  const router = useRouter();
  const { weightGoal, currentWeight, height, dob, gender, stepGoal } =
    useSelector((state: RootState) => state.profile);

  const formatDate = (date: string) => {
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    return format(parsedDate, "dd/MM/yyyy");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-6">
        <BackIcon />
        <Text style={[Typography.subheader, styles.header]}>
          Personal Details
        </Text>

        <TouchableOpacity
          className="shadow-sm mt-10"
          style={styles.container}
          activeOpacity={0.8}
        >
          <View>
            <Text style={Typography.body}>Goal Weight</Text>
            <Text style={[Typography.body, styles.subheader]}>
              {weightGoal} kg
            </Text>
          </View>

          <View className="bg-[#404040] rounded-full px-2 py-1">
            <Text className="text-xs text-white">Change Goal</Text>
          </View>
        </TouchableOpacity>

        <View
          className="shadow-sm mt-4"
          style={[styles.container, styles.metricOuterContainer]}
        >
          <View className="w-full">
            <TouchableOpacity
              style={styles.innerContainer}
              activeOpacity={0.6}
              onPress={() => router.push("/editHeightWeight")}
            >
              <View style={styles.metricContainer}>
                <Text style={Typography.body}>Current Weight</Text>
                <Text style={[Typography.body, styles.subheader]}>
                  {currentWeight} kg
                </Text>
              </View>
              <Ionicons name="pencil-outline" color="#999" size={16} />
            </TouchableOpacity>

            <View style={styles.divider} />
          </View>

          <View className="w-full">
            <TouchableOpacity
              style={styles.innerContainer}
              activeOpacity={0.6}
              onPress={() => router.push("/editHeightWeight")}
            >
              <View style={styles.metricContainer}>
                <Text style={Typography.body}>Height</Text>
                <Text style={[Typography.body, styles.subheader]}>
                  {height} cm
                </Text>
              </View>
              <Ionicons name="pencil-outline" color="#999" size={16} />
            </TouchableOpacity>

            <View style={styles.divider} />
          </View>

          <View className="w-full">
            <TouchableOpacity
              style={styles.innerContainer}
              activeOpacity={0.6}
              onPress={() => router.push("/editBirthday")}
            >
              <View style={styles.metricContainer}>
                <Text style={Typography.body}>Date of birth</Text>
                <Text style={[Typography.body, styles.subheader]}>
                  {formatDate(dob)}
                </Text>
              </View>
              <Ionicons name="pencil-outline" color="#999" size={16} />
            </TouchableOpacity>

            <View style={styles.divider} />
          </View>

          <View className="w-full">
            <TouchableOpacity
              style={styles.innerContainer}
              activeOpacity={0.6}
              onPress={() => router.push("/editGender")}
            >
              <View style={styles.metricContainer}>
                <Text style={Typography.body}>Gender</Text>
                <Text style={[Typography.body, styles.subheader]}>
                  {gender}
                </Text>
              </View>
              <Ionicons name="pencil-outline" color="#999" size={16} />
            </TouchableOpacity>

            <View style={styles.divider} />
          </View>

          <View className="w-full">
            <TouchableOpacity
              style={styles.innerContainer}
              activeOpacity={0.6}
              onPress={() => router.push("/editStepGoal")}
            >
              <View style={[styles.metricContainer, { borderBottomWidth: 0 }]}>
                <Text style={Typography.body}>Daily Step Goal</Text>
                <Text style={[Typography.body, styles.subheader]}>
                  {stepGoal} steps
                </Text>
              </View>
              <Ionicons name="pencil-outline" color="#999" size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    fontWeight: 600,
    textAlign: "center",
  },
  container: {
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#D7D7D7",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subheader: {
    fontWeight: 700,
  },
  metricOuterContainer: {
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 20,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    flexGrow: 1,
    marginRight: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#c1c1c1",
    width: "90%",
  },
});
