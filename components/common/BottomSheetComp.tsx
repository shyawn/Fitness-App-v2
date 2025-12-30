import React, { useEffect, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { StyleSheet } from "react-native";

interface BottomSheetCompProps {
  setRef: (ref: BottomSheetMethods | null) => void;
  renderContent: React.ReactNode;
  onDismiss?: () => void;
}

const BottomSheetComp = ({
  setRef,
  renderContent,
  onDismiss,
}: BottomSheetCompProps) => {
  const localRef = useRef<BottomSheet>(null);

  useEffect(() => {
    setRef(localRef.current);
  }, [setRef]);

  const handleSheetChange = (index: number) => {
    if (index === -1 && onDismiss) {
      onDismiss();
    }
  };
  return (
    <BottomSheet
      ref={localRef}
      index={-1}
      detached
      enablePanDownToClose
      onChange={handleSheetChange}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
        />
      )}
      style={styles.bottomSheetContainer}
    >
      <BottomSheetView style={styles.sheetContainer}>
        {renderContent}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  sheetContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 13,
  },
});

export default BottomSheetComp;
