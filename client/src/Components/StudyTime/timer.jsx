import { useState } from "react";
import StudyTimeChart from "./chart";

const StudyTime = ({ chartData }) => {
  const isLg = window.innerWidth > 768;
  const [showChart, setShowChart] = useState(isLg ? true : false);
  return (
    <div>
      {!isLg && (
        <button onClick={() => setShowChart(!showChart)}>Show chart</button>
      )}
      {showChart && <StudyTimeChart chartData={chartData} />}
    </div>
  );
};

export default StudyTime;
