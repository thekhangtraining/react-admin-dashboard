import { extent, scaleLinear } from "d3";
import React from "react";
import { AxisBottom, AxisLeft, Marks, useData } from "./";

const LinesChart = ({ width, height }) => {
  const data = useData();

  const margin = { top: 50, right: 50, bottom: 50, left: 80 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const xValue = (d) => d.timestamp;
  const yValue = (d) => d.close;
  const xAxisLabel = "Time";
  const yAxisLabel = "Close Price";
  const xAxisLabelOffset = 35;
  const yAxisLabelOffset = -290;

  const xScale = scaleLinear()
    // .domain([min(data, xValue), max(data, xValue)])
    .domain(extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  return (
    <div className="rounded-sm overflow-hidden">
      <svg
        className="bg-slate-100 fill-slate-700"
        width={width}
        height={height}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
          <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          <text
            x={innerWidth / 2}
            textAnchor="middle"
            y={innerHeight + xAxisLabelOffset}
            className="font-bold fill-sky-600"
          >
            {xAxisLabel}
          </text>
          <text
            transform={`translate(${yAxisLabelOffset}, ${
              innerHeight / 2
            }) rotate(-90) `}
            y={innerHeight / 2}
            textAnchor="middle"
            x={0}
            className="font-bold fill-sky-600"
          >
            {yAxisLabel}
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
          />
        </g>
      </svg>
    </div>
  );
};

export default LinesChart;
