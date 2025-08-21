import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";
import WeekPage from "./pages/WeekPage";
import MonthPage from "./pages/MonthPage";
import YearPage from "./pages/YearPage";
import AllTimePage from "./pages/AllTimePage";
import AuthPage from "./authUser/authPage/AuthPage";
import { AuthProvider, useAuth } from "./authUser/AuthContext"; 

// Private route wrapper
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" replace />;
};

const App = () => {
  const router = createBrowserRouter([
    // Auth route
    {
      path: "/auth",
      element: <AuthPage />,
    },
    // Logged-in routes
    {
      path: "/",
      element: (
        <PrivateRoute>
          <AppLayout />
        </PrivateRoute>
      ),
      children: [
        { path: "Week", element: <WeekPage /> },
        { path: "Month", element: <MonthPage /> },
        { path: "Year", element: <YearPage /> },
        { path: "All-Time", element: <AllTimePage /> },
        { index: true, element: <Navigate to="/Week" replace /> }, // default redirect after login
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
