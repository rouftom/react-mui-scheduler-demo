import React, {useState} from 'react'
import { parse } from 'date-fns'
import { blue, orange } from "@mui/material/colors"
import { getMonth } from 'date-fns'
import {
  Grid, Box, Stack, InputLabel, MenuItem, FormControl, Select,
  Typography
} from "@mui/material"
import {LocalizationProvider} from "@mui/lab"
import DateAdapter from '@mui/lab/AdapterDateFns'
import {createTheme, styled, ThemeProvider, useTheme} from "@mui/material/styles"
import Scheduler from "react-mui-scheduler"
import './index.css'

const themeObj = {
  palette: {
    mode: "light",
    divider: "rgba(0, 0, 0, 0.12)",
    primary: {
      light: blue[400],
      main: blue[500],
      dark: blue[700],
      contrastText: "#fff",
    },
    secondary: {
      light: orange[400],
      main: orange[500],
      dark: orange[700],
      contrastText: "#fff",
    },
    contrastThreshold: 3
  }
}

let month = getMonth(new Date())
month++
const defaultEvents = [
  {
    id: `event-1`,
    label: "Medical consultation",
    groupLabel: "Dr Shaun Murphy",
    user: "Dr Shaun Murphy",
    color: "#f28f6a",
    startHour: "04:00 AM",
    endHour: "05:00 AM",
    date: `2022-${month}-01`,
    createdAt: new Date(),
    createdBy: "Kristina Mayer"
  },
  {
    id: `event-2`,
    label: "Medical consultation",
    groupLabel: "Dr Claire Brown",
    user: "Dr Claire Brown",
    color: "#099ce5",
    startHour: "09:00 AM",
    endHour: "10:00 AM",
    date: `2022-${month}-02`,
    createdAt: new Date(),
    createdBy: "Kristina Mayer"
  },
  {
    id: `event-3`,
    label: "Medical consultation",
    groupLabel: "Dr Menlendez Hary",
    user: "Dr Menlendez Hary",
    color: "#263686",
    startHour: "13:00 PM",
    endHour: "14:00 PM",
    date: `2022-${month}-04`,
    createdAt: new Date(),
    createdBy: "Kristina Mayer"
  },
  {
    id: `event-4`,
    label: "Consultation prénatale",
    groupLabel: "Dr Shaun Murphy",
    user: "Dr Shaun Murphy",
    color: "#f28f6a",
    startHour: "08:00 AM",
    endHour: "09:00 AM",
    date: `2022-${month}-28`,
    createdAt: new Date(),
    createdBy: "Kristina Mayer"
  }
]

function App() {
  const theme = useTheme()
  const [task, setTask] = useState()
  const [selectedDay, setSelectedDay] = useState()
  const [mode, setMode] = useState('month')
  const [weekStart, setWeekStart] = useState('mon')
  const [locale, setLocale] = useState(
    localStorage.getItem('i18nextLng') || 'en'
  )
  const [events, setEvents] = useState(defaultEvents)
  const [state, setState] = useState({
    options: {
      transitionMode: 'zoom',
      startWeekOn: 'sun',
      defaultMode: 'month',
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540
    },
    alertProps: {
      open: false,
      color: 'info',
      severity: 'info',
      message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥" ,
      showActionButton: true,
      showNotification: false,
      delay: 1500
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true,
      showOptions: true
    }
  })

  const handleCellClick = (event, row, day) => {
    if (day?.data?.length === 0) {
    }
  }

  const handleEventClick = (event, task) => {
    setSelectedDay(parse(task?.date, 'yyyy-MM-dd', new Date()))
    setTask(task)
  }

  const handleEventsChange = (item) => {
    let eventIndex = events.findIndex(e => e.id === item?.id)
    if (eventIndex !== -1) {
      events[eventIndex] = item
      setEvents(Array.from(events))
    }
  }

  const handleAlertCloseButtonClicked = () => {
    setState({
      ...state,
      alertProps: {
        ...state.alertProps,
        message: '',
        open: false
      }
    })
  }

  return (
    <ThemeProvider theme={createTheme(themeObj)}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Box sx={{
          p: 1,
          display: 'flex',
          flexGrow: 1,
          backgroundColor: theme.palette.background.default
        }}>
          <Grid
            container
            spacing={2}
            alignItems="stretch"
            justifyContent="center"
          >
            {<Grid
              item
              xs={12} sm={10} md={10}
              sx={{ display: 'block' }}
            >
              <Stack direction="row" sx={{ mb: 1, justifyContent: 'flex-end' }}>
                <FormControl sx={{ ml: 1, minWidth: 120 }} size="small">
                  <InputLabel id="week-start-select">Week start</InputLabel>
                  <Select
                    value={weekStart}
                    label="weekStart"
                    id="week-start-select"
                    labelId="week-start-select"
                    onChange={(event) => {
                      setWeekStart(event.target.value)
                      state.options.startWeekOn = event.target.value
                      setState({...state})
                    }}
                  >
                    {['mon', 'sun'].map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl sx={{ ml: 1, minWidth: 120 }} size="small">
                  <InputLabel id="mode-select">Mode</InputLabel>
                  <Select
                    value={mode}
                    label="Mode"
                    id="mode-select"
                    labelId="mode-select"
                    onChange={(event) => {
                      setMode(event.target.value)
                      state.options.defaultMode = event.target.value
                      setState({...state})
                    }}
                  >
                    {[
                      'day', 'week', 'month', 'timeline'
                    ].map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl sx={{ ml: 1, minWidth: 120 }} size="small">
                  <InputLabel id="locale-select">Locale</InputLabel>
                  <Select
                    value={locale}
                    label="Locale"
                    id="locale-select"
                    labelId="locale-select"
                    onChange={(event) => { setLocale(event.target.value) }}
                  >
                    {[
                      'ar', 'de', 'en', 'es', 'fr', 'ja', 'ko', 'zh'
                    ].map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                  </Select>
                </FormControl>
              </Stack>
              {<Scheduler
                locale={locale}
                events={events}
                legacyStyle={false}
                options={state?.options}
                alertProps={state?.alertProps}
                toolbarProps={state?.toolbarProps}
                onEventsChange={handleEventsChange}
                onCellClick={handleCellClick}
                onTaskClick={handleEventClick}
                onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
              />}
            </Grid>}
          </Grid>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
