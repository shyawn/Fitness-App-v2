import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HydrationState {
  hydrationTracked: number;
  servingAmt: number;
}

const initialState: HydrationState = {
  hydrationTracked: 0,
  servingAmt: 250,
};

const hydrationSlice = createSlice({
  name: "macros",
  initialState,
  reducers: {
    updateHydrationTracked: (state, action: PayloadAction<number>) => {
      state.hydrationTracked = Math.max(
        0,
        state.hydrationTracked + action.payload
      ); // prevent negative hydration
    },
    updateServingAmt: (state, action: PayloadAction<number>) => {
      state.servingAmt = action.payload;
    },
  },
});

export const { updateHydrationTracked, updateServingAmt } =
  hydrationSlice.actions;
export default hydrationSlice.reducer;
