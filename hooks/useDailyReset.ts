import { setLastResetDate } from "@/store/reset/resetSlice";
import { RootState } from "@/store/store";
import { resetWorkoutSets } from "@/store/workoutPlan/workoutSlice";
import { isToday, parseISO } from "date-fns";
import { useEffect } from "react";
import { AppState } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const useDailyReset = () => {
  const dispatch = useDispatch();
  const lastResetDateString = useSelector(
    (state: RootState) => state.reset.lastResetDate,
  );

  const checkDate = () => {
    if (!lastResetDateString) {
      // initial reset to set reset date
      dispatch(setLastResetDate());
      return;
    }

    const lastResetDate = parseISO(lastResetDateString);

    if (!isToday(lastResetDate)) {
      dispatch(resetWorkoutSets());
      dispatch(setLastResetDate());
    }
  };

  useEffect(() => {
    checkDate();

    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        checkDate();
      }
    });

    return () => subscription.remove();
  }, [lastResetDateString]);
};
