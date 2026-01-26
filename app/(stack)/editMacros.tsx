import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "@/components/common/BackIcon";
import { Typography } from "@/constants/typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { MacroState, updateMacroGoal } from "@/store/macros/macroSlice";
import EditMacrosComp from "@/components/editMacros/EditMacrosComp";

export default function EditStepGoal() {
  const macroState = useSelector((state: RootState) => state.macros);
  const macros: (keyof MacroState)[] = ["calories", "protein", "carbs", "fats"];
  const dispatch = useDispatch();

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
                Edit nutrition goals
              </Text>

              {macros.map((macro, idx) => (
                <View key={idx} className={idx !== 0 ? "mt-4" : ""}>
                  <EditMacrosComp
                    macroType={macro.charAt(0).toUpperCase() + macro.slice(1)}
                    goal={macroState[macro].goal}
                    setGoal={(value) =>
                      dispatch(updateMacroGoal({ type: macro, amount: value }))
                    }
                  />
                </View>
              ))}
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
    marginBottom: 32,
    fontWeight: 600,
  },
});
