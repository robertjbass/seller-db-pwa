import { User } from "firebase/auth";
import React, { createContext, useReducer } from "react";

type Action = {
  type: any;
  payload?: any;
};

type State = {
  user: User | null;
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
  setUser: (user: User) => void;
};

const initialState: State = {
  user: null,
  globalLoading: localStorage.getItem("globalLoading") === "true" || false,
  setGlobalLoading: () => {},
  setUser: () => {},
};

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("globalLoading", JSON.stringify(false));
      return { ...state, user: action.payload };
    case "SET_GLOBAL_LOADING":
      localStorage.setItem("globalLoading", JSON.stringify(action.payload));
      return { ...state, globalLoading: action.payload };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user: User) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const setGlobalLoading = (globalLoading: boolean) => {
    dispatch({ type: "SET_GLOBAL_LOADING", payload: globalLoading });
  };

  const actions = {
    setUser,
    setGlobalLoading,
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
