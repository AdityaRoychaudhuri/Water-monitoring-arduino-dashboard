import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";

function OverallChart({
  data,
  parameter,
  color,
  curveType = "linear",
  enablePoints = true,
  showGrid = true,
  xAxisLabel = "Sample Index",
  yAxisLabel = null
}) {
  const theme = useTheme();

  const formattedData = useMemo(() => {
    if (!data) return [];

    return [
      {
        id: parameter,
        color: color,
        data: data.map((entry, index) => ({
          x: `${(index + 1) * 10}`,
          y: entry[parameter],
        })),
      },
    ];
  }, [data, parameter, color]);

  return (
    <ResponsiveLine
    data={formattedData}
    margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    curve={curveType}
    colors={[color]}
    enablePoints={true}
    enableTouchCrosshair
    useMesh
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    enableGridX={showGrid}
    enableGridY={showGrid}
    gridXValues={
      formattedData[0]?.data?.length > 10
        ? undefined
        : formattedData[0]?.data?.map((d) => d.x)
    }
    theme={{
      axis: {
        ticks: {
          text: {
            fill: theme.palette.text.primary,
            fontSize: 12,
          },
        },
        legend: {
          text: {
            fill: theme.palette.text.primary,
            fontSize: 14,
            fontWeight: 500,
          },
        },
      },
      grid: {
        line: {
          stroke: theme.palette.divider,
          strokeWidth: 1,
        },
      },
      tooltip: {
        container: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: 12,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[4],
        },
      },
    }}
    axisBottom={{
      legend: xAxisLabel,
      legendPosition: "middle",
      legendOffset: 40,
      tickRotation: formattedData[0]?.data?.length > 10 ? -45 : 0,
    }}
    axisLeft={{
      legend: yAxisLabel || parameter.toUpperCase(),
      legendPosition: "middle",
      legendOffset: -50,
      format: (value) => {
        // Format large numbers with K/M suffixes
        if (Math.abs(value) >= 1000000) {
          return `${(value / 1000000).toFixed(1)}M`;
        } else if (Math.abs(value) >= 1000) {
          return `${(value / 1000).toFixed(1)}K`;
        }
        return typeof value === "number" ? value.toFixed(2) : value;
      },
    }}
    tooltip={({ point }) => (
      <div
        style={{
          background: theme.palette.background.paper,
          padding: "8px 12px",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[4],
        }}
      >
        <strong style={{ color: theme.palette.text.primary }}>
          {point.serieId}:{" "}
          {typeof point.data.y === "number"
            ? point.data.y.toFixed(3)
            : point.data.y}
        </strong>
        <br />
        <span
          style={{ color: theme.palette.text.secondary, fontSize: "12px" }}
        >
          Index: {point.data.x}
        </span>
      </div>
    )}
    animate={true}
    motionConfig="gentle"
    />
  );
}

export default OverallChart;
