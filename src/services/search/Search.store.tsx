import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit";

import type { WordApi } from "@models/Library.models";
import type { RootState } from "@services/stores";

interface SearchState {
  searchWords: WordApi[];
}

const initialState: SearchState = {
  searchWords: [],
};

const SearchStore = createSlice({
  name: "SearchStore",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchWords = [];
    },
    setSearchWords: (state, payload: PayloadAction<WordApi[]>) => {
      state.searchWords = payload.payload;
    },
  },
});

export const { clearSearch, setSearchWords } = SearchStore.actions;

export const getSearchWords = createSelector(
  (state: RootState) => state.SearchStore,
  (items) => items.searchWords
);

export default SearchStore.reducer;
