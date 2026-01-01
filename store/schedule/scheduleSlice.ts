import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = new Date().toISOString();

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSelectedDay: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setSelectedDay } = scheduleSlice.actions;
export default scheduleSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface ScheduleState {
//   selectedDay: string; // ISO string
//   weekOffset: number; // 0 = current week, -1 = last week, etc.
// }

// const todayISO = new Date().toISOString();

// const initialState: ScheduleState = {
//   selectedDay: todayISO,
//   weekOffset: 0,
// };

// const scheduleSlice = createSlice({
//   name: "schedule",
//   initialState,
//   reducers: {
//     setSelectedDay: (state, action: PayloadAction<string>) => {
//       state.selectedDay = action.payload;
//     },
//     setWeekOffset: (state, action: PayloadAction<number>) => {
//       state.weekOffset = action.payload;
//     },
//   },
// });

// export const { setSelectedDay, setWeekOffset } = scheduleSlice.actions;
// export default scheduleSlice.reducer;
