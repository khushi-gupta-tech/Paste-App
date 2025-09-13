import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";

const pasteSlice = createSlice({
  name: "paste",
  initialState: {
    pastes: localStorage.getItem("pastes")
      ? JSON.parse(localStorage.getItem("pastes"))
      : [],
  },
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      // add a check -> Paste already exist wala case
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste Created Sucessfully");
    },
    UpdateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated");
      }
    },
    resetAllPaste: (state) => {
      state.pastes = [];

      localStorage.removeItem("pastes");
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted");
      }
    },
  },
});
export const { addToPaste, UpdateToPaste, resetAllPaste, removeFromPaste } =
  pasteSlice.actions;
export default pasteSlice.reducer;
