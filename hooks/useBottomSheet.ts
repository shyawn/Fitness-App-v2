import { useCallback, useRef, useState } from "react";

export const useBottomSheet = () => {
  const bottomSheetRef = useRef<any>(null);

  const [bottomSheetContent, setBottomSheetContent] =
    useState<React.ReactNode>(null);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return {
    bottomSheetRef,
    bottomSheetContent,
    setBottomSheetContent,
    expandSheet,
    closeSheet,
  };
};
