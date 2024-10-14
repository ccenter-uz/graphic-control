import { RouterProvider } from "react-router-dom";

import "./i18n/config";
import { router } from "./router/routerProvider";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
