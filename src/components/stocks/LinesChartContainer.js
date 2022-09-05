import { ParentSize } from "@visx/responsive";
import { extent, timeParse } from "d3";
import { enGB } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { AiOutlineCalendar } from "react-icons/ai";
import { LinesChart, ScopeButtonsGroup, useData } from ".";
import "../../styles/datepicker.css";

const LinesChartContainer = ({ dataPath, title }) => {
  let data = useData(dataPath);
  registerLocale("en-gb", enGB);
  const [startDate, setStartDate] = useState(new Date("01/01/1970"));
  const [endDate, setEndDate] = useState(new Date());
  const [startDateLimit, setStartDateLimit] = useState(new Date("01/01/1970"));
  const [endDateLimit, setEndDateLimit] = useState(new Date());

  useEffect(() => {
    if (data) {
      setStartDate(extent(data, (d) => timeParse("%d-%m-%Y")(d.Date))[0]);
      setStartDateLimit(extent(data, (d) => timeParse("%d-%m-%Y")(d.Date))[0]);
      setEndDate(extent(data, (d) => timeParse("%d-%m-%Y")(d.Date))[1]);
      setEndDateLimit(extent(data, (d) => timeParse("%d-%m-%Y")(d.Date))[1]);
    }
  }, [data]);

  useEffect(() => {
    if (data && startDate > endDate) {
      setEndDate(startDate);
    }
  }, []);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <div className="w-full">
      <h2 className="mb-2 text-skin-strong">{title}</h2>
      <div className="text-chart-fill-base rounded-sm flex flex-col bg-chart-bg-fill items-center justify-center p-2 overflow-hidden text-xs h-[400px]">
        <div className="flex justify-between items-center gap-6 w-full z-10">
          <ScopeButtonsGroup />
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-between w-28 bg-white rounded-sm border border-slate-300 border-1 px-2 py-0.5">
              <DatePicker
                dateFormat="P"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                showPopperArrow={false}
                locale="en-gb"
                minDate={startDateLimit}
                maxDate={endDateLimit}
              />
              <AiOutlineCalendar className="text-lg" />
            </div>
            <div className="flex items-center justify-between w-28 bg-white rounded-sm border border-slate-300 border-1 px-2 py-0.5">
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                showPopperArrow={false}
                locale="en-gb"
                minDate={startDateLimit}
                maxDate={endDateLimit}
              />
              <AiOutlineCalendar className="text-lg" />
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <ParentSize>
            {({ width, height }) => (
              <LinesChart
                rawData={data}
                width={width}
                height={height}
                startDate={startDate}
                endDate={endDate}
              />
            )}
          </ParentSize>
        </div>
      </div>
    </div>
  );
};

export default LinesChartContainer;
