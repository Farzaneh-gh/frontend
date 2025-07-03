import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function PAdminPrivate({ children }) {
  const { userInfos, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && userInfos?.role !== "ADMIN") {
      navigate("/");
    }
  }, [isLoggedIn, userInfos, navigate]);

  // While loading user info, optionally show nothing or a loader
  if (!userInfos) return null;

  return <>{children}</>;
}
