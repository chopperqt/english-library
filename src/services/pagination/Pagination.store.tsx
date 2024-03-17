import { createSlice, createSelector } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@services/stores";

export interface PaginationState {
  page: number;
  amountOfPages: number;
}

const initialState: PaginationState = {
  page: 1,
  amountOfPages: 1,
};

const PaginationStore = createSlice({
  name: "PaginationStore",
  initialState,
  reducers: {
    handleIncreasePage: (state) => {
      state.page = state.page + 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setAmountOfPages: (state, action: PayloadAction<number>) => {
      state.amountOfPages = action.payload;
    },
  },
});

export const { handleIncreasePage, setPage, setAmountOfPages } =
  PaginationStore.actions;

export const getPage = createSelector(
  (state: RootState) => state.PaginationStore,
  (item) => item.page
);

export const getAmountOfPages = createSelector(
  (state: RootState) => state.PaginationStore,
  (item) => item.amountOfPages
);

export default PaginationStore.reducer;
