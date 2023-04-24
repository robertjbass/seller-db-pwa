import { User } from "firebase/auth";
import { signOut } from "@/services/firebase";
import React, { createContext, useReducer } from "react";
import { upperSnakeToCamel } from "./helpers";

type Action = { type: string; payload?: any };

export type Preview = {
  id: number;
  selected: boolean;
  name: string;
  photo: string;
  tag: string;
};

export type View = "home" | "camera" | "preview";

type State = {
  user: User | null;
  globalLoading: boolean;
  previews: Preview[];
  view: View;
  selectedPreviews: Preview[];
  setGlobalLoading: (loading: boolean) => void;
  setUser: (user: User) => void;
  logOut: () => void;
  setView: (view: View) => void;
  setPreviews: (previews: Preview[]) => void;
  setSelectedPreviews: (selectedPreviews: Preview[]) => void;
};

const cachedUser = localStorage.getItem("sellerDbUser") || null;

const initialState: State = {
  user: cachedUser ? JSON.parse(cachedUser) : null,
  globalLoading: false,
  previews: [],
  view: "home",
  selectedPreviews: [],
  setGlobalLoading: () => {},
  setUser: () => {},
  logOut: () => {},
  setView: () => {},
  setPreviews: () => {},
  setSelectedPreviews: () => {},
};

const reducer = (state: State, action: Action) => {
  const varName = upperSnakeToCamel(action.type);
  const newState = { ...state, [varName]: action.payload };
  return newState;
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = (user: User) => {
    localStorage.setItem("sellerDbUser", JSON.stringify(user));
    dispatch({ type: "SET_USER", payload: user });
  };

  const setGlobalLoading = (globalLoading: boolean) => {
    dispatch({ type: "SET_GLOBAL_LOADING", payload: globalLoading });
  };

  const logOut = () => {
    signOut();
    dispatch({ type: "SET_USER", payload: null });
    localStorage.removeItem("sellerDbUser");
  };

  const setView = (view: View) => {
    dispatch({ type: "SET_VIEW", payload: view });
  };

  const setPreviews = (previews: Preview[]) => {
    dispatch({ type: "SET_PREVIEWS", payload: previews });
  };

  const setSelectedPreviews = (selectedPreviews: Preview[]) => {
    dispatch({ type: "SET_SELECTED_PREVIEWS", payload: selectedPreviews });
  };

  const actions = {
    setUser,
    setGlobalLoading,
    logOut,
    setPreviews,
    setView,
    setSelectedPreviews,
  };

  const stateValues: State & typeof actions = {
    ...state,
    ...actions,
  };

  return (
    <GlobalContext.Provider value={stateValues}>
      {children}
    </GlobalContext.Provider>
  );
};
