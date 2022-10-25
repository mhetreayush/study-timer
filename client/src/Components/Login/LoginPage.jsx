import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useState } from "react";
import { GiStopwatch } from "react-icons/gi";
import { ReactComponent as LoginLogo } from "../../assets/loginPageIll.svg";
// Illustration link: https://www.freepik.com/free-vector/learning-concept-illustration_14230944.htm#query=study%20time&position=1&from_view=search&track=sph
const LoginPage = ({ setIsLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div className="grid grid-cols-10 h-[100vh]">
      <div className="col-span-6 bg-gradient-to-t from-yellow-600 to-yellow-300 border-white">
        <LoginLogo className="w-full h-full drop-shadow" />
      </div>
      <div className="col-span-4 py-4 px-10">
        <h1 className="text-2xl font-semibold flex items-center gap-x-1 ">
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
        <div className="flex h-fit my-20">
          {isSignup ? (
            isSignup && <SignupForm setIsSignup={setIsSignup} />
          ) : (
            <LoginForm setIsLogin={setIsLogin} setIsSignup={setIsSignup} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
