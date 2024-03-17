import supabase from "./client";

export type AuthRequests =
  | "loginWithGoogle"
  | "signUp"
  | "validateEmail"
  | "deleteUser"
  | "login"
  | "getUser"
  | "signIn";

export type UserEmail = string;
export type UserID = string;
export type UserPassword = string;

export interface LoginData {
  login: string;
  password: string;
}

export const logOut = async (): Promise<any | null> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return error;
  }

  return null;
};
