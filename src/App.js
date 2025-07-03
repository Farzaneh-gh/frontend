import React, { useCallback, useEffect } from "react";
import routes from "./route";
import { useRoutes } from "react-router-dom";
import AuthContext from "./contexts/authContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const navigate = useNavigate();
  const [userInfos, setUserInfos] = React.useState(null);

  const [token, setToken] = React.useState(null);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const login = useCallback((userData, token) => {
    Cookies.set("user", token, {
      path: "/", // cookie available to entire site
      secure: true, // only over HTTPS
    });
    setToken(token);
    setIsLoggedIn(true);
    setUserInfos(userData);
  },[]);

  const logout = useCallback(() => {
    Cookies.remove("user");
    setToken(null);
    setIsLoggedIn(false);
    setUserInfos({});
  },[]);

  useEffect(() => {

    const getMe = async () => {
      const token = Cookies.get("user");
      if (token) {
        setToken(token);

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          if (response.status === 200) {
            setIsLoggedIn(true);
            setUserInfos(data);
          }
        } catch (err) {
          navigate("/");
        }
      }
    };
    getMe();


  }, [login,logout,token]);



  const routeElements = useRoutes(routes);
  return (
    <AuthContext.Provider
      value={{
        userInfos,
        token,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {routeElements}
    </AuthContext.Provider>
  );
}

export default App;
