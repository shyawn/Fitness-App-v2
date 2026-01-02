import CloseIcon from "@/components/common/CloseIcon";
import { Typography } from "@/constants/typography";
import { RootState } from "@/store/store";
import { calcHydrationCup, hydrationServingRange } from "@/utils";
import Ionicons from "@react-native-vector-icons/ionicons";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { updateServingAmt } from "@/store/hydration/hydrationSlice";

interface SelectWaterContentProps {
  onClose: () => void;
  setPanning?: (value: boolean) => void;
}

const SelectWaterContent = ({
  onClose,
  setPanning,
}: SelectWaterContentProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const { servingAmt } = useSelector((state: RootState) => state.hydration);
  const dispatch = useDispatch();

  const data = hydrationServingRange();

  const handlePress = () => {
    setShowPicker(true);
    setPanning?.(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeContainer}>
        <CloseIcon onPress={() => onClose()} />
      </View>

      <Text style={[Typography.header, styles.header]}>Water settings</Text>

      <TouchableOpacity style={styles.servingContainer} onPress={handlePress}>
        <Text style={[Typography.subheader, styles.subheader]}>
          Serving size
        </Text>

        <View style={styles.selectServingContainer}>
          <Text
            style={Typography.largeBody}
          >{`${servingAmt} ml (${calcHydrationCup(servingAmt)} cup)`}</Text>

          <Ionicons name="pencil" color="#D7D7D7" size={18} />
        </View>
      </TouchableOpacity>

      {showPicker && (
        <WheelPicker
          style={{ alignSelf: "center" }}
          width={120}
          itemHeight={40}
          itemTextStyle={[Typography.subheader, styles.wheelItem]}
          data={data}
          value={servingAmt}
          onValueChanged={({ item: { value } }) =>
            dispatch(updateServingAmt(value))
          }
          enableScrollByTapOnItem={true}
        />
      )}

      <Text style={[Typography.body, styles.bodyMedium]}>
        How much water do you need to stay hydrated?
      </Text>

      <Text style={[Typography.body, styles.body]}>
        Everyone's needs are slightly different, but we recommend aiming for at
        least 2 liters (8 cups) of water each day.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  header: {
    fontWeight: 600,
    marginBottom: 24,
    textAlign: "center",
  },
  subheader: {
    fontWeight: 600,
  },
  bodyMedium: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  body: {
    textAlign: "center",
    color: "#999",
  },
  closeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  servingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  selectServingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  wheelItem: {
    marginTop: 5,
  },
});

export default SelectWaterContent;
