import React from 'react'
import { Box, useTheme, Typography } from '@mui/material'
import { ResponsivePie } from '@nivo/pie'
import { useGetAllSensorDataQuery } from '../state/api'

function PiechartDashboard({ data, }) {
    const theme = useTheme();

    const averageData = useMemo(() => {
        let sum = {
            temperature: 0,
            pH: 0,
            turbidity: 0,
            tds: 0,
        }

        for (const d of data) {
        sum.temperature += d.temperature;
        sum.pH += d.pH;
        sum.tds += d.tds;
        sum.turbidity += d.turbidity;

        const count = data.length

        return{
            temperature: (sum.temperature / count).toFixed(2),
            pH: (sum.pH / count).toFixed(2),
            turbidity: (sum.turbidity / count).toFixed(2),
            tds: (sum.tds / count).toFixed(2),
        }
    }
    }, [data])

    const colors = [
        theme.palette.secondary[500],
        theme.palette.secondary[300],
        theme.palette.secondary[600],
        theme.palette.secondary[400],
    ];

    const formattedData = [
        {
            id: "ph",
            label: "pH",
            value: averageData.pH,
            color: colors[0]
        },
        {
            id: "tds",
            label: "TDS",
            value: averageData.tds,
            color: colors[1]
        },
        {
            id: "turbidity",
            label: "Turbidity",
            value: averageData.turbidity,
            color: colors[2]
        },
        {
            id: "temp",
            label: "Temperature",
            value: averageData.temperature,
            color: colors[3]
        }
    ]

    return (
        <Box
            height={isDashboard ? "400px" : "100%"}
            width={undefined}
            minHeight={isDashboard ? "325px" : undefined}
            minWidth={isDashboard ? "325px" : undefined}
            position="relative"
        >
            <ResponsivePie
            data={formattedData}
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
            colors={{ datum: "data.color" }}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            sortByValue={true}
            innerRadius={0.45}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            enableArcLabels={!isDashboard}
            activeOuterRadiusOffset={8}
            arcLinkLabelsTextColor={theme.palette.secondary[200]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            motionConfig="wobbly"
            legends={[
            {
                anchor: "bottom",
                direction: "row",
                translateY: 56,
                itemWidth: 85,
                itemHeight: 18,
                symbolShape: "circle",
                effects: [
                {
                    on: "hover",
                    style: {
                    itemTextColor: theme.palette.primary[500],
                    },
                },
                ],
            },
            ]}
            />
        </Box>
    )
}

export default PiechartDashboard
