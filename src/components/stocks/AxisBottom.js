import React from "react";

const AxisBottom = ({ xScale, innerHeight }) => {
  return xScale.ticks().map((tickValue) => (
    <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} className="stroke-slate-200" />
      <text style={{ textAnchor: "middle" }} dy=".71rem" y={innerHeight + 3}>
        {tickValue}
      </text>
    </g>
  ));
};

export default AxisBottom;
