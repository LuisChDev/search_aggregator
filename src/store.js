import { configureStore } from "@reduxjs/toolkit";
import resultsReducer from "./redux/ResultsSlice";

export default configureStore({
  reducer: {
    results: resultsReducer,
  }
});
