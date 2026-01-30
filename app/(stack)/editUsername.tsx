import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "@/constants/typography";
import BackIcon from "@/components/common/BackIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "expo-router";
import { updateUsername } from "@/store/profile/profileSlice";
import { useUser } from "@clerk/clerk-expo";

export default function EditUsername() {
  const { username } = useSelector((state: RootState) => state.profile);
  const { user } = useUser();
  const signInName = `${user?.firstName} ${user?.lastName}`;
  const [isFocus, setIsFocus] = useState(false);
  const [adjustedName, setAdjustedName] = useState(username ?? signInName);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = () => {
    dispatch(updateUsername(adjustedName));
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
              <View>
                <Text style={[Typography.header, styles.header]}>
                  Edit name
                </Text>
              </View>

              <View
                style={[
                  styles.inputContainer,
                  isFocus && { borderColor: "#404040", borderWidth: 1.5 },
                ]}
              >
                <TextInput
                  placeholder={username ?? signInName}
                  placeholderTextColor="#999"
                  value={adjustedName}
                  keyboardType="default"
                  onChangeText={(text) => setAdjustedName(text)}
                  autoFocus
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                />
              </View>
            </View>

            <TouchableOpacity
              className={`rounded-full bg-[#404040] w-full py-5 flex items-center justify-center my-4`}
              onPress={handleSave}
            >
              <Text style={[Typography.largeBody, styles.buttonText]}>
                Save
              </Text>
            </TouchableOpacity>
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
  inputContainer: {
    marginTop: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    padding: 10,
  },
  buttonText: {
    fontWeight: 600,
    color: "white",
  },
});
