import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action) {
      return {
        content: action.payload,
      };
    },

    removeNotification(state, action) {
      return { content: action.payload };
    },
  },
});

export const setNotification = (message, ms) => {
  return async (dispatch) => {
    dispatch(addNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, ms);
  };
};

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
