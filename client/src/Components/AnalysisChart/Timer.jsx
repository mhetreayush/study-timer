import { useState } from "react";
import StudyTimeChart from "./Chart";

const StudyTime = ({ chartData }) => {
  const isLg = window.innerWidth > 768;
  const [showChart, setShowChart] = useState(isLg ? true : false);
  return (
    <div>
      {!isLg && (
        <button onClick={() => setShowChart(!showChart)}>Show chart</button>
      )}
      {showChart && (
        <div
          className={`${
            isLg ? "" : "absolute top-0 left-0 p-0 m-0 z-50 w-[100vw] h-[100vh]"
          }`}
        >
          <StudyTimeChart chartData={chartData} />
        </div>
      )}
    </div>
  );
};

export default StudyTime;
