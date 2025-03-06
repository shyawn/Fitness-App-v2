import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Workout } from "@/types";

const initialState: Workout[] = [];

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<Workout>) => {
      state.push(action.payload);
    },
    deleteWorkout: (state, action: PayloadAction<Workout>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    storeEditWorkout: (state, action: PayloadAction<Workout>) => {
      const targetWorkout = state.find((item) => item.id === action.payload.id);
      if (targetWorkout !== null) {
        Object.keys(targetWorkout).forEach(
          (key) => (targetWorkout[key] = action.payload[key])
        );
      }
    },
    setWorkoutOrder: (state, action: PayloadAction<Workout[]>) => {
      return action.payload;
    },
  },
});

export const { addWorkout, deleteWorkout, storeEditWorkout, setWorkoutOrder } =
  workoutSlice.actions;
export default workoutSlice.reducer;
