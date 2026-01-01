import React from "react";
import { View } from "react-native";
import StepsBlockComp from "./StepsBlockComp";
import WaterTrackContainer from "./WaterTrackContainer";

const StepsContainer = () => {
  return (
    <View>
      <StepsBlockComp />
      <WaterTrackContainer />
    </View>
  );
};

export default StepsContainer;
