import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
let timeoutId = 0;

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
  //console.log("Timeout:" + timeoutId);
  return async (dispatch) => {
    clearTimeout(timeoutId);
    dispatch(addNotification(message));
    timeoutId = setTimeout(() => {
      dispatch(removeNotification());
    }, ms);
  };
};

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
