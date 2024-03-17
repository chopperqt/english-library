import type { AuthRequests } from "@api/auth.api"
import type { LibraryRequests } from "@api/library.api"

export interface Statuses {
  isLoading: boolean
  isError: boolean
  isFetched: boolean
}

export interface StatusesPayload extends Partial<Statuses> {
  name: Requests
}

export type Requests = AuthRequests | LibraryRequests
