import { createSlice } from "@reduxjs/toolkit";

export const ResultsSlice = createSlice({
  name: "search_results",
  initialState: {
    GoogleResults: [],
    BingResults: [],
  },

  reducers: {
    addGoogle: (state, action) => {
      state.GoogleResults = action.payload;
    },

    addBing: (state, action) => {
      state.BingResults = action.payload;
    },

    clear: (_state) => ({GoogleResults: [], BingResults: []})
  },
});

export const { addBing, addGoogle, clear } = ResultsSlice.actions;

export default ResultsSlice.reducer;
