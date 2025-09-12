import { configureStore } from "@reduxjs/toolkit";
import PasteReducer from "./redux/pasteSlice";

const store = configureStore({

    reducer:{
        paste:PasteReducer,
    },
})

export default store;