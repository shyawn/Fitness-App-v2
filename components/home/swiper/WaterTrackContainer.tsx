import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const WaterTrackContainer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.waterContainer}>
          <Ionicons name="cafe" color="#6796d6" size={30} />
        </View>

        <View style={styles.waterAmtContainer}>
          <Text style={styles.text}>Water</Text>

          <View style={[styles.innerContainer, styles.waterAmtInnerContainer]}>
            <Text style={[styles.text, styles.waterAmtText]}>0 ml</Text>

            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="settings-outline" color="#999" size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="remove-circle-outline" color="#404040" size={32} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="add-circle" color="#404040" size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginTop: 8,
    padding: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  waterContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#f0e9e9",
  },
  waterAmtContainer: {
    marginVertical: 2,
    justifyContent: "space-between",
  },
  waterAmtInnerContainer: {
    marginVertical: 5,
  },
  text: {
    fontSize: 13,
    fontWeight: 500,
    color: "#404040",
  },
  waterAmtText: {
    fontSize: 15,
  },
  optionContainer: {
    flexDirection: "row",
    gap: 8,
    marginRight: 10,
  },
});

export default WaterTrackContainer;
