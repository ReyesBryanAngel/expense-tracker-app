import Login from "./pages/auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouteProtector from "./utils/RouteProtector";
import DashboardPage from "./pages/DashboardPage";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import AccountVerifiedPage from "./pages/AccountVerifiedPage";
import ApplicationLayout from "./layouts/ApplicationLayout";
import TransactionPage from "./pages/TransactionPage";
import BillsPage from "./pages/BillsPage";

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
          <Route path="/account-verified/:verificationToken" element={<AccountVerifiedPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ChangePassword />} />
          <Route path="/dashboard"
            element={
              <RouteProtector isLoggedIn={isLoggedIn}>
                <ApplicationLayout>
                  <DashboardPage />
                </ApplicationLayout>
              </RouteProtector>
            }
          />
          <Route path="/transactions"
            element={
              <RouteProtector isLoggedIn={isLoggedIn}>
                <ApplicationLayout>
                  <TransactionPage />
                </ApplicationLayout>
              </RouteProtector>
            }
          />
           <Route path="/bills"
            element={
              <RouteProtector isLoggedIn={isLoggedIn}>
                <ApplicationLayout>
                  <BillsPage />
                </ApplicationLayout>
              </RouteProtector>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
