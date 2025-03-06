import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SwipeHandler from "@shared/ui/swipe-handler";

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
      <SwipeHandler>
        <Outlet />
      </SwipeHandler>
    </>
  );
};
