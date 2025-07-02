import { useMemo, useState } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { themeSettings } from './theme.js'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './scenes/layout/Index.jsx'
// import DashBoard from './scenes/dashboard/Index.jsx'
import Ph from './scenes/ph/Index.jsx'
import Turbidity from './scenes/turbidity/Index.jsx'
import Tds from './scenes/tds/Index.jsx'
import DashBoard from './scenes/dashboard/Index.jsx'

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <div className='app'>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
              <Route element={<Layout/>}>
              {/* Routes */}
              <Route path="/" element = {<Navigate to="/dashboard" replace/>}/>
              <Route path="/dashboard" element = {<DashBoard/>}/>
              <Route path='/ph' element = {<Ph/>}/>
              <Route path='/turbidity' element = {<Turbidity/>}/>
              <Route path='/tds' element = {<Tds/>}/>
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
