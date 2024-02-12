import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import UserInfo from "./pages/UserInfo";
import useAuthStore from "./zustand/AuthStore";
import Home from "./pages/Home";
import TablePage from "./pages/TablePage";
import useMembershipUpdate from "./UseMembershipUpdate";
import { ReactNode, useEffect } from "react";
import UsersList from "./pages/UsersList";
import Statistics from "./pages/Statistics";
import Layout from "./components/Layout";

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

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [])

  return (
    <TimerProvider>
      {user && <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/userList" element={<UsersList />} />
          <Route path="/user" element={<UserInfo />} />
          <Route path="/tableList" element={<TablePage />} />
        </Routes>
      </Layout>}
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </TimerProvider>
  );
}

export default App;
