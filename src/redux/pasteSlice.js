import { createSlice } from "@reduxjs/toolkit";

const pasteSlice = createSlice({
  name: "paste",
  initialState: {
    pastes: localStorage.getItem("pastes")
      ? JSON.parse(localStorage.getItem("pastes"))
      : [],
  },
  reducers: {
    addToPaste: (state, action) => {
      state.pastes.push(action.payload);
    },

  },
});
export const { addToPaste, UpdateToPaste, resetAllPaste, removeFromPaste } =
  pasteSlice.actions;
export default pasteSlice.reducer;
