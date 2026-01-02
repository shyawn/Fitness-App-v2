import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface CloseIconProps {
  onPress: () => void;
  style?: object;
}

const CloseIcon = ({ onPress, style }: CloseIconProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Ionicons name="close-outline" color="#999" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
    borderRadius: 100,
    zIndex: 10,
  },
});

export default CloseIcon;
