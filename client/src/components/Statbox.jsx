import React from 'react'
import FlexBetween from './FlexBetween'
import { Box, Typography, useTheme } from '@mui/material'

function Statbox({ title, value, icon, indicator, colorIndicator }) {
  const theme = useTheme();

  return (
    <Box
    gridColumn="span 2"
    gridRow="span 1"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    p="1.25rem 1rem"
    flex="1 1 100%"
    bgcolor={theme.palette.background.alt}
    borderRadius="0.55rem"
    >
        <FlexBetween>
            <Typography variant='h5' sx={{ color: theme.palette.secondary[100] }}>
                {title}
            </Typography>
            {icon}
        </FlexBetween>
        <Typography
        variant='h3'
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
        >
            {value}
        </Typography>
        <FlexBetween gap="1rem">
            <Typography sx={{ color: theme.palette.secondary[100] }}>
                {"Level - "}
            </Typography>
            <Typography sx={{ color: colorIndicator }}>
              {indicator}
            </Typography>
        </FlexBetween>
    </Box>
  )
}

export default Statbox
