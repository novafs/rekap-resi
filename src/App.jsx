"use client";

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import SignInPage from "./pages/Auth/SignIn.jsx";
import SignupPage from "./pages/Auth/SignUp.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ListResiPage from "./pages/Dashboard/ListResi.jsx";
import AddResiPage from "./pages/Dashboard/AddResi.jsx";
import ScanResiPage from "./pages/Dashboard/ScanResi.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes
      // <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
      // <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} />} />

      {/* Dashboard Routes */}
        {/* <Route path="/dashboard/*" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}>
        <Route index element={<Dashboard />} />
        <Route path="daftar-resi" element={<ListResi />} />
        <Route path="tambah-resi" element={<AddResi />} />
        <Route path="scan-resi" element={<ScanResi />} />
      </Route> */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="list-resi" element={<ListResiPage />} />
          <Route path="add-resi" element={<AddResiPage />} />
          <Route path="scan-resi" element={<ScanResiPage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignupPage />} />

        {/* Redirect to login on root */}
        <Route path="/*" element={<Navigate to="/dashboard"/>} />
      </Routes>
    </BrowserRouter>
  );
}
