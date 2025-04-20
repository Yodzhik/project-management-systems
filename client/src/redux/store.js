import { configureStore } from '@reduxjs/toolkit';
import boards from "./reducers/boards.js";
import issues from "./reducers/issues.js";

export const store =  configureStore({
    reducer: {
        boards: boards,
        issues: issues
    },
});
