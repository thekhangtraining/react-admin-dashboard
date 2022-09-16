import { ParentSize } from "@visx/responsive";
import { extent, timeParse } from "d3";
import { enGB } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { AiOutlineCalendar } from "react-icons/ai";
import { MultiSeriesChart, ScopeButtonsGroup, useData } from ".";
import "../../styles/datepicker.css";

const MultiSeriesChartContainer = ({ dataPath, title }) => {
  const data = useData(dataPath);
  registerLocale("en-gb", enGB);
  const [startDate, setStartDate] = useState(new Date("1994/09/10"));
  const [endDate, setEndDate] = useState(new Date());
  const [startDateLimit, setStartDateLimit] = useState(new Date("1994/09/10"));
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
    <div className="w-full bg-skin-fill p-2 drop-shadow-lg">
      <h2 className="font-bold text-sm">{title}</h2>
      <div className="text-chart-fill-base rounded-sm flex flex-col items-center justify-center overflow-hidden text-xs h-[400px]">
        <div className="flex justify-between items-center gap-6 w-full z-10 text-2xs lg:text-xs">
          <ScopeButtonsGroup />
          <div className="flex items-center gap-1">
            From
            <div className="flex items-center justify-between w-28 bg-white rounded-sm border border-border-base px-2 py-0.5">
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
                showMonthYearDropdown
              />
              <AiOutlineCalendar className="text-lg" />
            </div>
            To
            <div className="flex items-center justify-between w-28 bg-white rounded-sm border border-border-base px-2 py-0.5">
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
                showMonthYearDropdown
              />
              <AiOutlineCalendar className="text-lg" />
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <ParentSize>
            {({ width, height }) => (
              <MultiSeriesChart
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

export default MultiSeriesChartContainer;
