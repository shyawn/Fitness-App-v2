import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "@/components/common/BackIcon";
import { Typography } from "@/constants/typography";
import { CircularProgress } from "react-native-circular-progress";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "expo-router";
import { updateStepGoal } from "@/store/profile/profileSlice";

export default function EditStepGoal() {
  const { stepGoal } = useSelector((state: RootState) => state.profile);
  const [isFocus, setIsFocus] = useState(false);
  const [adjustedStep, setAdjustedStep] = useState(stepGoal.toString());

  const notChanged = stepGoal.toString() === adjustedStep;
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = () => {
    dispatch(updateStepGoal(Number(adjustedStep)));
    router.back();
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 5}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 px-6 justify-between">
            <BackIcon />

            <View>
              <Text style={[Typography.header, styles.header]}>
                Edit Step Goal
              </Text>

              <View className="border-[1px] border-[#D7D7D7] py-3 px-6 rounded-xl my-8 flex flex-row justify-between">
                <CircularProgress
                  size={80}
                  width={4}
                  fill={50}
                  tintColor="#404040"
                  backgroundColor="#e3e3e3"
                >
                  {() => (
                    <View
                      className="bg-[#f3f1f1]"
                      style={styles.stepsContainer}
                    >
                      <Ionicons name="footsteps" color="#404040" size={24} />
                    </View>
                  )}
                </CircularProgress>

                <View className="flex-grow justify-center px-10">
                  <Text style={styles.subheader}>{adjustedStep}</Text>
                  <Text style={[Typography.body, styles.description]}>
                    Previous goal {stepGoal} steps
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.inputContainer,
                  isFocus && { borderColor: "#404040", borderWidth: 1.5 },
                ]}
              >
                <Text style={[Typography.smallBody, styles.inputDescription]}>
                  Daily Step Goal
                </Text>
                <TextInput
                  placeholder={stepGoal.toString()}
                  placeholderTextColor="#999"
                  value={adjustedStep}
                  keyboardType="decimal-pad"
                  onChangeText={(text) => setAdjustedStep(text)}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                />
              </View>
            </View>

            <View className="flex flex-row justify-between gap-6 my-4">
              <TouchableOpacity
                className="rounded-full border border-[#404040] w-[47%] py-5 flex items-center justify-center"
                onPress={() => setAdjustedStep(stepGoal.toString())}
              >
                <Text style={[Typography.largeBody, styles.revertText]}>
                  Revert
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`rounded-full ${
                  notChanged || adjustedStep === ""
                    ? "bg-[#D7D7D7]"
                    : "bg-[#404040]"
                } w-[47%] py-5 flex items-center justify-center`}
                disabled={notChanged || adjustedStep === ""}
                onPress={handleSave}
              >
                <Text style={[Typography.largeBody, styles.buttonText]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 100,
    fontWeight: 600,
  },
  buttonText: {
    fontWeight: 600,
    color: "white",
  },
  stepsContainer: {
    borderRadius: 100,
    padding: 12,
    backgroundColor: "#f3f1f1",
  },
  subheader: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 2,
  },
  description: {
    color: "#999",
    fontWeight: 500,
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    padding: 10,
    paddingBottom: 0,
  },
  inputDescription: {
    marginLeft: 4,
    color: "#7a7979",
    fontWeight: 600,
  },
  revertText: {
    fontWeight: 600,
  },
});
