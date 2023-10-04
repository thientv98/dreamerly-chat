import { Navigate, useLocation } from "react-router-dom";

import { FC, useState } from "react";

const PrivateRoute = ({ children }: { children: any}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const location = useLocation();

  if (!isLoggedIn)
    return (
      <Navigate
        to={`/sign-in?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`}
      />
    );

  return <>{children}</>;
};

export default PrivateRoute;
