import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RestTimerState = {
  workoutId: string | null;
  label: string;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
};

const initialState: RestTimerState = {
  workoutId: null,
  label: "",
  totalSeconds: 0,
  remainingSeconds: 0,
  isRunning: false,
};

const restTimerSlice = createSlice({
  name: "restTimer",
  initialState,
  reducers: {
    startTimer: (
      state,
      action: PayloadAction<{
        workoutId: string;
        label: string;
        totalSeconds: number;
      }>
    ) => {
      const { workoutId, label, totalSeconds } = action.payload;
      state.workoutId = workoutId;
      state.label = label;
      state.totalSeconds = totalSeconds;
      state.remainingSeconds = totalSeconds;
      state.isRunning = true;
    },
    tick: (state) => {
      if (state.isRunning && state.remainingSeconds > 0) {
        state.remainingSeconds -= 1;
        if (state.remainingSeconds === 0) {
          state.isRunning = false;
        }
      }
    },
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    resumeTimer: (state) => {
      if (state.remainingSeconds > 0) {
        state.isRunning = true;
      }
    },
    clearTimer: () => initialState,
  },
});

export const { startTimer, tick, pauseTimer, resumeTimer, clearTimer } =
  restTimerSlice.actions;
export default restTimerSlice.reducer;
