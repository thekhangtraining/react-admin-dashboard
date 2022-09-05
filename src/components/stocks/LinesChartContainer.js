import { ParentSize } from "@visx/responsive";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../../styles/datepicker.css";
import { LinesChart, ScopeButtonsGroup, useData } from ".";
import { AiOutlineCalendar } from "react-icons/ai";

const LinesChartContainer = ({ width, height, dataPath }) => {
  const data = useData(dataPath);

  const [startDate, setStartDate] = useState(new Date("2022/09/02"));
  const [endDate, setEndDate] = useState(new Date("2022/09/01"));
  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <div className="text-chart-fill-base rounded-sm flex flex-col bg-chart-bg-fill items-center justify-center p-2 overflow-hidden text-xs chart-theme-1">
      <div className="flex justify-between items-center gap-6 w-full z-10">
        <ScopeButtonsGroup />
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-between w-28 bg-white rounded-sm border border-slate-400 border-1 px-2 py-0.5">
            <DatePicker
              dateFormat="dd/MM/yyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <AiOutlineCalendar className="text-lg" />
          </div>
          <div className="flex items-center justify-between w-28 bg-white rounded-sm border border-slate-400 border-1 px-2 py-0.5">
            <DatePicker
              dateFormat="dd/MM/yyy"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
            <AiOutlineCalendar className="text-lg" />
          </div>
        </div>
      </div>
      <div style={{ width: width, height: height }}>
        <ParentSize>
          {({ width, height }) => (
            <LinesChart data={data} width={width} height={height} />
          )}
        </ParentSize>
      </div>
    </div>
  );
};

export default LinesChartContainer;
