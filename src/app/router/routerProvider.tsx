import { createBrowserRouter, Navigate } from "react-router-dom";

// eslint-disable-next-line no-restricted-imports
import LoginLayout from "@app/layouts/login/ui/login";

import { Done } from "@pages/done";
import { Error } from "@pages/error";
import { Home } from "@pages/home";
import { LoginPage } from "@pages/login";
import { MyCurrentSchedule } from "@pages/my-current-schedule";
import { MyPreferences } from "@pages/my-preferences";
import { NewPreference } from "@pages/new-preference";
import { NewPreferenceStep1 } from "@pages/new-preference-step-1";
import { NewPreferenceStep2 } from "@pages/new-preference-step-2";
import { NewPreferenceStep3 } from "@pages/new-preference-step-3";
import { NewPreferenceStep4 } from "@pages/new-preference-step-4";
import { Schedules } from "@pages/schedules";
import { SelectSupervisor } from "@pages/select-supervisor";
import { SinglePreference } from "@pages/single-preference";
import { SingleSchedule } from "@pages/single-schedule";
import { SupervisorsSchedule } from "@pages/supervisors-schedule";
import { UserProfile } from "@pages/user-profile";

import {
  GenericLayout,
  NewPreferenceStepsLayout,
  UserLayout,
} from "../layouts";

export const router = createBrowserRouter([
  {
    element: <GenericLayout />,
    children: [
      {
        path: "/",
        element: <UserLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/user",
            element: <UserProfile />,
          },
          {
            path: "/select-month/my-schedule",
            element: <MyCurrentSchedule />,
          },
          {
            path: "/schedules",
            element: <Schedules />,
          },
          {
            path: "/schedules/single-schedule/:id",
            element: <SingleSchedule />,
          },
          {
            path: "/my-preferences",
            element: <MyPreferences />,
          },
          {
            path: "/my-preferences/single-preference/:id",
            element: <SinglePreference />,
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
            path: "/new-preference/select-supervisor/:id",
            element: <SupervisorsSchedule />,
          },
          {
            path: "/done",
            element: <Done />,
          },
          {
            path: "/error",
            element: <Error />,
          },
          {
            path: "*",
            element: (
              <Error errorNumber="404" errorMessage="Страница не найдена" />
            ),
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
                path: "1",
                element: <NewPreferenceStep1 />,
              },
              {
                path: "2",
                element: <NewPreferenceStep2 />,
              },
              {
                path: "3",
                element: <NewPreferenceStep3 />,
              },
              {
                path: "4",
                element: <NewPreferenceStep4 />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <LoginLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Error errorNumber="404" errorMessage="Страница не найдена" />,
  },
]);
