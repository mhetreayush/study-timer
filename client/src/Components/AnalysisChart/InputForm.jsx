/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const InputForm = ({
  moreThan24Hours,
  hoursToWait,
  lastUpdated,
  setIsUpdatedNow,
}) => {
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
      setIsUpdatedNow((prevState) => !prevState);
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
        <h1 className="mb-4">Number of hours studied today:</h1>
        <div className="sm:grid grid-cols-2 md:h-[10rem] gap-x-8 drop-shadow">
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
                className="w-2/4 md:w-full h-full rounded-md bg-blue-500 text-white font-semibold text-2xl"
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
                className="w-2/4 md:w-full h-full rounded-md bg-blue-500 text-white font-semibold text-2xl"
              >
                -
              </button>
            </div>
          </div>
          <div className="flex md:flex-col gap-4 h-full py-4 md:py-0">
            <button
              onClick={() => CreateTimer()}
              className="w-2/4 md:w-full h-full rounded-md py-4 md:py-0 bg-blue-500 text-white font-semibold text-2xl"
            >
              Submit
            </button>
            <button
              onClick={() => setNoOfHours(0)}
              className="w-2/4 md:w-full h-full rounded-md py-4 md:py-0 bg-blue-500 text-white font-semibold text-2xl"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {hoursToWait > 0 && (
        <div>
          <h1 className="md:text-center my-5 text-blue-500 font-medium drop-shadow text-lg">
            You need to wait {hoursToWait} hours before adding a new time.
            <br />
            Last updated on: {lastUpdated}
            <br />
          </h1>
        </div>
      )}
    </div>
  );
};

export default InputForm;
