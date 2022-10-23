import React, { useState, useEffect } from "react";
import "./index.css";
import LoginPage from "./Components/Login/LoginPage";
import axios from "axios";
import HomePage from "./pages/HomePage";

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const verified = await axios.get("user/verify", {
          headers: { Authorization: token },
        });
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);
  return (
    <>
      {isLogin ? (
        <HomePage
          setIsLogin={setIsLogin}
          refresh={{ refresh: refresh, setRefresh: setRefresh }}
        />
      ) : (
        <LoginPage setIsLogin={setIsLogin} />
      )}
    </>
  );
};

export default App;
