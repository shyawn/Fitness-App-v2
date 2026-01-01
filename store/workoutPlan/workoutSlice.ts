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
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
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
