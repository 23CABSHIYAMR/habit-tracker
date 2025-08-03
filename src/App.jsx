import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";
import WeekPage from "./pages/WeekPage";
import MonthPage from "./pages/MonthPage";
import YearPage from "./pages/YearPage";
import AllTimePage from "./pages/AllTimePage";
import AuthPage from "./authUser/authPage/AuthPage";
import { useAuth } from "./authUser/AuthContext";

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <AuthPage />;
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <AuthPage />,
        },
        {
          path: "Week",
          element: <PrivateRoute element={<WeekPage />} />,
        },
        {
          path: "Month",
          element: <PrivateRoute element={<MonthPage />} />,
        },
        {
          path: "Year",
          element: <PrivateRoute element={<YearPage />} />,
        },
        {
          path: "All-Time",
          element: <PrivateRoute element={<AllTimePage />} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
