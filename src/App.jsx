import Login from "./pages/auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouteProtector from "./utils/RouteProtector";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  const userToken = JSON.parse(localStorage.getItem('accessToken'));
  setIsLoggedIn(!!userToken); // sets true only if token exists
}, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
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
