import React, { useMemo } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import { useGetAllSensorDataQuery } from "../../state/api.js";
import { DataGrid } from "@mui/x-data-grid";
import OverallChart from "../../components/OverallChart";
import Statbox from "../../components/Statbox";
import DashboardChart from "../../components/DashboardChart";
import { Thermostat, Science, Opacity, Water } from "@mui/icons-material";


function DashBoard() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetAllSensorDataQuery(undefined, {
    pollingInterval: 12000,
    refetchOnMountOrArgChange: true
  });
  console.log(data)
  const averageData = useMemo(() => {
    if (!data) return null;

    let sum = {
      temperature: 0,
      pH: 0,
      turbidity: 0,
      tds: 0,
    };

    for (const d of data) {
      sum.temperature += d.temperature;
      sum.pH += d.pH;
      sum.tds += d.tds;
      sum.turbidity += d.turbidity;
    }

    const count = data.length;

    return {
      temperature: (sum.temperature / count).toFixed(2),
      pH: (sum.pH / count).toFixed(2),
      turbidity: (sum.turbidity / count).toFixed(2),
      tds: (sum.tds / count).toFixed(2),
    }
  }, [data]);

  const indicatorValue = useMemo(() => {
    if (!averageData) return null;


    let phIndi, phIndiCol;
    if(averageData.pH<20){
       phIndi = "LOW";
       phIndiCol = "#be2528"
    }else if(averageData.pH>20 && averageData.pH<30){
       phIndi = "BEST";
       phIndiCol = "#2ebe25";
    }else{
       phIndi = "HIGH";
       phIndiCol = "#be2528"
    }

    let tdsIndi, tdsIndiCol;
    if(averageData.tds<120){
      tdsIndi = "LOW";
      tdsIndiCol = "#be2528"
    }else if(averageData.tds>120 && averageData.tds<230){
       tdsIndi = "BEST";
       tdsIndiCol = "#2ebe25";
    }else{
       tdsIndi = "HIGH";
       tdsIndiCol = "#be2528"
    }

    let turbidIndi, turbidIndiCol;
    if(averageData.turbidity<350){
       turbidIndi = "LOW";
       turbidIndiCol = "#be2528"
    }else if(averageData.turbidity>350 && averageData.turbidity<400){
       turbidIndi = "BEST";
       turbidIndiCol = "#2ebe25";
    }else{
       turbidIndi = "HIGH";
       turbidIndiCol = "#be2528"
    }

    return {
      phIndi,
      phIndiCol,
      tdsIndi,
      tdsIndiCol,
      turbidIndi,
      turbidIndiCol
    }
  }, [averageData])

  const reversedData = useMemo(() => {
    if(!data) return null;
    return [...data].reverse();
  }, [data]);

  const cleanData = data?.map((d, i) => ({
    _id: `${"#"+(i+1)}`,
    temperature: d.temperature,
    pH: d.pH,
    turbidity: d.turbidity,
    tds: d.tds,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  }));

  console.log(cleanData)

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "temperature",
      headerName: "Temperature (°C)",
      flex: 1,
    },
    {
      field: "pH",
      headerName: "pH Level",
      flex: 1,
    },
    {
      field: "turbidity",
      headerName: "Turbidity (NTU)",
      flex: 1,
    },
    {
      field: "tds",
      headerName: "TDS (ppm)",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Clocked At",
      flex: 1.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="180px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <Statbox
          title="Average pH"
          value={averageData?.pH ?? "..."}
          icon={<Science sx={{ color: theme.palette.secondary[300], fontSize: 26 }}/>}
          indicator={indicatorValue?.phIndi ?? "..."}
          colorIndicator={indicatorValue?.phIndiCol ?? "#be2528"}
        />
        <Statbox
          title="Average Turbidity"
          value={averageData?.turbidity ?? "..."}
          icon={<Opacity sx={{ color: theme.palette.secondary[300], fontSize: 26 }}/>}
          indicator={indicatorValue?.turbidIndi ?? "..."}
          colorIndicator={indicatorValue?.turbidIndiCol ?? "#be2528"}
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor = {theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <DashboardChart
            data={reversedData}
            parameters={["pH", "tds", "turbidity"]}
            colors={["#7f1647", "#7c7f16", "#167f19"]}
          />
        </Box>
        <Statbox
          title="Average TDS"
          value={averageData?.tds ?? "..."}
          icon={<Water sx={{ color: theme.palette.secondary[300], fontSize: 26 }}/>}
          indicator={indicatorValue?.tdsIndi ?? "..."}
          colorIndicator={indicatorValue?.tdsIndiCol ?? "#be2528"}
        />
        <Statbox
          title="Average Temperature"
          value={averageData?.temperature ?? "..."}
          icon={<Thermostat sx={{ color: theme.palette.secondary[300], fontSize: 26 }}/>}
          indicator="BEST"
          colorIndicator="#2ebe25"
        />
        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "0.5rem"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || data}
            getRowId={(row) => row._id}
            rows={cleanData || []}
            columns={columns}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DashBoard;
