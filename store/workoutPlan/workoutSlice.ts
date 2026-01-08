import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Workout, WorkoutSetType } from "@/types";

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
    editWorkoutSets: (
      state,
      action: PayloadAction<{ workoutId: string; sets: WorkoutSetType[] }>
    ) => {
      const { workoutId, sets } = action.payload;
      const index = state.findIndex((workout) => workout.id === workoutId);
      if (index !== -1) {
        state[index].sets = sets;
      }
    },
  },
});

export const {
  addWorkout,
  deleteWorkout,
  storeEditWorkout,
  setWorkoutOrder,
  editWorkoutSets,
} = workoutSlice.actions;
export default workoutSlice.reducer;
