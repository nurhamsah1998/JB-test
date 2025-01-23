import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  const cookie = new Cookies();
  const token = cookie.get("access_token");
  return token ? (
    <div>
      <DashboardLayout />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;
