import { connect } from 'react-redux'
import { selectLocation, selectForecast, selectSettings } from '../data/selectors'
import { updateHourly } from '../data/actions'
import Component from '../components/Hourly'

const mapStateToProps = state => {
  const settings = selectSettings(state)
  const location = selectLocation(state)
  const forecast = selectForecast(location)(state)
  const hourly = forecast && forecast.data.hourly

  return {
    location,
    hourly,
    settings,
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleChangeHourly: (hourly) => {
    dispatch(updateHourly(hourly))
  },
})

const Hourly = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

export default Hourly
