import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import CaloriesContent from "./CaloriesContent";
import MacroContent from "./MacroContent";

const MacroContainer = () => {
  return (
    <TouchableWithoutFeedback className="" onPress={() => {}}>
      <View>
        <CaloriesContent />

        <MacroContent />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MacroContainer;
