import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        content: action.payload,
      };
    },

    removeNotification(state, action) {
      return { content: action.payload };
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
