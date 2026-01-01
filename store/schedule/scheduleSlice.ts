import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = new Date().toISOString();

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedule: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
