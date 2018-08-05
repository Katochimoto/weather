import { connect } from 'react-redux'
import { selectLocation, selectForecast, selectSettings } from '../data/selectors'
import { updateScale } from '../data/actions'
import Component from '../components/Currently'

const mapStateToProps = state => {
  const settings = selectSettings(state)
  const location = selectLocation(state)
  const forecast = selectForecast(location)(state)
  const currently = forecast && forecast.data.currently

  return {
    location,
    currently,
    settings,
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleChangeScale: (scale) => {
    dispatch(updateScale(scale))
  },
})

const Currently = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

export default Currently
