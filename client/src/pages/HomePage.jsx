import StudyTime from "../Components/StudyTime/timer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdLightMode } from "react-icons/md";
const InputForm = ({ moreThan24Hours, hoursToWait, lastUpdated }) => {
  console.log("inside, ", lastUpdated);
  console.log(moreThan24Hours);
  const [noOfHours, setNoOfHours] = useState(8);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(hoursToWait !== 0);
  }, [hoursToWait]);

  const CreateTimer = async () => {
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const newTimer = { noOfHoursStudied: noOfHours };
        await axios.post("/api/studyTimer", newTimer, {
          headers: { Authorization: token },
        });
      }
      axios.post(
        "/api/studyTimer/",
        { noOfHours },
        {
          headers: { Authorization: token },
        }
      );
      toast.success("Timer created successfully");
      setDisabled(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <div className="relative">
      <div
        className={`absolute h-full w-full rounded-md bg-transparent p-8 z-50 ${
          disabled ? "" : "hidden"
        }`}
      ></div>
      <div
        className={`${disabled ? "transition duration-1000 grayscale" : ""}`}
      >
        <h1>Number of hours studied:</h1>
        <div className="grid grid-cols-2 h-[10rem] gap-x-8 drop-shadow">
          <div className="h-full p-4 grid grid-cols-2 gap-x-8 justify-start items-center w-full border-blue-500 border-2 rounded-md">
            <div>
              <h1 className="text-8xl text-center font-black text-blue-500">
                {noOfHours}
              </h1>
            </div>
            <div className="flex flex-col h-full gap-y-4 py-5 justify-center items-center">
              <button
                onClick={(e) => {
                  if (noOfHours < 24) {
                    setNoOfHours(noOfHours + 1);
                  } else {
                    setNoOfHours(24 - noOfHours);
                  }
                }}
                className="w-full h-full rounded-md bg-blue-500 text-white font-semibold text-2xl"
              >
                +
              </button>
              <button
                onClick={(e) => {
                  if (noOfHours > 0) {
                    setNoOfHours(noOfHours - 1);
                  } else {
                    setNoOfHours(24 - noOfHours);
                  }
                }}
                className="w-full h-full rounded-md bg-blue-500 text-white font-semibold text-2xl"
              >
                -
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 h-full">
            <button
              onClick={() => CreateTimer()}
              className="w-full h-full rounded-md bg-blue-500 text-white font-semibold text-2xl"
            >
              Submit
            </button>
            <button
              onClick={() => setNoOfHours(0)}
              className="w-full h-full rounded-md bg-blue-500 text-white font-semibold text-2xl"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {hoursToWait !== 0 && (
        <h1 className="text-center my-5 text-red-500 font-semibold drop-shadow text-lg">
          You need to wait {hoursToWait} hours before adding a new time.
          <br />
          Last updated on: {lastUpdated}
          <br />
        </h1>
      )}
    </div>
  );
};

const HomePage = ({ setIsLogin }) => {
  const [moreThan24Hours, setMoreThan24Hours] = useState(false);
  const [hoursToWait, setHoursToWait] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    const getTimers = async (token) => {
      const res = await axios.get("/api/studyTimer/", {
        headers: { Authorization: token },
      });
      console.log(res.data.length);
      if (res.data.length > 0) {
        const then = new Date(res.data[res.data.length - 1].createdAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - then.getTime());
        const hours = Math.floor(diffTime / (1000 * 60 * 60));
        setMoreThan24Hours(hours >= 24);
        setHoursToWait(24 - hours);
        setChartData(res.data);
        setLastUpdated(then.toLocaleString());
        // console.log(then);

        setUsername(res.data[0].name);
      } else setMoreThan24Hours(true);
      console.log(res.data);
      console.log(moreThan24Hours);
      console.log(hoursToWait);
    };
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getTimers(token);
    }
  }, []);
  return (
    <div className="h-screen bg-gray-100">
      {/*Navbar*/}
      <div className="w-full p-4 flex justify-between dark:bg-gray-600 dark:text-white fixed">
        <div>
          <h1>StudyTime</h1>
        </div>
        <div className="flex gap-x-4">
          <button>
            <MdLightMode />
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              localStorage.clear();
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {/*Body*/}
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-6 h-screen pt-20 px-4 justify-center border-r-8 border-dotted">
          <h1 className="">Hello, {username}</h1>
          <div className="mt-10 flex flex-col gap-y-20">
            <div className="p-4 rounded-md bg-white drop-shadow">
              <InputForm
                moreThan24Hours={moreThan24Hours}
                hoursToWait={hoursToWait}
                lastUpdated={lastUpdated}
              />
            </div>
            <div className="p-4 rounded-md bg-white drop-shadow">
              <h1>Quote for the day:</h1>
              <br />
              <p className="italic ">"Quote"</p>
              <p className="text-end">- Author</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 pt-20">
          <StudyTime chartData={chartData} />
        </div>
      </div>
      <ToastContainer duration={1000} position="bottom-left" />
    </div>
  );
};

export default HomePage;
