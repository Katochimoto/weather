import { connect } from 'react-redux'
import { selectLocation, selectForecast, selectSettings } from '../data/selectors'
import { updateForecastDays } from '../data/actions'
import Component from '../components/Forecast'

const mapStateToProps = state => {
  const settings = selectSettings(state)
  const location = selectLocation(state)
  const forecast = selectForecast(location)(state)
  const daily = forecast && forecast.data.daily

  return { location, daily, settings, }
}

const mapDispatchToProps = (dispatch) => ({
  handleForecastDays: (days) => {
    dispatch(updateForecastDays(days))
  },
})

const Forecast = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

export default Forecast
