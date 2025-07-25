import React, { useState, useMemo } from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'
import OverallChart from '../../components/OverallChart'
import { useGetAllSensorDataQuery } from '../../state/api.js'

function Ph() {
  const { data, isLoading } = useGetAllSensorDataQuery(undefined, {
    pollingInterval: 12000,
    refetchOnMountOrArgChange: true
  });
  console.log(data);

  return (
    <Box m="2.5rem 1.5rem">
      <Header title="PH OVERVIEW" subtitle="Here you can see the full overview of the pH of your water sample"/>
      <Box height="75vh">
        <OverallChart
        data={data}
        parameter="pH"              // Case-sensitive key!
        color="#1976d2"
        curveType="monotoneX"
        enablePoints={true}
        showGrid={true}
        xAxisLabel="Time"
        yAxisLabel="pH Level"
        useTimeScale={true}
        />
      </Box>
    </Box>
  )
}

export default Ph
