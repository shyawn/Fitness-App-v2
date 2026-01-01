import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Macro = {
  goal: number;
  tracked: number;
};

export interface MacroState {
  calories: Macro;
  protein: Macro;
  carbs: Macro;
  fats: Macro;
}

const initialState: MacroState = {
  calories: {
    goal: 1500,
    tracked: 134,
  },
  protein: {
    goal: 134,
    tracked: 52,
  },
  carbs: {
    goal: 150,
    tracked: 100,
  },
  fats: {
    goal: 42,
    tracked: 20,
  },
};

const macroSlice = createSlice({
  name: "macros",
  initialState,
  reducers: {
    updateMacroGoal: (
      state,
      action: PayloadAction<{ type: keyof MacroState; amount: number }>
    ) => {
      state[action.payload.type].goal = action.payload.amount;
    },
    updateMacrotracked: (
      state,
      action: PayloadAction<{ type: keyof MacroState; amount: number }>
    ) => {
      state[action.payload.type].tracked = action.payload.amount;
    },
  },
});

export const { updateMacroGoal, updateMacrotracked } = macroSlice.actions;
export default macroSlice.reducer;
