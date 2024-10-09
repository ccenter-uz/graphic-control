import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@pages/home";
import LoginPage from "@pages/login";
import UserProfile from "@pages/user-profile";

import "./i18n/config";

const router = createBrowserRouter([
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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
