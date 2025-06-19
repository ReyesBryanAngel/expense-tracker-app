import Login from "./pages/auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouteProtector from "./utils/RouteProtector";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePassword from "./pages/auth/ChangePassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('accessToken'));
    setIsLoggedIn(!!userToken);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ChangePassword />} />
          <Route path="/dashboard" element={<RouteProtector isLoggedIn={isLoggedIn}>
            <Dashboard />
          </RouteProtector>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
