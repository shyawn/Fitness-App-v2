import React from "react";
import { View } from "react-native";
import MacroBlockComp from "./MacroBlockComp";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { MacroState } from "@/store/macros/macroSlice";

const MacroContent = () => {
  const macros: (keyof MacroState)[] = ["protein", "carbs", "fats"];

  const macroState = useSelector((state: RootState) => state.macros);

  return (
    <View className="mt-4 flex flex-row justify-between">
      {macros.map((macro, idx) => (
        <MacroBlockComp
          key={idx}
          macroType={macro}
          tracked={macroState[macro].tracked}
          goal={macroState[macro].goal}
        />
      ))}
    </View>
  );
};

export default MacroContent;
