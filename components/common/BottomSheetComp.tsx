import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import { StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

interface BottomSheetContextType {
  expandSheet: (content: React.ReactNode) => void;
  closeSheet: () => void;
  setContentPanning?: (value: boolean) => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [contentPanning, setContentPanning] = useState(true);

  const expandSheet = useCallback((newContent: React.ReactNode) => {
    setContent(newContent);
    bottomSheetRef.current?.expand();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    if (index === -1) {
      setContentPanning(true);
      setContent(null);
    }
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{ expandSheet, closeSheet, setContentPanning }}
    >
      {children}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        detached
        enablePanDownToClose
        enableContentPanningGesture={contentPanning}
        enableHandlePanningGesture={true}
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
          {content}
        </BottomSheetView>
      </BottomSheet>
    </BottomSheetContext.Provider>
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

// custom hook to use the context
export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context)
    throw new Error(
      "useGlobalBottomSheet must be used within BottomSheetProvider"
    );
  return context;
};
