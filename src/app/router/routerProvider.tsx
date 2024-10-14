import { createBrowserRouter } from "react-router-dom";

import Home from "@pages/home";
import LoginPage from "@pages/login";
import MyCurrentSchedule from "@pages/my-current-schedule";
import SelectShedule from "@pages/select-schedule";
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
  {
    path: "/select-schedule",
    element: <SelectShedule />,
  },
]);
