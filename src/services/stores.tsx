import { configureStore } from "@reduxjs/toolkit";

import LibraryStore from "./library/Library.store";
import UserStore from "./user/User.store";
import LoadingStore from "./loading/Loading.store";
import PaginationStore from "./pagination/Pagination.store";
import SearchStore from "./search/Search.store";

export const store = configureStore({
  reducer: {
    LibraryStore,
    UserStore,
    LoadingStore,
    PaginationStore,
    SearchStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
