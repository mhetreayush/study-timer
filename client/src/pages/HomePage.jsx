import { GiStopwatch } from "react-icons/gi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnalysisChart from "../Components/AnalysisChart/AnalysisChart";
import ToDoList from "../Components/ToDoList/ToDoList";

const HomePage = ({ setIsLogin }) => {
  return (
    <div>
      {/*Navbar*/}
      <div className="z-50 w-full p-4 drop-shadow text-2xl flex justify-between bg-white text-blue-500 fixed">
        <div>
          <h1 className="text-black  font-semibold flex items-center gap-x-1 ">
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
        </div>
        <div className="flex gap-x-4">
          {/* <DarkMode /> */}
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-md text-xl"
            onClick={() => {
              setIsLogin(false);
              localStorage.setItem("tokenStore", "");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {/*Body*/}
      <AnalysisChart />
      <ToDoList />
      <ToastContainer duration={1000} position="bottom-left" />
    </div>
  );
};

export default HomePage;
