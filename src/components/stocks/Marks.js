import React from "react";

const Marks = ({ data, xScale, yScale, xValue, yValue }) => {
  return data.map((d) => (
    <g key={xValue(d) + yValue(d)} className="group">
      <circle
        className="fill-sky-600"
        key={d.close}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={4}
      />
      <text
        x={xScale(xValue(d)) + 10}
        y={yScale(yValue(d)) + 10}
        className="fill-sky-600 invisible group-hover:visible text-xs z-20"
      >
        {yValue(d)}
      </text>
    </g>
  ));
};
export default Marks;
