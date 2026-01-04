import React, { useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import CaloriesContent from "./CaloriesContent";
import MacroContent from "./MacroContent";

const MacroContainer = () => {
  const [showMacroFraction, setShowMacroFraction] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => setShowMacroFraction((prev) => !prev)}
    >
      <View>
        <CaloriesContent showMacroFraction={showMacroFraction} />

        <MacroContent showMacroFraction={showMacroFraction} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MacroContainer;
