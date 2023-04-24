import { User } from "firebase/auth";
import { signOut } from "@/services/firebase";
import React, { createContext, useReducer } from "react";
import { getFromCache, upperSnakeToCamel } from "./helpers";

type Action = { type: string; payload?: any };

type State = {
  user: User | null;
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
  setUser: (user: User) => void;
  logOut: () => void;
};

const initialState: State = {
  user: getFromCache("user") || null,
  globalLoading: false,
  setGlobalLoading: () => {},
  setUser: () => {},
  logOut: () => {},
};

const reducer = (state: State, action: Action) => {
  const varName = upperSnakeToCamel(action.type);
  const newState = { ...state, [varName]: action.payload };
  localStorage.setItem("sellerDbCache", JSON.stringify(newState));
  return newState;
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = (user: User) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const setGlobalLoading = (globalLoading: boolean) => {
    dispatch({ type: "SET_GLOBAL_LOADING", payload: globalLoading });
  };

  const logOut = () => {
    signOut();
    dispatch({ type: "SET_USER", payload: null });
    localStorage.removeItem("sellerDbCache");
  };

  const actions = {
    setUser,
    setGlobalLoading,
    logOut,
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
