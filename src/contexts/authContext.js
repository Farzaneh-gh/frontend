import { createContext } from "react";

const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userInfos: {},
  login: () => {},
  logout: () => {},
});

export default AuthContext;
