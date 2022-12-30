/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import "./index.css";
import LoginPage from "./Components/Login/LoginPage";
import axios from "axios";
import HomePage from "./pages/HomePage";
import { GiStopwatch } from "react-icons/gi";
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
      <div className="bg-gray-100 hidden md:block">
        {isLogin ? (
          <HomePage
            setIsLogin={setIsLogin}
            refresh={{ refresh: refresh, setRefresh: setRefresh }}
          />
        ) : (
          <LoginPage setIsLogin={setIsLogin} />
        )}
      </div>
      <div className="md:hidden block">
        <h1 className="text-2xl flex mt-10 p-4 items-center justify-center font-semibold gap-x-1">
          <span>
            <GiStopwatch
              className="inline"
              color="rgb(59 130 246)"
              size={"2rem"}
            />
          </span>
          Study
          <span className="text-blue-500 ">Time</span>
        </h1>
        <div className="flex flex-col mt-10 items-center justify-center">
          <h3 className="text-xl w-3/4 text-center">
            Please try on desktop/tablet.
          </h3>

          <h3>
            <span className="text-gray-400">
              Responsive design coming soon!
            </span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default App;
