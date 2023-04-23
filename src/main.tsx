import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalProvider, GlobalContext } from "@/context/GlobalContext";
import Login from "@/components/Login";
import "@/index.css";
import Loading from "@/components/Loading";

const AppRouter = () => {
  const { user, globalLoading } = useContext(GlobalContext);

  return (
    <>
      {globalLoading && <Loading />}
      <BrowserRouter>
        {user ? (
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalProvider>
      <AppRouter />
    </GlobalProvider>
  </React.StrictMode>
);
