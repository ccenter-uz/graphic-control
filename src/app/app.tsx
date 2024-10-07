import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "@pages/login";
import "./i18n/config";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
