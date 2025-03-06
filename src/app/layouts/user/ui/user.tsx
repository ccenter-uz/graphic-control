import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SwipeBack from "@shared/ui/swipe-back";

export const UserLayout = () => {
  // Navigate to the login page if in the user's local storage does not have a token
  const token = localStorage.getItem("GCToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <>
      <SwipeBack />
      <Outlet />
    </>
  );
};
