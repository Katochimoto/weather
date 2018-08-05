export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const UPDATE_FORECAST = 'UPDATE_FORECAST'
export const CHECK_LOCATION = 'CHECK_LOCATION'
export const UPDATE_SCALE = 'UPDATE_SCALE'
export const UPDATE_HOURLY = 'UPDATE_HOURLY'
export const UPDATE_DAYS = 'UPDATE_DAYS'
export const UPDATE_STATUS = 'UPDATE_STATUS'
export const REFRESH_FORECAST = 'REFRESH_FORECAST'
export const REMOVE_FORECAST = 'REMOVE_FORECAST'

export function updateLocation (location) {
  return { type: UPDATE_LOCATION, location }
}

export function updateForecast (forecast) {
  return { type: UPDATE_FORECAST, forecast }
}

export function checkLocation (position) {
  return { type: CHECK_LOCATION, position }
}

export function updateScale (scale) {
  return { type: UPDATE_SCALE, scale }
}

export function updateHourly (hourly) {
  return { type: UPDATE_HOURLY, hourly }
}

export function updateForecastDays (days) {
  return { type: UPDATE_DAYS, days }
}

export function updateStatus (status) {
  return { type: UPDATE_STATUS, status }
}

export function refreshForecast () {
  return { type: REFRESH_FORECAST }
}

export function removeForecast (location) {
  return { type: REMOVE_FORECAST, location }
}
