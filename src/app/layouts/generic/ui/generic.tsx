import LoginLayout from "../../login/ui/login";
import { UserLayout } from "../../user/ui/user";

export const GenericLayout = () => {
  const token = localStorage.getItem("GCToken");
  return token ? <UserLayout /> : <LoginLayout />;
};
