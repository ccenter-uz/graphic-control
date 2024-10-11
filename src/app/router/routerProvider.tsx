import { createBrowserRouter } from "react-router-dom";

import Home from "@pages/home";
import LoginPage from "@pages/login";
import MyCurrentSchedule from "@pages/my-current-schedule";
import UserProfile from "@pages/user-profile";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user",
    element: <UserProfile />,
  },
  {
    path: "/my-current-schedule",
    element: <MyCurrentSchedule />,
  },
]);
