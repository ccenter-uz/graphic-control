import { createBrowserRouter, Navigate } from "react-router-dom";

import Error from "@pages/error";
import Home from "@pages/home";
import LoginPage from "@pages/login";
import MyCurrentSchedule from "@pages/my-current-schedule";
import NewPreference from "@pages/new-preference";
import NewPreferenceStep1 from "@pages/new-preference-step-1";
import NewPreferenceStep2 from "@pages/new-preference-step-2";
import SelectSupervisor from "@pages/select-supervisor";
import SupervisorsSchedule from "@pages/supervisors-schedule";
import UserProfile from "@pages/user-profile";

import { NewPreferenceStepsLayout } from "../layouts";

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
    path: "/new-preference",
    element: <NewPreference />,
  },
  {
    path: "/new-preference/select-supervisor",
    element: <SelectSupervisor />,
  },
  {
    path: "/new-preference/select-supervisor/:id/:supervisor",
    element: <SupervisorsSchedule />,
  },
  {
    path: "*",
    element: <Error errorNumber="404" errorMessage="Страница не найдена" />,
  },
  {
    path: "/new-preference/steps",
    element: <NewPreferenceStepsLayout backLinkTo="/new-preference" />,
    children: [
      {
        index: true,
        element: <Navigate to="/new-preference/steps/1" replace />,
      },
      {
        path: "/new-preference/steps/1",
        element: <NewPreferenceStep1 />,
      },
      {
        path: "/new-preference/steps/2",
        element: <NewPreferenceStep2 />,
      },
    ],
  },
]);
