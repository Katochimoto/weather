import { connect } from 'react-redux'
import Component from '../components/Location'
import { updateLocation, refreshForecast } from '../data/actions'
import { selectLocation } from '../data/selectors'

const mapStateToProps = state => ({
  location: selectLocation(state)
})

const mapDispatchToProps = (dispatch) => ({
  handleChange: (location) => {
    dispatch(updateLocation(location))
  },
  handleRefresh: () => {
    dispatch(refreshForecast())
  },
})

const Location = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

export default Location
