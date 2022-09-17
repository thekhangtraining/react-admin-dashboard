import { AxisBottom, AxisLeft } from "@visx/axis";
import { localPoint } from "@visx/event";
import { GlyphCircle } from "@visx/glyph";
import { GridColumns, GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { LegendItem, LegendLabel, LegendOrdinal } from "@visx/legend";
import { scaleLinear, scaleOrdinal, scalePoint } from "@visx/scale";
import { Bar, Line, LinePath } from "@visx/shape";
import { defaultStyles, TooltipWithBounds, useTooltip } from "@visx/tooltip";
import {
  bisect,
  extent,
  flatGroup,
  format,
  range,
  timeFormat,
  timeParse,
} from "d3";
import { schemeCategory10 } from "d3-scale-chromatic";
import React from "react";

const MultiSeriesChart = ({ rawData, width, height, startDate, endDate }) => {
  const margin = { top: 10, right: 25, bottom: 60, left: 50 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xValue = (d) => timeParse("%d-%m-%Y")(d.Date);
  const yValue = (d) => +d.AdjClose;

  const data = rawData.filter(
    (d) => xValue(d) >= startDate && xValue(d) <= endDate
  );

  const groupData = flatGroup(data, (d) => d.Company);
  console.log(groupData);

  const colors = {
    grid: "#e0e0e0",
    tickLabel: "#334155",
    tickStroke: "#94a3b8",
    series: "#334155",
    axis: "#94a3b8",
    tooltipBg: "#f8fafc",
    tooltipStroke: "#94a3b8",
  };

  const xScale = scalePoint({
    range: [0, innerWidth],
    domain: data.map((d) => d.Date),
    nice: true,
    padding: 0,
  });

  const xAxisTickFormat = (d) => timeFormat("%b, %Y")(timeParse("%d-%m-%Y")(d));

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: extent(data, yValue),
    nice: true,
  });

  const colorScale = scaleOrdinal({
    domain: groupData.map((d) => d[0]),
    range: schemeCategory10,
  });

  const tickLabelProps = {
    fill: colors.tickLabel,
    fontFamily: "Roboto",
    fontSize: 11,
  };

  const labelProps = {
    fill: colors.tickLabel,
    fontFamily: "Roboto",
    fontSize: 11,
    textAnchor: "middle",
  };

  // Build my own invert function for scaleBand to get date from x position
  const invertPositionX = (posX) => {
    const domain = xScale.domain();
    const ranges = xScale.range();
    const rangePoints = range(ranges[0], ranges[1], xScale.step());
    let dateString = domain[bisect(rangePoints, posX) - 1];

    return dateString;
  };

  const getAllValuesFromDateString = (dateString) =>
    data.filter((d) => d.Date === dateString);

  // Find the nearest stock price to the invert stock price from position y
  const findNearestYValue = (invertedYValue) => (prev, curr) =>
    Math.abs(curr.AdjClose - invertedYValue) >
    Math.abs(prev.AdjClose - invertedYValue)
      ? prev.AdjClose
      : curr.AdjClose;

  const {
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const handleTooltip = (event) => {
    const { x, y } = localPoint(event);

    const invertedXValue = invertPositionX(x - margin.left);
    const allValuesFromDateString = getAllValuesFromDateString(invertedXValue);
    const invertedYValue = yScale.invert(y - margin.bottom);
    const nearestYValue = allValuesFromDateString.reduce(
      findNearestYValue(invertedYValue)
    );

    showTooltip({
      tooltipData: {
        Date: timeFormat("%d %B, %Y")(timeParse("%d-%m-%Y")(invertedXValue)),
        Values: allValuesFromDateString,
        posX: x,
      },
      tooltipLeft: x,
      tooltipTop: margin.top + 20,
    });
  };

  const legendGlyphSize = 10;

  return (
    <div className="relative">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontSize: "11px",
        }}
      >
        <LegendOrdinal scale={colorScale} direction="row">
          {(labels) =>
            labels.map((label, i) => (
              <LegendItem
                key={`legend-${i}`}
                onClick={() => {
                  alert(`${JSON.stringify(label)}`);
                }}
                style={{
                  margin: "0px 5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg width={legendGlyphSize} height={legendGlyphSize}>
                  <circle
                    fill={label.value}
                    r={legendGlyphSize / 2}
                    cx={legendGlyphSize / 2}
                    cy={legendGlyphSize / 2}
                  />
                </svg>
                <LegendLabel margin="0 2px">
                  {label.text}
                </LegendLabel>
              </LegendItem>
            ))
          }
        </LegendOrdinal>
      </div>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={yScale}
            width={innerWidth}
            height={innerHeight}
            stroke={colors.grid}
            pointerEvents="none"
          />
          <GridColumns
            scale={xScale}
            width={innerWidth}
            height={innerHeight}
            stroke={colors.grid}
            pointerEvents="none"
            numTicks={8}
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
            pointerEvents="none"
            label="Ajusted Close"
            labelProps={labelProps}
          />
          <AxisBottom
            scale={xScale}
            tickFormat={xAxisTickFormat}
            top={innerHeight}
            tickLabelProps={(value, index) => ({
              ...tickLabelProps,
              textAnchor: "middle",
              // transform: `rotate(30 ${xScale(value) - 20} 50)`,
            })}
            tickLength={4}
            stroke={colors.axis}
            tickStroke={colors.tickStroke}
            pointerEvents="none"
            numTicks={8}
          />
          <Bar
            x={0}
            y={0}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {groupData.map((d, i) => (
            <LinePath
              key={Math.random()}
              data={d[1]}
              stroke={schemeCategory10[i]}
              strokeWidth={1}
              x={(d) => xScale(timeFormat("%d-%m-%Y")(xValue(d)))}
              y={(d) => yScale(yValue(d))}
              pointerEvents="none"
            />
          ))}
        </Group>
        {tooltipData && (
          <Group pointerEvents="none">
            <Line
              from={{ x: tooltipData.posX, y: margin.top }}
              to={{ x: tooltipData.posX, y: innerHeight + margin.top }}
              stroke={colors.tooltipStroke}
              strokeWidth={1}
              strokeDasharray="4,2"
            />
            {tooltipData.Values.map((d, i) => (
              <GlyphCircle
                key={Math.random()}
                left={tooltipLeft}
                top={yScale(yValue(d)) + margin.top}
                size={50}
                fill={schemeCategory10[i]}
                strokeWidth={1}
                stroke="white"
              />
            ))}
          </Group>
        )}
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
            {tooltipData.Values.map((d, i) => (
              <p
                className="font-bold py-0.5"
                key={Math.random()}
                style={{ color: schemeCategory10[i] }}
              >
                <span className="font-normal">{d.Company}</span>
                {" " + format(".2f")(d.AdjClose)}
              </p>
            ))}
            <p className="pt-0.5">{tooltipData.Date}</p>
          </TooltipWithBounds>
        </div>
      )}
    </div>
  );
};

export default MultiSeriesChart;
