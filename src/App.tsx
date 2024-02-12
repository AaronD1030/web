import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import UserInfo from "./pages/UserInfo";
import useAuthStore from "./zustand/AuthStore";
import Home from "./pages/Home";
import TablePage from "./pages/TablePage";
import useMembershipUpdate from "./UseMembershipUpdate";
import { ReactNode } from "react";

interface TimerProviderProps {
  children: ReactNode;
}

function TimerProvider({ children }: TimerProviderProps) {
  useMembershipUpdate();
  // You can provide additional context or state here if needed

  return children;
}

function App() {
  const user = useAuthStore((state) => state.user);

  useMembershipUpdate();

  return (
    <TimerProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tableList" element={<TablePage />} />
      </Routes>
    </TimerProvider>
  );
}

export default App;
