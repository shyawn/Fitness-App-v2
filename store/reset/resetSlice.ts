import { createSlice } from "@reduxjs/toolkit";

interface ResetState {
  lastResetDate: string | null;
}

const initialState: ResetState = {
  lastResetDate: null,
};

const resetSlice = createSlice({
  name: "reset",
  initialState,
  reducers: {
    setLastResetDate: (state) => {
      state.lastResetDate = new Date().toISOString();
    },
  },
});

export const { setLastResetDate } = resetSlice.actions;
export default resetSlice.reducer;
