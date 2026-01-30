import { GenderType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  username: string;
  currentWeight: number;
  weightGoal: number;
  height: number;
  dob: string;
  gender: GenderType;
  stepGoal: number;
}

const initialState: ProfileState = {
  username: "",
  currentWeight: 60,
  weightGoal: 60,
  height: 60,
  dob: "",
  gender: "",
  stepGoal: 0,
};

const profileSlice = createSlice({
  name: "macros",
  initialState,
  reducers: {
    updateHeightWeight: (
      state,
      action: PayloadAction<{
        type: "currentWeight" | "weightGoal" | "height";
        amount: number;
      }>,
    ) => {
      state[action.payload.type] = action.payload.amount;
    },
    updateStepGoal: (state, action: PayloadAction<number>) => {
      state.stepGoal = action.payload;
    },
    updateDob: (state, action: PayloadAction<string>) => {
      state.dob = action.payload;
    },
    updateGender: (state, action: PayloadAction<GenderType>) => {
      state.gender = action.payload;
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const {
  updateHeightWeight,
  updateStepGoal,
  updateDob,
  updateGender,
  updateUsername,
} = profileSlice.actions;
export default profileSlice.reducer;
