import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";

function DashboardChart({ data, isDashboard = false, colors }) {
  const theme = useTheme();

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const [phColor, tdsColor, turbidityColor] = colors
    
    const series = {
      pH: { id: "pH", color: phColor, data: [] },
      tds: { id: "TDS", color: tdsColor, data: [] },
      turbidity: { id: "Turbidity", color: turbidityColor, data: [] },
    };

    data.forEach((d, i) => {
      const label = `${(i + 1)*10}`;
      series.pH.data.push({ x: label, y: d.pH });
      series.tds.data.push({ x: label, y: d.tds });
      series.turbidity.data.push({ x: label, y: d.turbidity });
    });

    return [series.pH, series.tds, series.turbidity];
  }, [data, theme]);

  return (
    <ResponsiveLine
      data={chartData}
      colors={(line) => line.color}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 78 }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      xScale={{ type: "point" }}
      axisBottom={{
        legend: isDashboard ? "" : "Sample",
        legendOffset: 36,
        tickRotation: chartData[0]?.data.length > 10 ? -45 : 0,
        format: (v) => (isDashboard ? v : v),
      }}
      axisLeft={{
        legend: isDashboard ? "" : "Sensor Value",
        legendOffset: -60,
        tickValues: 5,
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      enableArea={isDashboard}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      areaOpacity={0}
      enableTouchCrosshair
      useMesh
      legends={[
      {
        anchor: "top-right",
        direction: "column",
        translateX: 30,
        translateY: 0,
        itemWidth: 80,
        itemHeight: 20,
        itemsSpacing: 4,
        symbolSize: 12,
        symbolShape: "diamond",
        itemTextColor: theme.palette.secondary[200],
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: theme.palette.primary.main,
            },
          },
        ],
      },
    ]}

      curve="catmullRom"
      motionConfig="wobbly"
    />
  );
}

export default DashboardChart;
