import { combineReducers } from 'redux'
import {
  UPDATE_LOCATION,
  UPDATE_FORECAST,
  UPDATE_SCALE,
  UPDATE_HOURLY,
  UPDATE_DAYS,
  UPDATE_STATUS,
  REMOVE_FORECAST,
} from './actions'

function location (state = {}, action) {
  switch (action.type) {
  case UPDATE_LOCATION:
    return {
      ...state,
      ...action.location,
    }
  default:
    return state
  }
}

function settings (state = {}, action) {
  switch (action.type) {
  case UPDATE_SCALE:
    return {
      ...state,
      scale: action.scale,
    }
  case UPDATE_HOURLY:
    return {
      ...state,
      hourly: action.hourly,
    }
  case UPDATE_DAYS:
    return {
      ...state,
      days: action.days,
    }
  default:
    return state
  }
}

function forecast (state = [], action) {
  switch (action.type) {
  case UPDATE_FORECAST:
    state = state.filter(item => item.location.place_id !== action.forecast.location.place_id)
    return [
      ...state,
      action.forecast,
    ]
  case REMOVE_FORECAST:
    return state.filter(item => item.location.place_id !== action.location.place_id)
  default:
    return state
  }
}

function status (state = '', action) {
  switch (action.type) {
  case UPDATE_STATUS:
    return action.status
  default:
    return state
  }
}

const weatherApp = combineReducers({
  location,
  settings,
  forecast,
  status,
})

export default weatherApp
