import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface ModalProps {
  visible: boolean;
  modalContent?: React.ReactNode;
  setVisible: (visible: boolean) => void;
}

const BaseModal = ({ visible, modalContent, setVisible }: ModalProps) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { width: wp(80) }]}>
          {modalContent}

          <TouchableOpacity
            onPress={() => setVisible(false)}
            className="absolute right-3 top-3"
          >
            <Ionicons name="close" size={hp(3)} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default BaseModal;
