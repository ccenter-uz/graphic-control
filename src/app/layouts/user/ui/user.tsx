import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const UserLayout = () => {
  const token = localStorage.getItem("GCToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <>
      <Outlet />
    </>
  );
};
