import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData?.user) {
      setUser(authData.user);
    }
  }, []);

  const singIn = async ({ userName, password }) => {
    const response = await fetch(`http://localhost:4200/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        password: password,
      }),
    });

    if (!response.ok) {
      setUser(null);
      return;
    }

    setUser(userName);

    localStorage.setItem(
      "authData",
      JSON.stringify({ user: userName, isAuthenticated: true })
    );
    console.log(user);
    nav("/home");
  };

  const logOut = () => {
    setUser(null);
    localStorage.clear();
    console.log(user);
    nav("/login");
  };

  const registration = async ({ userName, password, email, position }) => {
    const response = await fetch("http://localhost:4200/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: email,
        password: password,
        lastlogin: new Date().toLocaleString(),
        status: "active",
        position: position,
      }),
    });

    if (!response.ok) {
      setUser(null);

      return;
    }

    setUser(userName);

    localStorage.setItem(
      "authData",
      JSON.stringify({ user: userName, isAuthenticated: true })
    );

    nav("/home");
  };

  const value = {
    user,
    singIn,
    logOut,
    registration,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
