import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Typography } from "@/constants/typography";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  visible,
  title,
  message,
  confirmText,
  cancelText,
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <Text style={styles.title}>{title}</Text>
              <Text style={[Typography.body, styles.message]}>{message}</Text>

              <View className="flex flex-row gap-3 mt-6">
                <TouchableOpacity
                  className="flex-1 rounded-full border border-[#404040] items-center justify-center"
                  onPress={onCancel}
                >
                  <Text style={[Typography.largeBody, styles.cancelText]}>
                    {cancelText}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-1 rounded-full py-4 items-center justify-center ${
                    destructive ? "bg-rose-500" : "bg-[#404040]"
                  }`}
                  onPress={onConfirm}
                >
                  <Text style={[Typography.largeBody, styles.confirmText]}>
                    {confirmText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
  },
  message: {
    marginTop: 8,
    color: "#636363",
  },
  cancelText: {
    fontWeight: 600,
  },
  confirmText: {
    fontWeight: 600,
    color: "white",
  },
});

export default ConfirmModal;
