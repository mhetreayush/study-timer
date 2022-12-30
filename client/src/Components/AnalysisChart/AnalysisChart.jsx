import { useState, useEffect } from "react";
import axios from "axios";
import StudyTime from "./Timer";
import InputForm from "./InputForm";
const AnalysisChart = () => {
  const [moreThan24Hours, setMoreThan24Hours] = useState(false);
  const [hoursToWait, setHoursToWait] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [updatedNow, setIsUpdatedNow] = useState(false);
  useEffect(() => {
    const getTimers = async (token) => {
      const res = await axios.get("/api/studyTimer/", {
        headers: { Authorization: token },
      });
      const getUser = await axios.get("user/verify", {
        headers: { Authorization: token },
      });
      setUsername(getUser.data.username);
      if (res.data.length > 0) {
        const then = new Date(res.data[res.data.length - 1].createdAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - then.getTime());
        const hours = Math.floor(diffTime / (1000 * 60 * 60));
        setMoreThan24Hours(hours >= 24);
        setHoursToWait(24 - hours >= 0 ? 24 - hours : 0);
        setChartData(res.data);
        setLastUpdated(then.toLocaleString());
      } else setMoreThan24Hours(true);
    };
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getTimers(token);
    }
  }, [updatedNow]);
  return (
    <div className="md:grid grid-cols-12 gap-x-4 py-6">
      <div className="col-span-6 pt-20 px-4 justify-center border-r-8 border-blue-100 border-dotted text-2xl">
        <h1 className="">
          Hello, <span className="text-blue-500 font-medium">{username}</span>
        </h1>
        <div className="mt-10 flex flex-col gap-y-20">
          <div className="p-4 rounded-md bg-white drop-shadow">
            <InputForm
              setIsUpdatedNow={setIsUpdatedNow}
              moreThan24Hours={moreThan24Hours}
              hoursToWait={hoursToWait}
              lastUpdated={lastUpdated}
            />
          </div>
        </div>
      </div>
      <div className="col-span-6 pt-20">
        <StudyTime chartData={chartData} />
      </div>
    </div>
  );
};

export default AnalysisChart;
