import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const LoginLayout = () => {
  const token = localStorage.getItem("GCToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate(-1);
    }
  }, [token, navigate]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
