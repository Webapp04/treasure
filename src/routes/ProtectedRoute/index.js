import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "redux/slice/userSlice";

const ProtectedRoute = ({ Component }) => {
  const user = useSelector(selectUser);

  const location = useLocation();

  const isUser = !!user?._id;

  const RedirectBack = () => {
    const navigate = useNavigate();
    useEffect(() => navigate(-1), []); // eslint-disable-line react-hooks/exhaustive-deps
    return null;
  };

  if (isUser) {
    switch (location?.pathname) {
      case "/dashboard": {
        return <Component />;
      }
      default: {
        return <Component />;
      }
    }
  }

  return <RedirectBack />;
};

export default ProtectedRoute;
