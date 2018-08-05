

export function selectForecast (location) {
  return (state) => {
    if (!location) {
      return
    }

    return state.forecast.find(item => (
      item.location.place_id === location.place_id
    ))
  }
}

export function selectLocation (state) {
  return state.location
}

export function selectSettings (state) {
  return state.settings
}

export function selectStatus (state) {
  return state.status
}
