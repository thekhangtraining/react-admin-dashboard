import { AxisBottom, AxisLeft } from "@visx/axis";
import { localPoint } from "@visx/event";
import { GridColumns, GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Line, LinePath } from "@visx/shape";
import { TooltipWithBounds, useTooltip, defaultStyles } from "@visx/tooltip";
import { bisector, extent, flatGroup, timeFormat, timeParse, format } from "d3";
import { schemeCategory10 } from "d3-scale-chromatic";
import React, { useCallback, useMemo } from "react";
import { GlyphCircle } from "@visx/glyph";

const LinesChart = ({ rawData, width, height, startDate, endDate }) => {
  const margin = { top: 20, right: 20, bottom: 20, left: 35 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xValue = (d) => timeParse("%d-%m-%Y")(d.Date);
  const yValue = (d) => +d.AdjClose;
  const bisectDate = bisector((d) => new Date(d.Date)).left;

  const xAxisTicksFormat = timeFormat("%b, %y");
  const data = rawData.filter(
    (d) => xValue(d) >= startDate && xValue(d) <= endDate
  );

  const colors = {
    grid: "#e0e0e0",
    tickLabel: "#334155",
    tickStroke: "#94a3b8",
    series: "#334155",
    axis: "#94a3b8",
    tooltipBg: "#f8fafc",
    tooltipStroke: "#94a3b8",
  };

  const xScale = useMemo(
    () =>
      scaleTime({
        range: [0, innerWidth],
        domain: extent(data, xValue),
      }),
    [innerWidth, data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight, 0],
        domain: extent(data, yValue),
        nice: true,
      }),
    [innerHeight, data]
  );

  const groupData = useMemo(() => flatGroup(data, (d) => d.Company), [data]);

  const tickLabelProps = {
    fill: colors.tickLabel,
    fontFamily: "Poppins",
    fontSize: 10,
  };

  const {
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const handleTooltip = useCallback(
    (event) => {
      const getData = (date) => {
        const result = data.filter((d) => d.Date === date);
        return result;
      };

      const { x } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(x);
      const index = bisectDate(data, x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];
      let d = d0;
      if (d1 && xValue(d1)) {
        d =
          x0.valueOf() - xValue(d0).valueOf() >
          xValue(d1).valueOf() - x0.valueOf()
            ? d1
            : d0;
      }
      showTooltip({
        tooltipData: getData(d.Date),
        tooltipLeft: x,
        tooltipTop: yScale(yValue(d)) - 150,
      });
    },
    [showTooltip, yScale, xScale, data, bisectDate]
  );

  return (
    <div className="relative">
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={yScale}
            width={innerWidth}
            height={innerHeight}
            stroke={colors.grid}
          />
          <GridColumns
            scale={xScale}
            width={innerWidth}
            height={innerHeight}
            stroke={colors.grid}
          />
          <AxisLeft
            scale={yScale}
            tickLabelProps={() => ({
              ...tickLabelProps,
              textAnchor: "end",
              dy: "0.33em",
              dx: "-0.33em",
            })}
            tickLength={4}
            stroke={colors.axis}
            tickStroke={colors.tickStroke}
          />
          <AxisBottom
            scale={xScale}
            tickFormat={xAxisTicksFormat}
            top={innerHeight}
            tickLabelProps={() => ({ ...tickLabelProps, textAnchor: "middle" })}
            tickLength={4}
            stroke={colors.axis}
            tickStroke={colors.tickStroke}
          />
          {groupData.map((data, index) => (
            <LinePath
              key={index}
              data={data[1]}
              stroke={schemeCategory10[index]}
              strokeWidth={1}
              x={(d) => xScale(xValue(d))}
              y={(d) => yScale(yValue(d))}
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              onMouseLeave={() => hideTooltip()}
            />
          ))}
        </Group>
        {tooltipData && (
          <Line
            from={{ x: tooltipLeft, y: margin.top }}
            to={{ x: tooltipLeft, y: innerHeight + margin.top }}
            stroke={colors.tooltipStroke}
            strokeWidth={1}
            pointerEvents="none"
            strokeDasharray="4,2"
          />
        )}
        {tooltipData &&
          tooltipData.map((d, i) => (
            <GlyphCircle
              key={Math.random()}
              left={tooltipLeft - 0.5}
              top={yScale(yValue(d))}
              size={30}
              fill={schemeCategory10[i]}
              strokeWidth={1}
            />
          ))}
      </svg>
      {tooltipData && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              ...defaultStyles,
              fontSize: 10,
              background: colors.tooltipBg,
              borderRadius: 0,
            }}
          >
            {groupData.map((d, i) => (
              <p
                className="font-bold py-0.5"
                key={Math.random()}
                style={{ color: schemeCategory10[i] }}
              >
                <span className="font-normal">{d[0]}</span>
                {" " + format(".2f")(yValue(tooltipData[i]))}
              </p>
            ))}
            <p className="pt-0.5">
              {timeFormat("%d %B %Y")(xValue(tooltipData[0]))}
            </p>
          </TooltipWithBounds>
        </div>
      )}
    </div>
  );
};

export default LinesChart;
