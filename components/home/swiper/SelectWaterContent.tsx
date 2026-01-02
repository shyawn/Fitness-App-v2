import CloseIcon from "@/components/common/CloseIcon";
import { Typography } from "@/constants/typography";
import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface SelectWaterContentProps {
  onClose: () => void;
}

const SelectWaterContent = ({ onClose }: SelectWaterContentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.closeContainer}>
        <CloseIcon onPress={onClose} />
      </View>

      <Text style={[Typography.header, styles.header]}>Water settings</Text>

      <View style={styles.servingContainer}>
        <Text style={[Typography.subheader, styles.subheader]}>
          Serving size
        </Text>

        <View style={styles.selectServingContainer}>
          <Text style={Typography.body}>250 ml (1 cup)</Text>

          <TouchableOpacity>
            <Ionicons name="pencil" color="#D7D7D7" size={18} />
          </TouchableOpacity>
        </View>
      </View>

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
});

export default SelectWaterContent;
