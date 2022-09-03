import React from "react";

const AxisLeft = ({ yScale, innerWidth }) => {
  return yScale.ticks().map((tickValue) => (
    <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
      <line x2={innerWidth} className="stroke-slate-200" />
      <text style={{ textAnchor: "end" }} dy=".32rem" x={-3}>
        {tickValue}
      </text>
    </g>
  ));
};

export default AxisLeft;
