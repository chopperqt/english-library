import type { Requests } from "@models/Loading.models";
import { setLoading } from "@services/loading/Loading.store";
import { store } from "@services/stores";

export const loadingController = (request: Requests) => {
  const handleSetSuccess = () => {
    store.dispatch(setLoading({
      name: request,
      isLoading: false,
      isFetched: true,
      isError: false,
    }))
  }

  const handleSetError = () => {
    store.dispatch(setLoading({
      name: request,
      isLoading: false,
      isFetched: true,
      isError: true,
    }))
  }

  const handleSetPending = () => {
    store.dispatch(setLoading({
      name: request,
      isLoading: true,
      isError: false,
    }))
  }



  return {
    handleSetError,
    handleSetPending,
    handleSetSuccess,
  }
}
